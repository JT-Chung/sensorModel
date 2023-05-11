import { defineStore } from "pinia";

let lastDeviceData = null
//获取本地缓存
const localState = JSON.parse(localStorage.getItem('store')) ?? {}
export const useStore = defineStore('store', {
    state: () => ({
        carVelocity: localState.carVelocity ?? 0, //爬行速度
        rockerDir: localState.rockerDir ?? 1, //遥感方向 (0：停 1：前 2：后 3：左 4：右)

        frontPressureSet: localState.frontPressureSet ?? 0, //前负压设定值（0 - 1000 对应 0-100%)
        frontMotorSpeed: 0, //前负压电机转速 <回显>
        frontPressure: localState.frontPressure ?? 0, //前吸附吸力
        backPressureSet: localState.backPressureSet ?? 0, //后负压设定值（0 - 1000 对应 0-100%）
        backMotorSpeed: 0, //后负压电机转速 <回显>
        backPressure: localState.backPressure ?? 0, //后吸附吸力
        adsorbPressureSta: 0, //负压异常状态（0：正常 1：前失压 2：后失压 3：前后失压） <回显>

        frontBrushCtr: localState.frontBrushCtr ?? 0, //前滚刷 (0:关 1：开)
        rearBrushCtr: localState.rearBrushCtr ?? 0, //后滚刷 (0:关 1：开)
        frontValveOpenTime: localState.frontValveOpenTime ?? 0, //前清洗液开（单位：秒 ）
        frontValveCloseTime: localState.frontValveCloseTime ?? 0, //前清洗液关（单位：秒 ）
        backValveOpenTime: localState.backValveOpenTime ?? 0, //后清洗液开（单位：秒 ）
        backValveCloseTime: localState.backValveCloseTime ?? 0, //后清洗液关（单位：秒 ）
        brushCtr: localState.brushCtr ?? 0, //边刷控制(0:关 1：开)

        aWinchCtr: localState.aWinchCtr ?? 3, //a卷扬机控制（0：停 1：收 2：放 3：自动）
        aWinchNeatenCtr: localState.aWinchNeatenCtr ?? 0, //a卷扬机理线器控制（0：自动 1：左 2：右 3：停）
        bWinchCtr: localState.bWinchCtr ?? 3, //b卷扬机控制（0：停 1：收 2：放 3：自动）

        p900CommSta: 0, //前模组通信状态(0: OK, 1：断开) <回显>
        rearModuleCommSta: 1, //后模组通信状态(0: OK, 1：断开) <回显>
        rk3399CommSta: 1, //算法CPU通信状态(0: OK, 1：断开) <回显>

        /*
        * 小车运行模式
        * 0x00:急停
        * 0x01:手动
        * 0x06:强制
        * 0x03:延边模式
        * 0x05:“之”字清洗模式
        * 0x04:越障模式
        *
        * 0x09:角度校准
        * */
        carRunMode: localState.carRunMode ?? '0x01',
        HuggingSideDis: localState.HuggingSideDis ?? 0, //延边模式距离(单位mm)
        RemainHuggingSidePercent: 0, //已清洗 <回显>
        autoMoveLevelDis: localState.autoMoveLevelDis ?? 0, //横向距离（m 目前单位为米）
        autoMoveVerticalDis: localState.autoMoveVerticalDis ?? 0, //纵向距离(cm 目前单位为厘米)

        crossAbstacleDis1: localState.crossAbstacleDis1 ?? 0, //前模组长度(mm)
        crossAbstacleDis2: localState.crossAbstacleDis2 ?? 0, //后模组长度(mm)
        frontLifterCmd: localState.frontLifterCmd ?? 0, //前模组升降控制（0：停 1：升 2：降）
        backLifterCmd: localState.backLifterCmd ?? 0,  //后升降控制（0：停 1：升 2：降）
        frontDownlimitSta: localState.frontDownlimitSta ?? 1, //前升降限位状态（0：触发 1:未触发）
        backDownlimitSta: localState.backDownlimitSta ?? 1, //后升降限位状态（0：触发 1:未触发）

        cameraPNCLAlgorithmEn: localState.cameraPNCLAlgorithmEn ?? 0, //点云算法使能(PNCL: point cloud), 0: 禁止  1: 使能
        cameraRGBAlgorithmEn: localState.cameraRGBAlgorithmEn ?? 0, //RGB算法使能, 0: 禁止  1: 使能
        verticalMode: localState.verticalMode ?? 0, //垂面模式（0-非垂面模式，1-垂面模式）

        /* 传感器状态 <回显> */
        //b0: 前模组-左侧向 碰撞(0:正常 1:碰撞)
        //b1: 前模组-左前向 碰撞(0:正常 1:碰撞)
        //b2: 前模组-右侧向 碰撞(0:正常 1:碰撞)
        //b3: 前模组-右前向 碰撞(0:正常 1:碰撞)
        //b4: 后模组-左侧向 碰撞(0:正常 1:碰撞)
        //b5: 后模组-左后向 碰撞(0:正常 1:碰撞)
        //b6: 后模组-右侧向 碰撞(0:正常 1:碰撞)
        //b7: 后模组-右后向 碰撞(0:正常 1:碰撞)
        collisionSta: {
            b0: 1,
            b1: 0,
            b2: 0,
            b3: 0,
            b4: 0,
            b5: 0,
            b6: 0,
            b7: 0,
        },
        ultrasonicCollisionSta: 0, //超声碰撞状态（0：正常 1：左碰撞 2：右碰撞 3：左右碰撞） <回显>
        cliffSta: 0, //超声悬崖状态（0：正常 1：左悬崖 2：右悬崖 3：左右悬崖） <回显>
        ArmWheelLeftAngle: 0, //左延边角度传感器实时角度 <回显>
        ArmWheelRightAngle: 0, //右延边角度传感器实时角度 <回显>

        //延边方向(自动延边=1时，设置无效):
        //  0：顺时针右边，  1： 顺时针下边，  3：顺时针上边，
        //  4：逆时针下边，  5： 逆时针左边，  6：逆时针上边，
        HuggingSideDir: localState.HuggingSideDir ?? 0,

        aAngle: 0, //a旋转杆角度（单位：度 - 放大10倍处理） <回显>
        bAngle: 0, //b旋转杆角度（单位：度 - 放大10倍处理） <回显>
        leftCollision: 0, //前左碰撞超声距离(mm) <回显>
        rightCollision: 0, //前右碰撞超声距离(mm) <回显>
        betteryLevel: 0, //电池电量 <回显>
        hydroPump: 0, //水压值（Pa-帕） <回显>
        frontCarAngle: 0, //前模组姿态（单位：度 - 放大10倍处理） <回显>
        rearCarAngle: 0, //后模组姿态（单位：度 - 放大10倍处理） <回显>
        abstacleHight: 0, //算法（障碍物）高度(mm) <回显>
        abstacleDis: 0, //算法（障碍物）距离(mm) <回显>

        //升降电机高度(mm) 界面不展示
        lifterHeight: null,
        //crc校验 界面不展示
        crc16: null
    }),
    getters: {
        getCardBodyStyle() {
            if (window.screen.availHeight === 800) return
            return {
                paddingTop: '10px',
                paddingBottom: '10px'
            }
        },
        calcCardPadding() {
          if (!this.getCardBodyStyle) {
              return {
                  paddingTop: '16px',
                  paddingBottom: '16px'
              }
          } else {
              return {
                  paddingTop: '8px',
                  paddingBottom: '8px'
              }
          }
        },
    },
    actions: {
        onCarRunModeChanged(event) {
            if (!event) return
            this.carRunMode = event.target.value
        },
        /* 串口通信库 */
        // 转换成小端模式
        toLittleEndianStr(hexStr) {
            if (hexStr.length === 4) {
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
        },
        // 10转16进制
        decToHex(num, maxLength) {
            num = num || 0;
            let str = parseInt(num).toString(16).padStart(maxLength, '0').toUpperCase();
            return this.toLittleEndianStr(str)
        },
        // 16转10进制
        hexToDec(hexStr, signed) {
            // 首位是否符号位
            signed = signed || false;
            // 转换成大端模式
            const str = this.toLittleEndianStr(hexStr)
            let num = parseInt(str, 16)
            if (signed && (num & 0x8000) > 0) {
                // 有符号数
                num = num - 0x10000;
            }
            return num;
        },
        sendCmd(param) {
            const decToHex = this.decToHex
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
                decToHex(param.backValveCloseTime, 4) +
                //crc校验
                decToHex(param.crc16, 4)

            const len = cmd.length / 2 + 4;
            // 下行命令消息
            cmd = "AA55" + decToHex(len, 2) + "30" + cmd + "5F5F"
            console.log("make softCmd:", cmd);
            console.log('this.sendCmd', this.sendCmd)
            // webview定制化开发的js方法, 通过底层串口下发命令
            window.sendCmd && window.sendCmd(cmd);
        },
        updateDeviceData(data) {
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
            /* 传感器状态 */
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

            /* 负压电机相关 */
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
            //合并到state内
            this.$patch(info)
        }
    }
})

