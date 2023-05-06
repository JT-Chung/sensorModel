<template>
  <div>
    <el-button type="danger" style="margin: 5px 0 5px 5px">视频监控</el-button>
    <el-card shadow="hover">
      <el-space v-spacing-bottom>
        <span>算法</span>
        <el-switch v-model="isAlgorithm" />
        <span v-spacing-left>RGB相机</span>
        <el-switch v-model="isRGBCamera" />
      </el-space>
      <el-space size="default">
        <el-checkbox v-model="verticalMode.vertical" size="large" >
          <el-icon size="20" style="vertical-align: bottom"><WarningFilled /></el-icon>
          <span v-spacing-left="8" style="font-size: 16px;color: #303133">垂直模式</span>
        </el-checkbox>
        <el-checkbox v-model="verticalMode.nonVertical" size="large" >
          <el-icon size="20" style="vertical-align: bottom"><WarningFilled /></el-icon>
          <span v-spacing-left="8" style="font-size: 16px;color: #303133">非垂直模式</span>
        </el-checkbox>
        <el-checkbox v-model="verticalMode.calibration" size="large" >
          <el-icon size="20" style="vertical-align: bottom"><WarningFilled /></el-icon>
          <span v-spacing-left="8" style="font-size: 16px;color: #303133">角度校准</span>
        </el-checkbox>
      </el-space>
<!--      <el-descriptions>-->
<!--        <el-descriptions-item>-->
<!--          <template #label>-->
<!--            <el-checkbox v-model="verticalMode.vertical" size="large" >-->
<!--              <el-icon size="20" style="vertical-align: bottom"><WarningFilled /></el-icon>-->
<!--              <span v-spacing-left="8" style="font-size: 16px;color: #303133">垂直模式</span>-->
<!--            </el-checkbox>-->
<!--          </template>-->
<!--        </el-descriptions-item>-->
<!--        <el-descriptions-item>-->
<!--          <template #label>-->
<!--            <el-checkbox v-model="verticalMode.nonVertical" size="large" >-->
<!--              <el-icon size="20" style="vertical-align: bottom"><WarningFilled /></el-icon>-->
<!--              <span v-spacing-left="8" style="font-size: 16px;color: #303133">非垂直模式</span>-->
<!--            </el-checkbox>-->
<!--          </template>-->
<!--        </el-descriptions-item>-->
<!--        <el-descriptions-item>-->
<!--          <template #label>-->
<!--            <el-checkbox v-model="verticalMode.calibration" size="large" >-->
<!--              <el-icon size="20" style="vertical-align: bottom"><WarningFilled /></el-icon>-->
<!--              <span v-spacing-left="8" style="font-size: 16px;color: #303133">角度校准</span>-->
<!--            </el-checkbox>-->
<!--          </template>-->
<!--        </el-descriptions-item>-->
<!--      </el-descriptions>-->
    </el-card>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {WarningFilled} from "@element-plus/icons-vue";

let isAlgorithm = ref()
let isRGBCamera = ref()
const verticalMode = reactive({
  vertical: null,
  nonVertical: null,
  calibration: null
})
</script>

<style scoped>

</style>
