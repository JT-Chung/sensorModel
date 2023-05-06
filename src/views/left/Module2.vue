<template>
  <el-card shadow="hover">
    <el-space v-spacing-bottom>
      <span class="label">
        前吸附：
      </span>
      <el-select v-model="preAdsorption.percent" placeholder="请选择">
        <el-option
            v-for="item in preOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <span>11,455rpm</span>
    </el-space>
    <div v-spacing-bottom>
      <el-slider v-model="preAdsorption.slider" />
    </div>

    <div v-spacing-bottom style="display: flex; justify-content: space-between">
      <div class="label">
        吸力：{{preAdsorption.suction}}
      </div>
      <div>
        <el-icon size="20px"><CircleCloseFilled color="#d74d4d"/></el-icon>
      </div>
    </div>

    <el-space v-spacing-bottom>
      <span class="label">
        后吸附：
      </span>
      <el-select v-model="postAdsorption.percent" placeholder="请选择"   >
        <el-option
            v-for="item in postOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <span v-spacing-left>11,455rpm</span>
    </el-space>

    <div v-spacing-bottom>
      <el-slider v-model="postAdsorption.slider" />
    </div>

    <div v-spacing-bottom style="display: flex; justify-content: space-between">
        <span class="label">
          吸力：{{postAdsorption.suction}}
        </span>
      <el-icon size="20px"><SuccessFilled color="#13950a"/></el-icon>
    </div>
  </el-card>
</template>

<script setup>
import {reactive} from "vue";
import {preOptions,postOptions} from "./config.js"
import {SuccessFilled,CircleCloseFilled} from "@element-plus/icons-vue";

let preAdsorption = reactive({
  percent: null,
  slider: 50,
  suction: '1pa'
})
let postAdsorption = reactive({
  percent: null,
  slider: 50,
  suction: '12pa'
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
