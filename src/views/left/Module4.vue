<template>
  <el-card shadow="hover" class="container">
    <div v-spacing-bottom>
      <span>A winch</span>
      <div style="padding-top: 5px">
        <el-radio-group v-model="store.aWinchCtr">
          <el-radio-button :label="3">&nbsp;&nbsp;Auto   &nbsp;</el-radio-button>
          <el-radio-button :label="0">&nbsp;Stop&nbsp;&nbsp;</el-radio-button>
          <el-radio-button :label="1">&nbsp;Roll in&nbsp;</el-radio-button>
          <el-radio-button :label="2">&nbsp;Roll out&nbsp;</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div v-spacing-bottom>
      <span>Arrange cable</span>
      <div style="padding-top: 5px">
        <el-radio-group v-model="store.aWinchNeatenCtr">
          <el-radio-button :label="3">&nbsp;Auto   &nbsp;</el-radio-button>
          <el-radio-button :label="0">&nbsp;Stop&nbsp;</el-radio-button>
          <el-radio-button :label="1">&nbsp;Left&nbsp;</el-radio-button>
          <el-radio-button :label="2">&nbsp;Right&nbsp;</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
      <span>B winch</span>
      <div style="padding-top: 5px">
        <el-radio-group v-model="store.bWinchCtr">
          <el-radio-button :label="3">&nbsp;Auto   &nbsp;</el-radio-button>
          <el-radio-button :label="0">&nbsp;Stop&nbsp;</el-radio-button>
          <el-radio-button :label="1">&nbsp;Roll in&nbsp;</el-radio-button>
          <el-radio-button :label="2">&nbsp;Roll out&nbsp;</el-radio-button>
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
