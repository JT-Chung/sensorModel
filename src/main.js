(function () {
    if (typeof EventTarget !== "undefined") {
        let func = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (type, fn, capture) {
            this.func = func;
            if (typeof capture !== "boolean") {
                capture = capture || {};
                capture.passive = false;
            }
            this.func(type, fn, capture);
        };
    }
}());

import { createApp } from 'vue'
import "normalize.css"
import { createPinia } from "pinia";
import { useEcho } from "./store/echo.js";
import App from './App.vue'

const pinia = createPinia()
const Vue = createApp(App)

/* 定义全局样式指令 */
Vue.directive('spacing-left', {
    mounted(el,binding) {
        const style = {
            paddingLeft: binding.value ? binding.value + 'px' : '10px'
        }
        Object.assign(el.style, style)
    }
})
Vue.directive('spacing-bottom', {
    mounted(el,binding) {
        const style = {
            paddingBottom: binding.value ? binding.value + 'px' : '4px'
        }
        Object.assign(el.style, style)
    }
})

Vue.use(pinia).mount('#app')

/* 串口通信库 */
const echo = useEcho()
//转换成小端模式
function toLittleEndianStr(hexStr) {
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
}
//16转10进制
function hexToDec(hexStr, signed) {
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
//16转2进制
function hexToBin(hex) {
    if (!hex) return
    return (parseInt(hex,16).toString(2)).padStart(8, '0')
}
let lastDeviceData = null
window.updateDeviceData = function (data) {
    const minLength = 90;
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
    // 垂面模式
    info.verticalMode = hexToDec(data.substring(8, 10));
    // 运行模式
    info.carRunMode = hexToDec(data.substring(10, 12));
    // 前车体角度
    info.frontCarAngle = hexToDec(data.substring(12, 16), true);
    // 后车体角度
    info.rearCarAngle = hexToDec(data.substring(16, 20),true);
    //摇杆方向(0：停 1：前 2：后 3：左 4：右)
    info.rockerDir = hexToDec(data.substring(20, 22))
    //电池电量
    info.betteryLevel = hexToDec(data.substring(22, 24))
    /* 传感器状态 */
    const collisionSta = hexToBin(data.substring(24, 26))
    if (collisionSta && collisionSta.length === 8) {
        info.collisionStaB0 = collisionSta[7]
        info.collisionStaB1 = collisionSta[6]
        info.collisionStaB2 = collisionSta[5]
        info.collisionStaB3 = collisionSta[4]
        info.collisionStaB4 = collisionSta[3]
        info.collisionStaB5 = collisionSta[2]
        info.collisionStaB6 = collisionSta[1]
        info.collisionStaB7 = collisionSta[0]
    }

    //超声碰撞状态（0：正常 1：左碰撞 2：右碰撞 3：左右碰撞）
    info.ultrasonicCollisionSta = hexToDec(data.substring(26, 28))
    //超声悬崖状态（0：正常 1：左悬崖 2：右悬崖 3：左右悬崖）
    info.cliffSta = hexToDec(data.substring(28, 30))
    //负压异常状态（0：正常 1：前失压 2：后失压 3：前后失压）
    info.adsorbPressureSta = hexToDec(data.substring(30, 32))
    //前模组通信状态(0: OK, 1：断开)
    info.p900CommSta = hexToDec(data.substring(32, 34))
    //算法单元通信状态(0: OK, 1：断开)
    info.rk3399CommSta = hexToDec(data.substring(34, 36))
    //后模组通信状态(0: OK, 1：断开)
    info.rearModuleCommSta = hexToDec(data.substring(36, 38))
    //左延边角度传感器实时角度
    info.ArmWheelLeftAngle = hexToDec(data.substring(38, 40))
    //右延边角度传感器实时角度
    info.ArmWheelRightAngle = hexToDec(data.substring(40, 42))
    //剩余未走完的延边距离(单位%)
    info.HuggingSidePercent = hexToDec(data.substring(42, 46))
    //点云算法使能(PNCL: point cloud), 0: 禁止  1: 使能
    info.cameraPNCLAlgorithmEn = hexToDec(data.substring(46, 48))
    //RGB算法使能, 0: 禁止  1: 使能
    info.cameraRGBAlgorithmEn = hexToDec(data.substring(48, 50))
    //算法（障碍物）高度(mm)
    info.abstacleHight = hexToDec(data.substring(50, 54))
    //算法（障碍物）距离(mm)
    info.abstacleDis = hexToDec(data.substring(54, 58))
    //前升降限位状态（0：触发 1:未触发）
    info.frontDownlimitSta = hexToDec(data.substring(58, 60))
    //后升降限位状态（0：触发 1:未触发）
    info.backDownlimitSta = hexToDec(data.substring(60, 62))
    //前左碰撞超声距离(mm)
    info.leftCollisionDis = hexToDec(data.substring(62, 66))
    //前右碰撞超声距离(mm)
    info.rightCollisionDis = hexToDec(data.substring(66, 70))

    //前负压设定值（0 - 1000 对应 0-100%)
    info.frontPressureSet = hexToDec(data.substring(70, 74))
    //后负压设定值（0 - 1000 对应 0-100%）
    info.backPressureSet = hexToDec(data.substring(74, 78))
    //前负压吸力采集值（Pa-帕） 27 - 28
    info.frontPressure = hexToDec(data.substring(78, 82))
    //后负压吸力采集值（Pa-帕）
    info.backPressure = hexToDec(data.substring(82, 86))
    //前负压电机转速
    info.frontMotorSpeed = hexToDec(data.substring(86, 90))
    //后负压电机转速
    info.backMotorSpeed = hexToDec(data.substring(90, 94))
    //水压值（Pa-帕）
    info.hydroPumpPressure = hexToDec(data.substring(94, 98))
    //a旋转杆角度（单位：度 - 放大10倍处理）
    info.aAngle = hexToDec(data.substring(98, 102),true)
    //b旋转杆角度（单位：度 - 放大10倍处理）
    info.bAngle = hexToDec(data.substring(102, 106),true)

    //合并到state内
    echo.$patch(info)

}
