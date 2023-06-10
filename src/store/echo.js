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

        HuggingSidePercent: 0, //已清洗 <回显>
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
        collisionStaB0: '0',
        collisionStaB1: '0',
        collisionStaB2: '0',
        collisionStaB3: '0',
        collisionStaB4: '0',
        collisionStaB5: '0',
        collisionStaB6: '0',
        collisionStaB7: '0',
        aAngle: 0, //a旋转杆角度（单位：度 - 放大10倍处理） <回显>
        bAngle: 0, //b旋转杆角度（单位：度 - 放大10倍处理） <回显>
        leftCollisionDis: 0, //前左碰撞超声距离(mm) <回显>
        rightCollisionDis: 0, //前右碰撞超声距离(mm) <回显>
        frontPressure: 0, //前吸附吸力 <回显>
        backPressure: 0, //后吸附吸力 <回显>
        betteryLevel: 0, //电池电量 <回显>
        ultrasonicCollisionSta: 0, //超声碰撞状态（0：正常 1：左碰撞 2：右碰撞 3：左右碰撞） <回显>
        cliffSta: 0, //超声悬崖状态（0：正常 1：左悬崖 2：右悬崖 3：左右悬崖） <回显>
        ArmWheelLeftAngle: 0, //左延边角度传感器实时角度 <回显>
        ArmWheelRightAngle: 0, //右延边角度传感器实时角度 <回显>
        hydroPumpPressure: 0, //水压值（Pa-帕） <回显>
        frontCarAngle: 0, //前模组姿态（单位：度 - 放大10倍处理） <回显>
        rearCarAngle: 0, //后模组姿态（单位：度 - 放大10倍处理） <回显>
        abstacleHight: 0, //算法（障碍物）高度(mm) <回显>
        abstacleDis: 0, //算法（障碍物）距离(mm) <回显>
        huggingSidePercent: 0, //剩余未走完的延边距离(单位%) <回显>
        /* 双行消息 */
        verticalMode: 0,
        carRunMode: 0,
        cameraPNCLAlgorithmEn: 0,
        cameraRGBAlgorithmEn: 0,
        frontPressureSet: 0,
        backPressureSet: 0,
        //精度
        accuracy: 1,
        //屏幕可视高度
        availHeight: window.screen.availHeight,
        //状态
        succeed: { color: '#1684fc' },
        error: { color: '#d23535' }
    }),
    getters: {
        getUltrasonicCollisionStaLeft(state) {
            switch (state.ultrasonicCollisionSta) {
                case 0:
                    return state.succeed
                case 1:
                    return state.error
                case 2:
                    return state.succeed
                case 3:
                    return state.error
            }
        },
        getUltrasonicCollisionStaRight(state) {
            switch (state.ultrasonicCollisionSta) {
                case 0:
                    return state.succeed
                case 1:
                    return state.succeed
                case 2:
                    return state.error
                case 3:
                    return state.error
            }
        },
        getCliffStaLeft(state) {
            switch (state.cliffSta) {
                case 0:
                    return state.succeed
                case 1:
                    return state.error
                case 2:
                    return state.succeed
                case 3:
                    return state.error
            }
        },
        getCliffStaRight(state) {
            switch (state.cliffSta) {
                case 0:
                    return state.succeed
                case 1:
                    return state.succeed
                case 2:
                    return state.error
                case 3:
                    return state.error
            }
        },
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
})
