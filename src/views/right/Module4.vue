<template>
  <div>
    <el-space style="margin: 5px 5px 5px">
      <el-button type="danger" @click="onIPVSClk">视频监控</el-button>
      <el-button type="danger" @click="onResetClk">重置</el-button>
      <el-select v-model="echo.accuracy" placeholder="精度选择">
        <el-option
            v-for="item in accuracy"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-space>
    <el-card shadow="hover" :body-style="echo.calcCardPadding">
      <el-space v-spacing-bottom>
        <span>算法</span>
        <el-switch v-model="store.cameraPNCLAlgorithmEn" :active-value="1" :inactive-value="0"/>
        <span v-spacing-left>RGB相机</span>
        <el-switch v-model="store.cameraRGBAlgorithmEn" :active-value="1" :inactive-value="0"/>
      </el-space>
      <el-space :size="10">
        <el-radio-group v-model="store.verticalMode" style="margin-right: 5px">
          <el-radio :label="1"><span style="font-size: 16px">垂直模式</span></el-radio>
          <el-radio :label="0"><span style="font-size: 16px">非垂直模式</span></el-radio>
        </el-radio-group>
        <div class="radio-group">
          <input type="radio" id="0x09" value="9" name="carRunMode" :checked="store.carRunMode == 9" @click="store.onCarRunModeChanged">
          <label for="0x09">校准</label>
        </div>
      </el-space>
    </el-card>
  </div>
</template>

<script setup>
import { useStore } from "../../store/index.js";
import {useEcho} from "../../store/echo.js";
import {accuracy} from "./config.js";

const store = useStore()
const echo = useEcho()
const onIPVSClk = () => {
  window.play()
}
const onResetClk = () => {
  store.$reset()
  localStorage.removeItem('store')
}
</script>

<style scoped lang="scss">
.radio-group {
  position: relative;
  line-height: 30px;
  input[type="radio"] {
    height: 22px;
    width: 22px;
    margin-right: 10px;
    display: none;
  }
  input[type="radio"] + label::before {
    content: "\a0"; /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    width: 18px;
    height: 18px;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid #003c66;
    background: #fff;
    line-height: 22px;
    box-sizing: border-box;
  }
  input[type="radio"]:checked + label::before {
    background-color: #d23535;
    background-clip: content-box;
    padding: 3px;
  }
  input:checked+label::after {
    position: absolute;
    content: '';
    width: 4px;
    height: 4px;
    top: 12px;
    left: 6px;
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
  }
}
</style>
