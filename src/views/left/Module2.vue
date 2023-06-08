<template>
  <el-card shadow="hover" :body-style="echo.getCardBodyStyle">
    <el-space v-spacing-bottom>
      <span class="label">
        前吸附：
      </span>
      <el-select v-model="echo.frontPressureSet" placeholder="请选择" @change="store.onFrontPressureSetChanged">
        <el-option
            v-for="item in frontPressureSetOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <span>{{echo.frontMotorSpeed}}&nbsp;rpm</span>
    </el-space>
    <div v-spacing-bottom>
      <el-slider v-model="echo.frontPressureSet" @change="store.onFrontPressureSetChanged" :step="100" :max="1000"/>
    </div>

    <div v-spacing-bottom style="display: flex; justify-content: space-between">
      <div class="label">
        压强：{{echo.frontPressure * 10}}&nbsp;pa
      </div>
      <div>
        <template v-if="echo.adsorbPressureSta === 0">
          <el-icon size="20px"><SuccessFilled color="#13950a"/></el-icon>
        </template>
        <template v-if="echo.adsorbPressureSta == 1 || echo.adsorbPressureSta == 3">
          <el-icon size="20px"><CircleCloseFilled color="#d74d4d"/></el-icon>
        </template>
      </div>
    </div>

    <el-space v-spacing-bottom>
      <span class="label">
        后吸附：
      </span>
      <el-select v-model="echo.backPressureSet" @change="store.onBackPressureSetChanged" placeholder="请选择">
        <el-option
            v-for="item in backPressureSetOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <span v-spacing-left>{{echo.backMotorSpeed}}&nbsp;rpm</span>
    </el-space>

    <div v-spacing-bottom>
      <el-slider v-model="echo.backPressureSet" @change="store.onBackPressureSetChanged" :step="100" :max="1000"/>
    </div>

    <div v-spacing-bottom style="display: flex; justify-content: space-between">
      <span class="label">
        压强：{{echo.backPressure * 10}} &nbsp;pa
      </span>
      <div>
        <template v-if="echo.adsorbPressureSta == 0">
          <el-icon size="20px"><SuccessFilled color="#13950a"/></el-icon>
        </template>
        <template v-if="echo.adsorbPressureSta == 2 || echo.adsorbPressureSta == 3">
          <el-icon size="20px"><CircleCloseFilled color="#d74d4d"/></el-icon>
        </template>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { useStore } from "../../store/index.js";
import { useEcho } from "../../store/echo.js";
import {frontPressureSetOptions,backPressureSetOptions} from "./config.js"
import {SuccessFilled,CircleCloseFilled} from "@element-plus/icons-vue";

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
