<template>
  <el-card shadow="hover" :body-style="echo.getCardBodyStyle">
    <b class="title">传感器状态</b>
    <div class="sensor-status">
      <el-icon :size="sensorStatusIconSize" class="ss1" :style="echo.collisionStaB1 === '0' ? {color: '#1684fc'} : {color: '#d23535'}"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss2" :style="echo.getUltrasonicCollisionStaLeft"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss3" :style="echo.collisionStaB0 === '0' ? {color: '#1684fc'} : {color: '#d23535'}"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss4" :style="echo.getCliffStaLeft"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss5" :style="echo.collisionStaB3 === '0' ? {color: '#1684fc'} : {color: '#d23535'}"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss6" :style="echo.getUltrasonicCollisionStaRight"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss7" :style="echo.collisionStaB2 === '0' ? {color: '#1684fc'} : {color: '#d23535'}"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss8" :style="echo.getCliffStaRight"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss9" :style="echo.collisionStaB4 === '0' ? {color: '#1684fc'} : {color: '#d23535'}"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss10" :style="echo.collisionStaB5 === '0' ? {color: '#1684fc'} : {color: '#d23535'}"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss11" :style="echo.collisionStaB6 === '0' ? {color: '#1684fc'} : {color: '#d23535'}"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss12" :style="echo.collisionStaB7 === '0' ? {color: '#1684fc'} : {color: '#d23535'}"><HelpFilled /></el-icon>

      <b class="sensor-status-text-left">{{echo.ArmWheelLeftAngle}}度</b>
      <b class="sensor-status-text-right">{{echo.ArmWheelRightAngle}}度</b>
      <div class="top-banner">
      </div>
      <div class="bottom-banner">
      </div>
    </div>
  </el-card>

  <el-card style="position: relative" shadow="hover" :body-style="echo.getCardBodyStyle">
    <span>延边方向选择：</span>
    <div class="yanbian-bgc">
      <input  type="radio" name="HuggingSideDir" id="HuggingSideDir0" :value="4" class="yb0" @click="onYBChanged" :checked="store.HuggingSideDir === 4">
      <input  type="radio" name="HuggingSideDir" id="HuggingSideDir1" :value="1" class="yb1" @click="onYBChanged" :checked="store.HuggingSideDir === 1">
      <input  type="radio" name="HuggingSideDir" id="HuggingSideDir3" :value="3" class="yb3" @click="onYBChanged" :checked="store.HuggingSideDir === 3">
      <input  type="radio" name="HuggingSideDir" id="HuggingSideDir4" :value="5" class="yb4" @click="onYBChanged" :checked="store.HuggingSideDir === 5">
      <input  type="radio" name="HuggingSideDir" id="HuggingSideDir5" :value="8" class="yb5" @click="onYBChanged" :checked="store.HuggingSideDir === 8">
      <input  type="radio" name="HuggingSideDir" id="HuggingSideDir6" :value="7" class="yb6" @click="onYBChanged" :checked="store.HuggingSideDir === 7">
    </div>
  </el-card>

  <el-card shadow="hover" :body-style="echo.calcCardPadding">
    <ul class="desc">
      <li>
        <div><span>A旋转杆：</span> <span>{{echo.aAngle}}°</span></div>
        <div><span>B旋转杆：</span> <span>{{echo.bAngle}}°</span></div>
        <div><span>前模组姿态：</span> <span>{{echo.frontCarAngle}}°</span></div>
        <div><span>后模组姿态：</span> <span>{{echo.rearCarAngle}}°</span></div>
      </li>
      <li>
        <div><span>超声距离左：</span> <span>{{echo.leftCollisionDis}}&nbsp;mm</span></div>
        <div><span>超声距离右：</span> <span>{{echo.rightCollisionDis}}&nbsp;mm</span></div>
        <div><span>算法高度：</span> <span>{{echo.abstacleHight}}&nbsp;mm</span></div>
        <div><span>算法距离：</span> <span>{{echo.abstacleDis}}&nbsp;mm</span></div>
      </li>
      <li>
        <div><span>电量：</span> <span>{{echo.betteryLevel}}&nbsp;% </span></div>
        <div><span>水压：</span> <span>{{echo.hydroPumpPressure}}&nbsp;Pa</span></div>
        <div><span>已清洗：</span> <span>{{echo.HuggingSidePercent}}&nbsp;% </span></div>
      </li>
    </ul>
  </el-card>
