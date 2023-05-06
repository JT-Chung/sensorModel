<template>
  <el-card shadow="hover">
    <div>运行模式：</div>
    <div v-spacing-bottom>
      <span>
        急停
        <el-checkbox v-model="operatingMode.emergencyStop"  size="large" text-color="#13950a" fill="#13950a">
          <el-icon size="20" style="vertical-align: bottom"><WarningFilled /></el-icon>
        </el-checkbox>
      </span>
      <span v-spacing-left>
          手动
          <el-checkbox v-model="operatingMode.manual"  size="large">
            <el-icon size="20" style="vertical-align: bottom"><WarningFilled /></el-icon>
          </el-checkbox>
      </span>
      <span v-spacing-left>
          强制
          <el-checkbox v-model="operatingMode.mandatory"  size="large">
            <el-icon size="20" style="vertical-align: bottom"><WarningFilled /></el-icon>
          </el-checkbox>
        </span>
    </div>

    <el-checkbox v-model="yanbianModel.yanbian" size="large" style="display: block;line-height: 40px">
      <el-icon size="20" style="vertical-align: bottom"><WarningFilled /></el-icon>
      <span v-spacing-left="8" style="font-size: 16px;color: #303133">延边模式</span>
    </el-checkbox>
    <el-space v-spacing-bottom>
      <span>距离：</span>
      <el-input v-model="yanbianModel.distance" input-style="width: 80px" placeholder="请输入距离"/>
      <span v-spacing-left="50">已清洗：</span>
      <span>{{yanbianModel.cleaned}}</span>
    </el-space>

    <el-checkbox v-model="zhiModel.zhi" size="large" style="display: block; line-height: 40px">
      <el-icon size="20" style="vertical-align: bottom"><WarningFilled /></el-icon>
      <span style="font-size: 16px;color: #303133">“之”字清洗模式</span>
    </el-checkbox>
    <el-space>
      <div>
        <span class="label">横向距离：</span>
        <el-input v-model="zhiModel.horizontal" input-style="width: 65px" placeholder="请输入"/>
      </div>
      <div v-spacing-left="20">
        <span class="label">纵向距离：</span>
        <el-input v-model="zhiModel.portrait" input-style="width: 65px" placeholder="请输入"/>
      </div>
    </el-space>
  </el-card>
</template>

<script setup>
import {reactive} from "vue";
import {WarningFilled} from "@element-plus/icons-vue";

const operatingMode = reactive({
  emergencyStop: null,
  manual: null,
  mandatory: null
})
const yanbianModel = reactive({
  yanbian: null,
  distance: null,
  cleaned: '68%'
})
const zhiModel = reactive({
  zhi: null,
  horizontal: null,
  portrait: null
})
</script>

<style scoped>
.label {
  white-space: nowrap;
}
</style>
