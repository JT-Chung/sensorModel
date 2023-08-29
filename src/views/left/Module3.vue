<template>
  <el-card shadow="hover" :body-style="echo.getCardBodyStyle">
    <el-space v-spacing-bottom>
      <span class="label">Front brush:</span>
      <el-switch v-model="store.frontBrushCtr" :active-value="1" :inactive-value="0"/>
      <span v-spacing-left>Rear brush:</span>
      <el-switch v-model="store.rearBrushCtr" :active-value="1" :inactive-value="0"/>
    </el-space>
    <el-space v-spacing-bottom>
      <span class="label">F-cleaner:</span>
      <span>O</span>
      <el-select v-model="store.frontValveOpenTime" placeholder="here to choose">
        <el-option
            v-for="item in cleaningFluidOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <span>C</span>
      <el-select v-model="store.frontValveCloseTime" placeholder="here to choose">
        <el-option
            v-for="item in cleaningFluidOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-space>
    <el-space v-spacing-bottom>
      <span class="label">R-cleaner:</span>
      <span>O</span>
      <el-select v-model="store.backValveOpenTime" placeholder="here to choose">
        <el-option
            v-for="item in cleaningFluidOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <span>C</span>
      <el-select v-model="store.backValveCloseTime" placeholder="here to choose">
        <el-option
            v-for="item in cleaningFluidOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-space>
    <el-space>
      <span class="label">Side brush：</span>
      <el-switch v-model="store.sideBrushCtr" :active-value="1" :inactive-value="0"/>
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