</template>

<script setup>
import { useStore } from "../../store/index.js";
import { useEcho } from "../../store/echo.js";
import {HelpFilled} from "@element-plus/icons-vue";

const store = useStore()
const echo = useEcho()

const sensorStatusIconSize = 30

const onYBChanged = (event) => {
  store.HuggingSideDir = parseInt(event.target.value)
}
</script>

<style scoped lang="scss">
.el-card {
  border-radius: 15px;
}
.title {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.sensor-status {
  position: relative;
  .ss1 {
    position: absolute;
    left: 25px;
    top: -30px;
    color: blue;
  }
  .ss2 {
    position: absolute;
    left: 75px;
    top: -25px;
    color: #1684fc;
  }
  .ss3 {
    position: absolute;
    left: 5px;
    top: 10px;
    color: #1684fc;
  }
  .ss4 {
    position: absolute;
    left: 100px;
    top: 60px;
    color: #1684fc;
  }
  .ss5 {
    position: absolute;
    right: 22px;
    top: -30px;
    color: #1684fc;
  }
  .ss6 {
    position: absolute;
    right: 75px;
    top: -25px;
    color: #1684fc;
  }
  .ss7 {
    position: absolute;
    right: 5px;
    top: 10px;
    color: #1684fc;
  }
  .ss8 {
    position: absolute;
    right: 100px;
    top: 60px;
    color: #1684fc;
  }
  .ss9 {
    position: absolute;
    left: 10px;
    bottom: 10px;
    color: #1684fc;
  }
  .ss10 {
    position: absolute;
    left: 50px;
    bottom: -15px;
    color: #1684fc;
  }
  .ss11 {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #1684fc;
  }
  .ss12 {
    position: absolute;
    right: 50px;
    bottom: -15px;
    color: #1684fc;
  }
  &-text-left {
    font-size: 20px;
    color: #d74d4d;
    position: absolute;
    top: 50px;
    left: 10px;
  }
  &-text-right {
    font-size: 20px;
    color: #d74d4d;
    position: absolute;
    top: 50px;
    right: 10px;
  }
}
.banner {
  height: 280px;
  width: 100%;
  background-image: url("../../assets/banner.png");
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 100% 280px;
}
// .top-banner {
//   height: 140px;
//   width: 100%;
//   background-image: url("../../assets/topBanner.png");
//   background-repeat: no-repeat;
//   background-position: top left;
//   background-size: 100% 140px;
// }
// .bottom-banner {
//   height: 140px;
//   width: 100%;
//   background-image: url("../../assets/bottomBanner.png");
//   background-repeat: no-repeat;
//   background-position: -8px 8px;
//   background-size: 100% 140px;
// }
.yanbian-bgc {
  height: 180px;
  width: 100%;
  margin-top: 5px;
  background-image: url("../../assets/direction.png");
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 100% 180px;
  position: relative;

  input {
    position: absolute;
    display: inline-block;
    width: 30px;
    height: 20px;
    cursor: pointer;
  }
  .yb0 {
    left: 181px;
    top: 74px;
  }
  .yb1 {
    left: 112px;
    bottom: 23px;
  }
  .yb3 {
    left: 99px;
    top: 23px;
  }
  .yb4 {
    right: 106px;
    bottom: 24px;
  }
  .yb5 {
    right: 180px;
    top: 74px;
  }
  .yb6 {
    right: 96px;
    top: 24px;
  }
}

.desc {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  li{
    flex-basis: 30%;
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      justify-content: space-between;
      height: 35px;
      line-height: 35px;
      span:first-child {
        white-space: nowrap;
      }
      span:last-child {
        padding-right: 5px;
        overflow: auto;
      }
    }
  }
  li:nth-child(2) {
    width: 40%;
    flex-basis: 40%;
  }
}
</style>
