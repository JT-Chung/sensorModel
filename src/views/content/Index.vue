<template>
  <el-card shadow="hover">
    <b class="title">传感器状态</b>
    <div class="sensor-status">
      <el-icon :size="sensorStatusIconSize" class="ss1" @click="onIconClk"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss2"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss3"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss4"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss5"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss6"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss7"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss8"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss9"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss10"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss11"><HelpFilled /></el-icon>
      <el-icon :size="sensorStatusIconSize" class="ss12"><HelpFilled /></el-icon>

      <b class="sensor-status-text1">0度</b>
      <b class="sensor-status-text2">0度</b>
      <div class="top-banner">
      </div>
      <div class="bottom-banner">
      </div>
    </div>
  </el-card>

  <el-card style="position: relative" shadow="hover">
    <span>延边方向选择：</span>
    <div class="yanbian-bgc"></div>
    <span class="yanbian-btn" @click="onBtnClick"></span>
  </el-card>

  <el-card shadow="hover">
<!--    <el-descriptions>-->
<!--      <el-descriptions-item style="display: flex; justify-content: right" label="A旋转杆">{{info.A}}</el-descriptions-item>-->
<!--      <el-descriptions-item label="超声距离左">{{info.leftCsjl}}</el-descriptions-item>-->
<!--      <el-descriptions-item label="电量">{{info.dl}}</el-descriptions-item>-->
<!--      <el-descriptions-item label="B旋转杆">{{info.B}}</el-descriptions-item>-->
<!--      <el-descriptions-item label="超声距离右">{{info.rightCsjl}}</el-descriptions-item>-->
<!--      <el-descriptions-item label="水压">{{info.sy}}</el-descriptions-item>-->
<!--      <el-descriptions-item label="前模组姿态">{{info.qmzzt}}</el-descriptions-item>-->
<!--      <el-descriptions-item label="算法高度">{{info.sfgd}}</el-descriptions-item>-->
<!--      <el-descriptions-item label="后模组姿态">{{info.hmzzt}}</el-descriptions-item>-->
<!--      <el-descriptions-item label="算法距离">{{info.sfjl}}</el-descriptions-item>-->
<!--    </el-descriptions>-->
    <ul class="desc">
      <li> <span>A旋转杆：</span> <span>{{info.A}}</span> </li>
      <li> <span>超声距离左：</span> <span>{{info.leftCsjl}}</span> </li>
      <li> <span>电量：</span> <span>{{info.dl}}</span> </li>
      <li> <span>B旋转杆：</span> <span>{{info.B}}</span> </li>
      <li> <span>超声距离右：</span> <span>{{info.rightCsjl}}</span> </li>
      <li> <span>水压：</span> <span>{{info.sy}}</span> </li>
      <li> <span>前模组姿态：</span> <span>{{info.qmzzt}}</span> </li>
      <li> <span>算法高度：</span> <span>{{info.sfgd}}</span> </li>
      <li> <span>后模组姿态：</span> <span>{{info.hmzzt}}</span> </li>
      <li> <span>算法距离：</span> <span>{{info.sfjl}}</span> </li>
    </ul>
  </el-card>
</template>

<script setup>
import {reactive,ref} from "vue";
import {HelpFilled} from "@element-plus/icons-vue";

const sensorStatusIconSize = 30

let info = reactive({
  A: 0,
  leftCsjl: '10mm',
  dl: '90%',
  B: 0,
  rightCsjl: '10mm',
  sy: '0.2pa',
  qmzzt: 0,
  sfgd: '10mm',
  hmzzt: 0,
  sfjl: '10mm'
})
const onIconClk = (el) => {
  console.log(el.classList)
  console.log(el.target)
  return
  const style = {
    color: 'red',
    backgroundColor: 'red'
  }
  Object.assign(el.style, style)
}
const onBtnClick = () => {
  console.log('点击了')
}
let color = ''
const iconStyles = ref({
  ss1: ''
})
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
    left: 62px;
    top: 0;
    color: #1684fc;
  }
  .ss2 {
    position: absolute;
    left: 103px;
    top: 3px;
    color: #1684fc;
  }
  .ss3 {
    position: absolute;
    left: 46px;
    top: 38px;
    color: #1684fc;
  }
  .ss4 {
    position: absolute;
    left: 140px;
    top: 62px;
    color: #1684fc;
  }
  .ss5 {
    position: absolute;
    right: 62px;
    top: 0;
    color: #1684fc;
  }
  .ss6 {
    position: absolute;
    right: 104px;
    top: 4px;
    color: #1684fc;
  }
  .ss7 {
    position: absolute;
    right: 40px;
    top: 34px;
    color: #1684fc;
  }
  .ss8 {
    position: absolute;
    right: 142px;
    top: 60px;
    color: #1684fc;
  }
  .ss9 {
    position: absolute;
    left: 38px;
    bottom: 25px;
    color: #1684fc;
  }
  .ss10 {
    position: absolute;
    left: 80px;
    bottom: 0;
    color: #1684fc;
  }
  .ss11 {
    position: absolute;
    right: 41px;
    bottom: 25px;
    color: #1684fc;
  }
  .ss12 {
    position: absolute;
    right: 84px;
    bottom: 0;
    color: #1684fc;
  }
  &-text1 {
    font-size: 20px;
    color: #d74d4d;
    position: absolute;
    top: 77px;
    left: 42px;
  }
  &-text2 {
    font-size: 20px;
    color: #d74d4d;
    position: absolute;
    top: 77px;
    right: 50px;
  }
}
.top-banner {
  height: 140px;
  width: 100%;
  background-image: url("../../assets/topBanner.png");
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 100% 140px;
}
.bottom-banner {
  height: 140px;
  width: 100%;
  background-image: url("../../assets/bottomBanner.png");
  background-repeat: no-repeat;
  background-position: -8px 8px;
  background-size: 100% 140px;
}
.yanbian-bgc {
  height: 180px;
  width: 100%;
  margin-top: 5px;
  background-image: url("../../assets/direction.png");
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 100% 180px;
}
.yanbian-btn {
  position: absolute;
  display: inline-block;
  width: 50px;
  height: 40px;
  border: 1px solid #13950a;
  left: 115px;
  top: 58px;
  opacity: 0;
  &:active {
    background-color: #13950a;
    opacity: .6;
    border-radius: 5px;
  }
}
.desc {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 33.33%;
    height: 35px;
    line-height: 35px;
    display: flex;
    justify-content: space-between;
    span:last-child {
      padding-right: 10px;
    }
  }
}
</style>
