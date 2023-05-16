<template>
  <el-card shadow="hover" :body-style="echo.getCardBodyStyle">
    <div v-spacing-bottom style="display: flex; justify-content: space-between"><span>通讯状态：</span> <span @click="triggerFullScreen"><el-icon style="color: #efefef"><Switch /></el-icon></span></div>
    <el-space size="large">
      <span>
        前模组
        <el-icon size="20" class="icon-style" :style="{color: echo.p900CommSta === 0 ? '#13950a': '#d23535'}"><SuccessFilled /></el-icon>
      </span>
      <span>
          后模组
      </span>
      <el-icon size="20" class="icon-style" :style="{color: echo.rearModuleCommSta === 0 ? '#13950a': '#d23535'}"><SuccessFilled /></el-icon>
      <span>
          算法CPU
      </span>
      <el-icon size="20" class="icon-style" :style="{color: echo.rk3399CommSta === 0 ? '#13950a': '#d23535'}"><SuccessFilled /></el-icon>
    </el-space>
  </el-card>
</template>

<script setup>
import { useStore } from "../../store/index.js";
import { useEcho } from "../../store/echo.js";
import {SuccessFilled,Switch } from "@element-plus/icons-vue";

const store = useStore()
const echo = useEcho()
const triggerFullScreen = () => {
  if (window.screen.availHeight === 800) {
    document.exitFullscreen()
    echo.availHeight = 776
  } else {
    document.documentElement.requestFullscreen()
    echo.availHeight = 800
  }
}
</script>

<style scoped>
.icon-style {
  vertical-align: bottom;
  color: #13950a;
}
</style>
