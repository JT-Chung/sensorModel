<template>
  <el-card shadow="hover">
    <el-space v-spacing-bottom>
      <span class="label">前滚刷：</span>
      <el-switch v-model="rollerBrush.front" />
      <span v-spacing-left>后滚刷：</span>
      <el-switch v-model="rollerBrush.back" />
    </el-space>
    <el-space v-spacing-bottom>
      <span class="label">前清洗液：</span>
      <span>开</span>
      <el-select v-model="cleaningFluid.preOpen" placeholder="请选择">
        <el-option
            v-for="item in cleaningFluidOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <span>关</span>
      <el-select v-model="cleaningFluid.preClose" placeholder="请选择">
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
      <el-select v-model="cleaningFluid.postOpen" placeholder="请选择">
        <el-option
            v-for="item in cleaningFluidOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <span>关</span>
      <el-select v-model="cleaningFluid.postClose" placeholder="请选择">
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
      <el-switch v-model="rollerBrush.sideBrush" />
    </el-space>
  </el-card>
</template>

<script setup>
import {reactive} from "vue";
import {cleaningFluidOptions} from "./config.js"

let rollerBrush = reactive({
  front: null,
  back: null,
  sideBrush: null
})
let cleaningFluid = reactive({
  preOpen: null,
  preClose: null,
  postOpen: null,
  postClose: null,
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
