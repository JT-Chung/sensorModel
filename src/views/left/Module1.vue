<template>
  <el-card shadow="hover" :body-style="echo.getCardBodyStyle">
    <el-space v-spacing-bottom>
      <span>Climbing speed:</span>
      <el-select v-model="store.carVelocity" placeholder="请选择" style="width: 150px" @change="onCarVelocityChanged">
        <el-option
            v-for="item in carVelocityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-space>
    <div v-spacing-bottom>
      <el-slider v-model="carVelocity" :max="8000" :step="500" @change="store.onCarVelocityChanged"/>
    </div>
    <div style="display: flex; justify-content: space-between;">
        <div style="display: flex; flex-direction: row;align-items: center; gap: 3px;">
          <span>Fwd:</span>
          <el-icon size="20" :color="echo.rockerDir === 1 ? '#13950a' : '#d23535'">
            <CircleCheckFilled />
          </el-icon>
        </div>
        <div style="display: flex; flex-direction: row;align-items: center; gap: 3px;">
          <span>Retreat:</span>
          <el-icon size="20" :color="echo.rockerDir === 2 ? '#13950a' : '#d23535'">
            <CircleCheckFilled />
          </el-icon>
        </div>
        <div style="display: flex; flex-direction: row;align-items: center; gap: 3px;">
          <span>L:</span>
          <el-icon size="20" :color="echo.rockerDir === 3 ? '#13950a' : '#d23535'">
            <CircleCheckFilled />
          </el-icon>
        </div>
        <div style="display: flex; flex-direction: row;align-items: center; gap: 3px;">
          <span>R:</span>
          <el-icon size="20" :color="echo.rockerDir === 4 ? '#13950a' : '#d23535'">
            <CircleCheckFilled />
          </el-icon>
        </div>
        <div style="display: flex; flex-direction: row;align-items: center; gap: 3px;">
          <span>Stop:</span>
          <el-icon size="20" :color="echo.rockerDir === 0 ? '#13950a' : '#d23535'">
            <CircleCheckFilled />
          </el-icon>
        </div>
    </div>
  </el-card>
</template>

<script setup>
import {ref} from "vue";
import { useStore } from "../../store"
import { useEcho } from "../../store/echo.js";
import {carVelocityOptions} from "./config.js"
import {CircleCheckFilled} from "@element-plus/icons-vue";

const store = useStore()
const echo = useEcho()

let carVelocity = ref()

const onCarVelocityChanged = (val) => {
  carVelocity.value = val
}
</script>

<style scoped>

</style>
