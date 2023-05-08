<template>
  <el-card shadow="hover">
    <el-space v-spacing-bottom>
      <span>爬行速度：</span>
      <el-select v-model="crawling.speed" placeholder="请选择" style="width: 150px">
        <el-option
            v-for="item in crawlingOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-space>
    <div v-spacing-bottom>
      <el-slider v-model="crawling.slider"/>
    </div>
    <div>
      <el-radio-group v-model="crawling.tabs" >
        <el-radio-button label="前" />
        <el-radio-button label="后" />
        <el-radio-button label="左" />
        <el-radio-button label="右" />
        <el-radio-button label="停" />
      </el-radio-group>
    </div>
  </el-card>
</template>

<script setup>
import {reactive} from "vue";
import {crawlingOptions} from "./config.js"
let crawling = reactive({
  speed: null,
  slider: 50,
  tabs: '前'
})
</script>

<style scoped>

</style>
