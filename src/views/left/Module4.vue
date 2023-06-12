<template>
  <el-card shadow="hover" class="container">
    <div v-spacing-bottom>
      <span>A卷扬机</span>
      <div style="padding-top: 5px">
        <el-radio-group v-model="store.aWinchCtr">
          <el-radio-button :label="3">&nbsp;&nbsp;自动&nbsp;</el-radio-button>
          <el-radio-button :label="0">&nbsp;停&nbsp;&nbsp;</el-radio-button>
          <el-radio-button :label="1">&nbsp;收&nbsp;</el-radio-button>
          <el-radio-button :label="2">&nbsp;放&nbsp;</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div v-spacing-bottom>
      <span>理线</span>
      <div style="padding-top: 5px">
        <el-radio-group v-model="store.aWinchNeatenCtr">
          <el-radio-button :label="3">&nbsp;自动&nbsp;</el-radio-button>
          <el-radio-button :label="0">&nbsp;停&nbsp;</el-radio-button>
          <el-radio-button :label="1">&nbsp;向左&nbsp;</el-radio-button>
          <el-radio-button :label="2">&nbsp;向右&nbsp;</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
      <span>B卷扬机</span>
      <div style="padding-top: 5px">
        <el-radio-group v-model="store.bWinchCtr">
          <el-radio-button :label="3">&nbsp;自动&nbsp;</el-radio-button>
          <el-radio-button :label="0">&nbsp;停&nbsp;</el-radio-button>
          <el-radio-button :label="1">&nbsp;收&nbsp;</el-radio-button>
          <el-radio-button :label="2">&nbsp;放&nbsp;</el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { useStore } from "../../store/index.js";
import { useEcho } from "../../store/echo.js";

const store = useStore()
const echo = useEcho()
</script>

<style scoped>
</style>
