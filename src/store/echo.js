import {defineStore} from "pinia";
// import {useStore} from "./index.js";

// let lastDeviceData = null
export const useEcho = defineStore('echo', {
    state: () => ({
        rockerDir: 1, //遥感方向 (0：停 1：前 2：后 3：左 4：右) <回显>
        frontMotorSpeed: 0, //前负压电机转速 <回显>
        backMotorSpeed: 0, //后负压电机转速 <回显>
        adsorbPressureSta: 0, //负压异常状态（0：正常 1：前失压 2：后失压 3：前后失压） <回显>

        p900CommSta: 0, //前模组通信状态(0: OK, 1：断开) <回显>
        rearModuleCommSta: 1, //后模组通信状态(0: OK, 1：断开) <回显>
        rk3399CommSta: 1, //算法CPU通信状态(0: OK, 1：断开) <回显>

        RemainHuggingSidePercent: 0, //已清洗 <回显>
        frontDownlimitSta: 1, //前升降限位状态（0：触发 1:未触发） <回显>
        backDownlimitSta: 1, //后升降限位状态（0：触发 1:未触发） <回显>

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
            b0: '0',
            b1: '0',
            b2: '0',
            b3: '0',
            b4: '0',
            b5: '0',
            b6: '0',
            b7: '0',
        },
        aAngle: 0, //a旋转杆角度（单位：度 - 放大10倍处理） <回显>
        bAngle: 0, //b旋转杆角度（单位：度 - 放大10倍处理） <回显>
        leftCollision: 0, //前左碰撞超声距离(mm) <回显>
        rightCollision: 0, //前右碰撞超声距离(mm) <回显>
        frontPressure: 0, //前吸附吸力 <回显>
        backPressure: 0, //后吸附吸力 <回显>
        betteryLevel: 0, //电池电量 <回显>
        ultrasonicCollisionSta: 0, //超声碰撞状态（0：正常 1：左碰撞 2：右碰撞 3：左右碰撞） <回显>
        cliffSta: 0, //超声悬崖状态（0：正常 1：左悬崖 2：右悬崖 3：左右悬崖） <回显>
        ArmWheelLeftAngle: 0, //左延边角度传感器实时角度 <回显>
        ArmWheelRightAngle: 0, //右延边角度传感器实时角度 <回显>
        hydroPump: 0, //水压值（Pa-帕） <回显>
        frontCarAngle: 0, //前模组姿态（单位：度 - 放大10倍处理） <回显>
        rearCarAngle: 0, //后模组姿态（单位：度 - 放大10倍处理） <回显>
        abstacleHight: 0, //算法（障碍物）高度(mm) <回显>
        abstacleDis: 0, //算法（障碍物）距离(mm) <回显>
        RemainHuggingSidepercent: 0, //剩余未走完的延边距离(单位%) <回显>

        //精度
        accuracy: 1,
        //屏幕可视高度
        availHeight: window.screen.availHeight
    }),
    getters: {
        getCardBodyStyle(state) {
            if (state.availHeight === 800) return
            return {
                paddingTop: '12px',
                paddingBottom: '12px'
            }
        },
        calcCardPadding(state) {
            if (state.availHeight === 800) {
                return {
                    paddingTop: '16px',
                    paddingBottom: '16px'
                }
            } else {
                return {
                    paddingTop: '10px',
                    paddingBottom: '10px'
                }
            }
        },
    },
    // actions: {
    //     /* 串口通信库 */
    //     // 转换成小端模式
    //     toLittleEndianStr(hexStr) {
    //         if (hexStr.length === 4) {
    //             // 暂时这样
    //             return hexStr.substr(2, 2) + hexStr.substr(0, 2);
    //         }
    //         if (hexStr.length > 5) {
    //             let tmp = "";
    //             for (let index = hexStr.length - 2; index >= 0; index -= 2) {
    //                 tmp += hexStr.substr(index, 2);
    //             }
    //             return tmp;
    //         }
    //         return hexStr;
    //     },
    //     // 16转10进制
    //     hexToDec(hexStr, signed) {
    //         // 首位是否符号位
    //         signed = signed || false;
    //         // 转换成大端模式
    //         const str = this.toLittleEndianStr(hexStr)
    //         let num = parseInt(str, 16)
    //         if (signed && (num & 0x8000) > 0) {
    //             // 有符号数
    //             num = num - 0x10000;
    //         }
    //         return num;
    //     },
    //     //16转2进制
    //     hexToBin(hex) {
    //         if (!hex) return
    //       return (parseInt(hex,16).toString(2)).padStart(8, '0')
    //     },
    //     updateDeviceData(data) {
    //         const minLength = 90;
    //         if (data.startsWith("AA") && data.length < minLength) {
    //             // 回显命令分成两个了，
    //             lastDeviceData = data;
    //             return;
    //         }
    //         if (data.endsWith("5F") && data.length < minLength) {
    //             data = lastDeviceData + data;
    //         }
    //         if (data.length < minLength) {
    //             return
    //         }
    //         if (!data.startsWith("AA")) {
    //             return
    //         }
    //
    //         // 解析回显的数据
    //         let info = {};
    //         const hexToDec = this.hexToDec
    //         // 垂面模式
    //         info.verticalMode = hexToDec(data.substring(8, 10));
    //         // 运行模式
    //         info.carRunMode = hexToDec(data.substring(10, 12));
    //         // 前车体角度
    //         info.frontCarAngle = hexToDec(data.substring(12, 16), true);
    //         // 后车体角度
    //         info.rearCarAngle = hexToDec(data.substring(16, 20),true);
    //         //摇杆方向(0：停 1：前 2：后 3：左 4：右)
    //         info.rockerDir = hexToDec(data.substring(20, 22))
    //         //电池电量
    //         info.betteryLevel = hexToDec(data.substring(22, 24))
    //         /* 传感器状态 */
    //         const collisionSta = this.hexToBin(hexToDec(data.substring(24, 26)))
    //         if (collisionSta && collisionSta.length === 8) {
    //             info.collisionSta = {}
    //             info.collisionSta.b0 = collisionSta[0]
    //             info.collisionSta.b1 = collisionSta[1]
    //             info.collisionSta.b2 = collisionSta[2]
    //             info.collisionSta.b3 = collisionSta[3]
    //             info.collisionSta.b4 = collisionSta[4]
    //             info.collisionSta.b5 = collisionSta[5]
    //             info.collisionSta.b6 = collisionSta[6]
    //             info.collisionSta.b7 = collisionSta[7]
    //         }
    //         //超声碰撞状态（0：正常 1：左碰撞 2：右碰撞 3：左右碰撞）
    //         info.ultrasonicCollisionSta = hexToDec(data.substring(26, 28))
    //         //超声悬崖状态（0：正常 1：左悬崖 2：右悬崖 3：左右悬崖）
    //         info.cliffSta = hexToDec(data.substring(28, 30))
    //         //负压异常状态（0：正常 1：前失压 2：后失压 3：前后失压）
    //         info.adsorbPressureSta = hexToDec(data.substring(30, 32))
    //         //前模组通信状态(0: OK, 1：断开)
    //         info.p900CommSta = hexToDec(data.substring(32, 34))
    //         //算法单元通信状态(0: OK, 1：断开)
    //         info.rk3399CommSta = hexToDec(data.substring(34, 36))
    //         //后模组通信状态(0: OK, 1：断开)
    //         info.rearModuleCommSta = hexToDec(data.substring(36, 38))
    //         //左延边角度传感器实时角度
    //         info.ArmWheelLeftAngle = hexToDec(data.substring(38, 40))
    //         //右延边角度传感器实时角度
    //         info.ArmWheelRightAngle = hexToDec(data.substring(40, 42))
    //         //剩余未走完的延边距离(单位%)
    //         info.RemainHuggingSidepercent = hexToDec(data.substring(42, 46))
    //         //点云算法使能(PNCL: point cloud), 0: 禁止  1: 使能
    //         info.cameraPNCLAlgorithmEn = hexToDec(data.substring(46, 48))
    //         //RGB算法使能, 0: 禁止  1: 使能
    //         info.cameraRGBAlgorithmEn = hexToDec(data.substring(48, 50))
    //         //算法（障碍物）高度(mm)
    //         info.abstacleHight = hexToDec(data.substring(50, 54))
    //         //算法（障碍物）距离(mm)
    //         info.abstacleDis = hexToDec(data.substring(54, 58))
    //         //前升降限位状态（0：触发 1:未触发）
    //         info.frontDownlimitSta = hexToDec(data.substring(58, 60))
    //         //后升降限位状态（0：触发 1:未触发）
    //         info.backDownlimitSta = hexToDec(data.substring(60, 62))
    //         //前左碰撞超声距离(mm)
    //         info.leftCollision = hexToDec(data.substring(62, 66))
    //         //前右碰撞超声距离(mm)
    //         info.rightCollision = hexToDec(data.substring(66, 70))
    //
    //         /* 负压电机相关 */
    //         info.frontPressure = hexToDec(data.substring(70, 74))
    //         //后负压吸力采集值（Pa-帕）
    //         info.backPressure = hexToDec(data.substring(74, 78))
    //         //前负压电机转速
    //         info.frontMotorSpeed = hexToDec(data.substring(78, 82))
    //         //后负压电机转速
    //         info.backMotorSpeed = hexToDec(data.substring(82, 86))
    //         //水压值（Pa-帕）
    //         info.hydroPump = hexToDec(data.substring(86, 90))
    //         //a旋转杆角度（单位：度 - 放大10倍处理）
    //         info.aAngle = hexToDec(data.substring(90, 94),true)
    //         //b旋转杆角度（单位：度 - 放大10倍处理）
    //         info.bAngle = hexToDec(data.substring(94, 98),true)
    //
    //         //合并到state内
    //         this.$patch(info)
    //
    //         //判断是否存在下行消息 如果存在 存储至store。todo
    //         const store = useStore()
    //         console.log('echo store updateDeviceData:', info)
    //
    //         //如果回显数据如果和原始值不一致 更新数据
    //         if (info.verticalMode !== null) {
    //             // const originData = JSON.parse(localStorage.getItem('verticalModeCache'))
    //             if (info.verticalMode != store.verticalMode) {
    //                 store.verticalMode = info.verticalMode
    //             }
    //         }
    //         if (info.carRunMode !== null) {
    //             // const originData = JSON.parse(localStorage.getItem('carRunModeCache'))
    //             if (info.carRunMode != store.carRunMode) {
    //                 store.carRunMode = info.carRunMode
    //             }
    //         }
    //         if (info.cameraPNCLAlgorithmEn !== null) {
    //             // const originData = JSON.parse(localStorage.getItem('cameraPNCLAlgorithmEnCache'))
    //             if (info.cameraPNCLAlgorithmEn != store.cameraPNCLAlgorithmEn) {
    //                 store.cameraPNCLAlgorithmEn = info.cameraPNCLAlgorithmEn
    //             }
    //         }
    //         if (info.cameraRGBAlgorithmEn !== null) {
    //             // const originData = JSON.parse(localStorage.getItem('cameraRGBAlgorithmEnCache'))
    //             if (info.cameraRGBAlgorithmEn != store.cameraRGBAlgorithmEn) {
    //                 store.cameraRGBAlgorithmEn = info.cameraRGBAlgorithmEn
    //             }
    //         }
    //
    //     },
    // }
})
