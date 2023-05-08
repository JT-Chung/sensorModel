<template>
  <el-card shadow="hover">
    <el-checkbox v-model="jumpOverObstacles.obstacles" size="large" style="display:block;line-height: 40px">
      <el-icon size="20" style="vertical-align: bottom"><WarningFilled /></el-icon>
      <span v-spacing-left="8" style="font-size: 16px;color: #303133">越障</span>
    </el-checkbox>
    <el-space v-spacing-bottom>
      <div>
        <span class="label">前模组长度：</span>
        <el-input v-model="jumpOverObstacles.frontLength" input-style="width: 50px" placeholder="请输入"/>
      </div>
      <div v-spacing-left="18">
        <span class="label">后模组长度：</span>
        <el-input v-model="jumpOverObstacles.rearLength" input-style="width: 50px" placeholder="请输入"/>
      </div>
    </el-space>
    <div v-spacing-bottom="5">前模组升/降：</div>
    <div v-spacing-bottom>
      <el-radio-group v-model="moduleLifting.front">
        <el-radio-button label="停" />
        <el-radio-button label="升" />
        <el-radio-button label="降" />
      </el-radio-group>
    </div>
    <div v-spacing-bottom="5">后模组升/降：</div>
    <div v-spacing-bottom>
      <el-radio-group v-model="moduleLifting.rear">
        <el-radio-button label="停" />
        <el-radio-button label="升" />
        <el-radio-button label="降" />
      </el-radio-group>
    </div>
    <el-space>
      <span>升/降限位：</span>
      <span>
          前
          <el-checkbox v-model="LiftingLimit.front"  size="large" text-color="#13950a" fill="#13950a">
            <el-icon size="20" style="vertical-align: bottom"><SuccessFilled /></el-icon>
          </el-checkbox>
      </span>
      <span>
          后
          <el-checkbox v-model="LiftingLimit.rear"  size="large" text-color="#13950a" fill="#13950a">
            <el-icon size="20" style="vertical-align: bottom"><SuccessFilled /></el-icon>
          </el-checkbox>
        </span>
    </el-space>
  </el-card>
</template>

<script setup>
import {reactive} from "vue";
import {SuccessFilled,WarningFilled} from "@element-plus/icons-vue";

const jumpOverObstacles = reactive({
  obstacles: null,
  frontLength: null,
  rearLength: null
})
const moduleLifting = reactive({
  front: '停',
  rear: '停',
})
const LiftingLimit = reactive({
  front: null,
  rear: null
})
</script>

<style scoped>
.label {
  white-space: nowrap;
}
</style>
