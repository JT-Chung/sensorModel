<template>
  <el-card shadow="hover">
    <div v-spacing-bottom>通讯状态：</div>
    <el-space size="large">
      <span>
        前模组
<!--        <el-checkbox v-model="communicationStatus.frontModule"  size="large" text-color="#13950a" fill="#13950a">-->
<!--          <el-icon size="20" style="vertical-align: bottom"><CircleCheckFilled /></el-icon>-->
<!--        </el-checkbox>-->
        <el-icon size="20" class="icon-style"><SuccessFilled /></el-icon>
      </span>
      <span>
          后模组
<!--          <el-checkbox v-model="communicationStatus.rearModule"  size="large">-->
<!--            <el-icon size="20" style="vertical-align: bottom"><CircleCheckFilled /></el-icon>-->
<!--          </el-checkbox>-->
      </span>
      <el-icon size="20" class="icon-style"><SuccessFilled /></el-icon>
      <span>
          算法CPU
<!--          <el-checkbox v-model="communicationStatus.CPU"  size="large">-->
<!--            <el-icon size="20" style="vertical-align: bottom"><CircleCheckFilled /></el-icon>-->
<!--          </el-checkbox>-->
      </span>
      <el-icon size="20" class="icon-style"><SuccessFilled /></el-icon>
    </el-space>
  </el-card>
</template>

<script setup>
import {reactive,ref} from "vue";
import {CircleCheckFilled,SuccessFilled} from "@element-plus/icons-vue";

// const communicationStatus = reactive({
//   frontModule: null,
//   rearModule: null,
//   CPU: null
// })
</script>

<style scoped>
.icon-style {
  vertical-align: bottom;
  color: #13950a;
}
</style>
