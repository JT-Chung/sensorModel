<template>
  <el-card shadow="hover" :body-style="echo.getCardBodyStyle">
    <el-space v-spacing-bottom>
      <span class="label">前滚刷：</span>
      <el-switch v-model="store.frontBrushCtr" :active-value="1" :inactive-value="0"/>
      <span v-spacing-left>后滚刷：</span>
      <el-switch v-model="store.rearBrushCtr" :active-value="1" :inactive-value="0"/>
    </el-space>
    <el-space v-spacing-bottom>
      <span class="label">前清洗液：</span>
      <span>开</span>
      <el-select v-model="store.frontValveOpenTime" placeholder="请选择">
        <el-option
            v-for="item in cleaningFluidOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <span>关</span>
      <el-select v-model="store.frontValveCloseTime" placeholder="请选择">
        <el-option
            v-for="item in cleaningFluidOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-space>
    <el-space v-spacing-bottom>
      <span class="label">后清洗液：</span>
      <span>开</span>
      <el-select v-model="store.backValveOpenTime" placeholder="请选择">
        <el-option
            v-for="item in cleaningFluidOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <span>关</span>
      <el-select v-model="store.backValveCloseTime" placeholder="请选择">
        <el-option
            v-for="item in cleaningFluidOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-space>
    <el-space>
      <span class="label">边刷：</span>
      <el-switch v-model="store.brushCtr" :active-value="1" :inactive-value="0"/>
    </el-space>
  </el-card>
</template>

<script setup>
import { useStore } from "../../store/index.js";
import { useEcho } from "../../store/echo.js";
import {cleaningFluidOptions} from "./config.js"

const store = useStore()
const echo = useEcho()
</script>

<style scoped>
.label {
  white-space: nowrap;
}
.el-select {
  width: 90px;
}
</style>
