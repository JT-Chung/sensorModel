<template>
  <el-card shadow="hover" :body-style="echo.getCardBodyStyle">
    <el-space v-spacing-bottom>
      <span class="label">
        前吸附：
      </span>
      <el-select v-model="store.frontPressureSet" placeholder="请选择">
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
      <el-slider v-model="frontPressureSet" @change="store.frontPressureSet = frontPressureSet" :step="10"/>
    </div>

    <div v-spacing-bottom style="display: flex; justify-content: space-between">
      <div class="label">
        吸力：{{echo.frontPressure}}&nbsp;
      </div>
      <div>
        <template v-if="store.adsorbPressureSta == 0">
          <el-icon size="20px"><SuccessFilled color="#13950a"/></el-icon>
        </template>
        <template v-if="store.adsorbPressureSta == 1 || store.adsorbPressureSta == 3">
          <el-icon size="20px"><CircleCloseFilled color="#d74d4d"/></el-icon>
        </template>
      </div>
    </div>

    <el-space v-spacing-bottom>
      <span class="label">
        后吸附：
      </span>
      <el-select v-model="store.backPressureSet" placeholder="请选择"   >
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
      <el-slider v-model="backPressureSet" @change="store.backPressureSet = backPressureSet" :step="10"/>
    </div>

    <div v-spacing-bottom style="display: flex; justify-content: space-between">
      <span class="label">
        吸力：{{echo.backPressure}} &nbsp;pa
      </span>
      <div>
        <template v-if="store.adsorbPressureSta == 0">
          <el-icon size="20px"><SuccessFilled color="#13950a"/></el-icon>
        </template>
        <template v-if="store.adsorbPressureSta == 2 || store.adsorbPressureSta == 3">
          <el-icon size="20px"><CircleCloseFilled color="#d74d4d"/></el-icon>
        </template>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {ref} from "vue";
import { useStore } from "../../store/index.js";
import { useEcho } from "../../store/echo.js";
import {frontPressureSetOptions,backPressureSetOptions} from "./config.js"
import {SuccessFilled,CircleCloseFilled} from "@element-plus/icons-vue";

const store = useStore()
const echo = useEcho()
let frontPressureSet = ref(store.frontPressureSet)
let backPressureSet = ref(store.backPressureSet)

store.$subscribe((mutation, state) => {
  if (mutation.events.key === 'frontPressureSet') {
    frontPressureSet.value = mutation.events.newValue
  }
  if (mutation.events.key === 'backPressureSet') {
    backPressureSet.value = mutation.events.newValue
  }
})
</script>

<style scoped>
.label {
  white-space: nowrap;
}
.el-select {
  width: 90px;
}
</style>
