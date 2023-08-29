<template>
  <div>
    <el-space style="margin: 5px 5px 5px">
      <el-button type="danger" @click="onIPVSClk">Monitor</el-button>
      <el-button type="danger" @click="onResetClk">Reset</el-button>
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
        <span>ALGO</span>
        <el-switch v-model="store.cameraPNCLAlgorithmEn" :active-value="1" :inactive-value="0" />
        <span v-spacing-left="1">CAM</span>
        <el-switch v-model="store.cameraRGBAlgorithmEn" :active-value="1" :inactive-value="0" />
        <span v-spacing-left="1">R-CONN</span>
        <el-switch v-model="store.loraCtrl" :active-value="1" :inactive-value="0"></el-switch>
      </el-space>
      <div style="display: flex;justify-content: space-between;align-items: center;">
        <el-radio-group v-model="echo.verticalMode" @change="store.onVerticalModeChanged">
          <el-radio :label="1">Vertical</el-radio>
          <el-radio :label="0">non-verticality</el-radio>
        </el-radio-group>
        <div class="radio-group">
          <input type="radio" id="0x09" value="9" name="carRunMode" v-model.number="echo.carRunMode" @click="store.onCarRunModeChanged">
          <label for="0x09">CAL</label>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useStore } from "../../store/index.js";
import {useEcho} from "../../store/echo.js";
import {accuracy} from "./config.js";

const store = useStore()
const echo = useEcho()
//视频监控
const onIPVSClk = () => {
  window.play()
}
const onResetClk = () => {
  store.$reset()
}
</script>

<style scoped lang="scss">
.radio-group {
  position: relative;
  line-height: 30px;
  padding-right: 10px;
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
