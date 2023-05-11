/**
 * 串口通信库
 */

// 10转16进制
const decToHex = function (num, maxLength) {
    num = num || 0;
    let str = parseInt(num).toString(16).padStart(maxLength, '0').toUpperCase();
    return toLittleEndianStr(str)
}

// 转换成小端模式
const toLittleEndianStr = function (hexStr) {
    if (hexStr.length == 4) {
        // 暂时这样
        return hexStr.substr(2, 2) + hexStr.substr(0, 2);
    }
    if (hexStr.length > 5) {
        let tmp = "";
        for (let index = hexStr.length - 2; index >= 0; index -= 2) {
            tmp += hexStr.substr(index, 2);
        }
        return tmp;
    }
    return hexStr;
}

// 16转10进制
export const hexToDec = function (hexStr, signed) {
    // 首位是否符号位
    signed = signed || false;
    // 转换成大端模式
    const str = toLittleEndianStr(hexStr)
    let num = parseInt(str, 16)
    if (signed && (num & 0x8000) > 0) {
        // 有符号数
        num = num - 0x10000;
    }
    return num;
}


/**
 * 下发软控命令， 下行消息
 * 参数样例
 cmd = {
    // 垂直模式
    verticalMode: 1,
    // 运行模式
    carRunMode: 1,
    // 前滚刷
    frontGunShua: 1,
    // 后滚刷
    backGunShua: 1,
    // 边刷控制
    brushCtr: 1,
    // 车速
    carVelocity: 1,
    // ...跟多
}
 * @param param
 */
window.sendCmd = function (param) {
    let cmd =
        decToHex(param.verticalMode, 2) +
        decToHex(param.carRunMode, 2) +
        decToHex(param.frontBrushCtr, 2) +
        decToHex(param.rearBrushCtr, 2) +
        decToHex(param.brushCtr, 2) +
        decToHex(param.carVelocity, 4) +
        decToHex(param.frontPressure, 4) +
        decToHex(param.backPressure, 4) +
        decToHex(param.crossAbstacleDis1, 4) +
        decToHex(param.crossAbstacleDis2, 4) +
        decToHex(param.aWinchCtr, 2) +
        decToHex(param.aWinchNeatenCtr, 2) +
        decToHex(param.bWinchCtr, 2) +
        decToHex(param.HuggingSideDis, 4) +
        decToHex(param.HuggingSideDir, 2) +
        decToHex(param.autoMoveLevelDis, 4) +
        decToHex(param.autoMoveVerticalDis, 4) +
        //升降电机高度(mm) 界面不展示
        decToHex(param.lifterHeight, 4) +
        decToHex(param.frontLifterCmd, 2) +
        decToHex(param.backLifterCmd, 2) +
        decToHex(param.frontValveOpenTime, 4) +
        decToHex(param.frontValveCloseTime, 4) +
        decToHex(param.backValveOpenTime, 4) +
        decToHex(param.backValveCloseTime, 4)
    //todo crc校验 - crc16之前所有数据crc16,crc16算法和老版本一样
    const len = cmd.length / 2 + 4;
    // 下行命令消息
    cmd = "AA55" + decToHex(len, 2) + "30" + cmd + "5F5F"
    console.log("make softCmd:", cmd);

    // webview定制化开发的js方法, 通过底层串口下发命令
    window.sendCmd && window.sendCmd(cmd);
}

