import { defineStore } from "pinia";
import { useEcho } from "./echo.js";

export const useStore = defineStore('store', {
    state: () => ({
        carVelocity: 0, //爬行速度

        frontPressureSet: 0, //前负压设定值（0 - 1000 对应 0-100%)

        backPressureSet: 0, //后负压设定值（0 - 1000 对应 0-100%）

        frontBrushCtr: 0, //前滚刷 (0:关 1：开)
        rearBrushCtr: 0, //后滚刷 (0:关 1：开)
        frontValveOpenTime: 0, //前清洗液开（单位：秒 ）
        frontValveCloseTime: 0, //前清洗液关（单位：秒 ）
        backValveOpenTime: 0, //后清洗液开（单位：秒 ）
        backValveCloseTime: 0, //后清洗液关（单位：秒 ）
        sideBrushCtr: 0, //边刷控制(0:关 1：开)

        aWinchCtr: 0, //a卷扬机控制（0：停 1：收 2：放 3：自动）
        aWinchNeatenCtr: 0, //a卷扬机理线器控制（3：自动 1：左 2：右 0：停）
        bWinchCtr: 0, //b卷扬机控制（0：停 1：收 2：放 3：自动）

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
        carRunMode: 0,
        HuggingSideDis: 0, //延边模式距离(单位mm)
        autoMoveLevelDis: 0, //横向距离（m 目前单位为米）
        autoMoveVerticalDis: 0, //纵向距离(cm 目前单位为厘米)

        crossAbstacleDis1: 0, //前模组长度(mm)
        crossAbstacleDis2: 0, //后模组长度(mm)
        frontLifterCmd: 0, //前模组升降控制（0：停 1：升 2：降）
        backLifterCmd: 0,  //后升降控制（0：停 1：升 2：降）

        cameraPNCLAlgorithmEn: 0, //点云算法使能(PNCL: point cloud), 0: 禁止  1: 使能
        cameraRGBAlgorithmEn: 0, //RGB算法使能, 0: 禁止  1: 使能
        loraCtrl: 0, //lora模块开启/关闭(0: 开启　 1: 关闭)
        verticalMode: 0, //垂面模式（0-非垂面模式，1-垂面模式）

        //延边方向(自动延边=1时，设置无效):
        //  4：顺时针右边，  1： 顺时针下边，  3：顺时针上边，
        //  5：逆时针下边，  8： 逆时针左边，  7：逆时针上边，
        HuggingSideDir: 4,

        //升降电机高度(mm) 界面不展示
        lifterHeight: 0,
    }),
    actions: {
        /* 双行消息下发 */
        onVerticalModeChanged(val) {
            this.sendCmd({
                ...this.$state,
                verticalMode:val,
                carRunMode: useEcho().$state.carRunMode,
                frontPressureSet: useEcho().$state.frontPressureSet,
                backPressureSet: useEcho().$state.backPressureSet,
            })
        },
        onCarRunModeChanged(event) {
            if (!event) return
            if (event.target?.value) {
                this.sendCmd({
                    ...this.$state,
                    verticalMode:useEcho().$state.verticalMode,
                    carRunMode: parseInt(event.target.value),
                    frontPressureSet: useEcho().$state.frontPressureSet,
                    backPressureSet: useEcho().$state.backPressureSet,
                })
            }
        },
        onCameraPNCLAlgorithmEnChanged(val) {
            this.cameraPNCLAlgorithmEn = val
            // this.sendCmd({
            //     ...this.$state,
            //     verticalMode:useEcho().$state.verticalMode,
            //     carRunMode: useEcho().$state.carRunMode,
            //     frontPressureSet: useEcho().$state.frontPressureSet,
            //     backPressureSet: useEcho().$state.backPressureSet,
            // })
        },
        onCameraRGBAlgorithmEnChanged(val) {
            this.cameraRGBAlgorithmEn = val
            // this.sendCmd({
            //     ...this.$state,
            //     verticalMode:useEcho().$state.verticalMode,
            //     carRunMode: useEcho().$state.carRunMode,
            //     frontPressureSet: useEcho().$state.frontPressureSet,
            //     backPressureSet: useEcho().$state.backPressureSet,
            // })
        },
        onFrontPressureSetChanged(val) {
            this.frontPressureSet = val
            this.sendCmd({
                ...this.$state,
                verticalMode:useEcho().$state.verticalMode,
                carRunMode: useEcho().$state.carRunMode,
                frontPressureSet: val,
                backPressureSet: useEcho().$state.backPressureSet,
            })
            useEcho().$patch({
                frontPressureFlag: false
            })
        },
        onBackPressureSetChanged(val) {
            this.backPressureSet = val
            this.sendCmd({
                ...this.$state,
                verticalMode:useEcho().$state.verticalMode,
                carRunMode: useEcho().$state.carRunMode,
                frontPressureSet: useEcho().$state.frontPressureSet,
                backPressureSet: val,
            })
            useEcho().$patch({
                backPressureSetFlag: false
            })
        },
        /* end */
        onCarVelocityChanged(val) {
            this.carVelocity = val
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
        sendCmd(param) {
            console.log('send:', param)
            const decToHex = this.decToHex
            let cmd =
                decToHex(param.verticalMode, 2) +
                decToHex(param.carRunMode, 2) +
                decToHex(param.carVelocity, 4) +
                decToHex(param.frontBrushCtr, 2) +
                decToHex(param.rearBrushCtr, 2) +
                decToHex(param.sideBrushCtr, 2) +
                decToHex(param.frontPressureSet, 4) +
                decToHex(param.backPressureSet, 4) +
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

                decToHex(param.cameraPNCLAlgorithmEn,2) +
                decToHex(param.cameraRGBAlgorithmEn,2) +
                decToHex(param.loraCtrl,2)

            const len = cmd.length / 2 + 4;
            cmd = "AA55" + decToHex(len, 2) + "30" + cmd + "5F5F"
            // webview定制化开发的js方法, 通过底层串口下发命令
            window.sendCmd && window.sendCmd(cmd);
        }
    }
})

