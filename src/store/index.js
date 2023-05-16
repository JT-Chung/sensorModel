import { defineStore } from "pinia";

//获取本地缓存
const localState = JSON.parse(localStorage.getItem('store')) ?? {}
export const useStore = defineStore('store', {
    state: () => ({
        carVelocity: localState.carVelocity ?? 0, //爬行速度

        frontPressureSet: localState.frontPressureSet ?? 0, //前负压设定值（0 - 1000 对应 0-100%)

        backPressureSet: localState.backPressureSet ?? 0, //后负压设定值（0 - 1000 对应 0-100%）

        frontBrushCtr: localState.frontBrushCtr ?? 0, //前滚刷 (0:关 1：开)
        rearBrushCtr: localState.rearBrushCtr ?? 0, //后滚刷 (0:关 1：开)
        frontValveOpenTime: localState.frontValveOpenTime ?? 0, //前清洗液开（单位：秒 ）
        frontValveCloseTime: localState.frontValveCloseTime ?? 0, //前清洗液关（单位：秒 ）
        backValveOpenTime: localState.backValveOpenTime ?? 0, //后清洗液开（单位：秒 ）
        backValveCloseTime: localState.backValveCloseTime ?? 0, //后清洗液关（单位：秒 ）
        brushCtr: localState.brushCtr ?? 0, //边刷控制(0:关 1：开)

        aWinchCtr: localState.aWinchCtr ?? 0, //a卷扬机控制（0：停 1：收 2：放 3：自动）
        aWinchNeatenCtr: localState.aWinchNeatenCtr ?? 3, //a卷扬机理线器控制（0：自动 1：左 2：右 3：停）
        bWinchCtr: localState.bWinchCtr ?? 0, //b卷扬机控制（0：停 1：收 2：放 3：自动）

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
        carRunMode: localState.carRunMode ?? '0',
        HuggingSideDis: localState.HuggingSideDis ?? 0, //延边模式距离(单位mm)
        autoMoveLevelDis: localState.autoMoveLevelDis ?? 0, //横向距离（m 目前单位为米）
        autoMoveVerticalDis: localState.autoMoveVerticalDis ?? 0, //纵向距离(cm 目前单位为厘米)

        crossAbstacleDis1: localState.crossAbstacleDis1 ?? 0, //前模组长度(mm)
        crossAbstacleDis2: localState.crossAbstacleDis2 ?? 0, //后模组长度(mm)
        frontLifterCmd: localState.frontLifterCmd ?? 0, //前模组升降控制（0：停 1：升 2：降）
        backLifterCmd: localState.backLifterCmd ?? 0,  //后升降控制（0：停 1：升 2：降）

        cameraPNCLAlgorithmEn: localState.cameraPNCLAlgorithmEn ?? 0, //点云算法使能(PNCL: point cloud), 0: 禁止  1: 使能
        cameraRGBAlgorithmEn: localState.cameraRGBAlgorithmEn ?? 0, //RGB算法使能, 0: 禁止  1: 使能
        verticalMode: localState.verticalMode ?? 0, //垂面模式（0-非垂面模式，1-垂面模式）

        //延边方向(自动延边=1时，设置无效):
        //  0：顺时针右边，  1： 顺时针下边，  3：顺时针上边，
        //  4：逆时针下边，  5： 逆时针左边，  6：逆时针上边，
        HuggingSideDir: localState.HuggingSideDir ?? 0,

        //升降电机高度(mm) 界面不展示
        lifterHeight: 0,
    }),
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
        sendCmd(param) {
            const decToHex = this.decToHex
            let cmd =
                decToHex(param.verticalMode, 2) +
                decToHex(param.carRunMode, 2) +
                decToHex(param.carVelocity, 4) +
                decToHex(param.frontBrushCtr, 2) +
                decToHex(param.rearBrushCtr, 2) +
                decToHex(param.brushCtr, 2) +
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
                decToHex(param.cameraRGBAlgorithmEn,2)

            const len = cmd.length / 2 + 2;
            // 下行命令消息  + "5F5F"
            cmd = "AA55" + decToHex(len, 2) + "30" + cmd
            // webview定制化开发的js方法, 通过底层串口下发命令
            window.sendCmd && window.sendCmd(cmd);
        }
    }
})
