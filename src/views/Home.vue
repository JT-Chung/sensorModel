<template>
  <el-container >
    <el-aside width="29%" class="aside-left">
      <left />
    </el-aside>
    <el-main width="41%">
      <content />
    </el-main>
    <el-aside width="30%" class="aside-right">
      <right />
    </el-aside>
  </el-container>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "../store/index.js";
import { useEcho } from "../store/echo.js";
import Left from "./left/Index.vue"
import Right from "./right/Index.vue"
import Content from "./content/Index.vue"

const store = useStore()
const echo = useEcho()

//挂载windows
// window.updateDeviceData = echo.updateDeviceData

store.$subscribe((mutation, state) => {
  //如果数据发生改动 发送数据包并缓存数据到本地
  store.sendCmd(state)
  localStorage.setItem('store', JSON.stringify(state))
  //缓存此四种数据以解决上、下行消息冲突问题
  // if (mutation.events.key === 'verticalMode') {
  //   localStorage.setItem('verticalModeCache', JSON.stringify(mutation.events.oldValue))
  // }
  // if (mutation.events.key === 'carRunMode') {
  //   localStorage.setItem('carRunModeCache', JSON.stringify(mutation.events.oldValue))
  // }
  // if (mutation.events.key === 'cameraPNCLAlgorithmEn') {
  //   localStorage.setItem('cameraPNCLAlgorithmEnCache', JSON.stringify(mutation.events.oldValue))
  // }
  // if (mutation.events.key === 'cameraRGBAlgorithmEn') {
  //   localStorage.setItem('cameraRGBAlgorithmEnCache', JSON.stringify(mutation.events.oldValue))
  // }

})

// onMounted(() => {
//   tableHeight.value = document.documentElement.clientHeight - 342
//   window.onresize = function () {
//     tableHeight.value = document.documentElement.clientHeight - 342
//   }
// })
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  width: 100%;
  padding: 9px;
}
.el-main {
  padding: 0;
  //&::after {
  //  display: block;
  //  content: '';
  //  width: 2px;
  //  height: 100%;
  //  margin: 0 auto;
  //  border-left: 2px solid #888;
  //  position: absolute;
  //  left: 0;
  //  top: 12px;
  //}
  //&::before {
  //  display: block;
  //  content: '';
  //  width: 2px;
  //  height: 100%;
  //  margin: 0 auto;
  //  border-right: 2px solid #888;
  //  position: absolute;
  //  right: 0;
  //  top: 12px;
  //}
}
</style>
