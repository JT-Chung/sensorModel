<template>
  <el-card shadow="hover" class="container">
    <div v-spacing-bottom>
      <span>A卷扬机</span>
      <div style="padding-top: 5px">
        <el-radio-group v-model="hoist.A">
          <el-radio-button label="自动" />
          <el-radio-button label="停" />
          <el-radio-button label="收" />
          <el-radio-button label="放" />
        </el-radio-group>
      </div>
    </div>
    <div v-spacing-bottom>
      <span>理线</span>
      <div style="padding-top: 5px">
        <el-radio-group v-model="hoist.cableManagement">
          <el-radio-button label="自动" />
          <el-radio-button label="停" />
          <el-radio-button label="向左" />
          <el-radio-button label="向右" />
        </el-radio-group>
      </div>
    </div>
    <div>
      <span>B卷扬机</span>
      <div style="padding-top: 5px">
        <el-radio-group v-model="hoist.B">
          <el-radio-button label="自动" />
          <el-radio-button label="停" />
          <el-radio-button label="收" />
          <el-radio-button label="放" />
        </el-radio-group>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {reactive} from "vue";

let hoist = reactive({
  A: '自动',
  B: '自动',
  cableManagement: '自动'
})
</script>

<style scoped>
</style>