// 接收硬件端回传的上行消息， 页面回显传感器等数据信息
export let lastDeviceData = null;
// AA5523000083002102B6111F02B6112D003402DD03560317003800031304006C09005F
/*window.updateDeviceData = function (data) {
    console.log("updateDeviceData:", data)
    const minLength = 70;
    if (data.startsWith("AA") && data.length < minLength) {
        // 回显命令分成两个了，
        lastDeviceData = data;
        return;
    }
    if (data.endsWith("5F") && data.length < minLength) {
        data = lastDeviceData + data;
    }
    if (data.length < minLength) {
        return
    }
    if (!data.startsWith("AA")) {
        return
    }

    // 解析回显的数据
    let info = {};
    const hexToDec = this.hexToDec
    // 垂面模式
    info.verticalMode = hexToDec(data.substring(8, 10));
    // 运行模式
    info.carRunMode = hexToDec(data.substring(10, 12));
    // 前车体角度
    info.frontCarAngle = hexToDec(data.substring(12, 16));
    // 后车体角度
    info.rearCarAngle = hexToDec(data.substring(16, 20));
    //摇杆方向(0：停 1：前 2：后 3：左 4：右)
    info.rockerDir = hexToDec(data.substring(20, 22))
    //电池电量
    info.betteryLevel = hexToDec(data.substring(20, 22))
    /!* 传感器状态 *!/
    info.collisionSta = hexToDec(data.substring(22, 24))
    //超声碰撞状态（0：正常 1：左碰撞 2：右碰撞 3：左右碰撞）
    info.ultrasonicCollisionSta = hexToDec(data.substring(24, 26))
    //超声悬崖状态（0：正常 1：左悬崖 2：右悬崖 3：左右悬崖）
    info.cliffSta = hexToDec(data.substring(26, 28))
    //负压异常状态（0：正常 1：前失压 2：后失压 3：前后失压）
    info.adsorbPressureSta = hexToDec(data.substring(28, 30))
    //前模组通信状态(0: OK, 1：断开)
    info.p900CommSta = hexToDec(data.substring(30, 32))
    //算法单元通信状态(0: OK, 1：断开)
    info.rk3399CommSta = hexToDec(data.substring(32, 34))
    //后模组通信状态(0: OK, 1：断开)
    info.rearModuleCommSta = hexToDec(data.substring(34, 36))
    //左延边角度传感器实时角度
    info.ArmWheelLeftAngle = hexToDec(data.substring(36, 38))
    //右延边角度传感器实时角度
    info.ArmWheelRightAngle = hexToDec(data.substring(38, 40))
    //剩余未走完的延边距离(单位%)
    info.RemainHuggingSidepercent = hexToDec(data.substring(40, 44))
    //点云算法使能(PNCL: point cloud), 0: 禁止  1: 使能
    info.cameraPNCLAlgorithmEn = hexToDec(data.substring(44, 46))
    //RGB算法使能, 0: 禁止  1: 使能
    info.cameraRGBAlgorithmEn = hexToDec(data.substring(46, 48))
    //算法（障碍物）高度(mm)
    info.abstacleHight = hexToDec(data.substring(46, 50))
    //算法（障碍物）距离(mm)
    info.abstacleDis = hexToDec(data.substring(50, 54))
    //前升降限位状态（0：触发 1:未触发）
    info.frontDownlimitSta = hexToDec(data.substring(54, 56))
    //后升降限位状态（0：触发 1:未触发）
    info.backDownlimitSta = hexToDec(data.substring(56, 58))
    //前左碰撞超声距离(mm)
    info.leftCollision = hexToDec(data.substring(58, 62))
    //前右碰撞超声距离(mm)
    info.rightCollision = hexToDec(data.substring(62, 66))

    /!* 负压电机相关 *!/
    info.frontPressure = hexToDec(data.substring(66, 70))
    //后负压吸力采集值（Pa-帕）
    info.backPressure = hexToDec(data.substring(70, 74))
    //前负压电机转速
    info.frontMotorSpeed = hexToDec(data.substring(74, 78))
    //后负压电机转速
    info.backMotorSpeed = hexToDec(data.substring(78, 82))
    //水压值（Pa-帕）
    info.hydroPump = hexToDec(data.substring(82, 86))
    //a旋转杆角度（单位：度 - 放大10倍处理）
    info.aAngle = hexToDec(data.substring(86, 90))
    //b旋转杆角度（单位：度 - 放大10倍处理）
    info.bAngle = hexToDec(data.substring(90, 94))

    console.log("info data:", JSON.stringify(info));
}*/
