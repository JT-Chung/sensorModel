<template>
  <el-card shadow="hover" :body-style="store.getCardBodyStyle">
    <el-space v-spacing-bottom>
      <span>爬行速度：</span>
      <el-select v-model="store.carVelocity" placeholder="请选择" style="width: 150px">
        <el-option
            v-for="item in carVelocityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-space>
    <div v-spacing-bottom>
      <el-slider v-model="store.carVelocity" :max="8" :step="0.5"/>
    </div>
    <div>
      <el-radio-group v-model="store.rockerDir" >
        <el-radio-button label="前">&nbsp;前&nbsp;</el-radio-button>
        <el-radio-button label="后">&nbsp;后&nbsp;</el-radio-button>
        <el-radio-button label="左">&nbsp;左&nbsp;</el-radio-button>
        <el-radio-button label="右">&nbsp;右&nbsp;</el-radio-button>
        <el-radio-button label="停">&nbsp;停&nbsp;</el-radio-button>
      </el-radio-group>
    </div>
  </el-card>
</template>

<script setup>
import { useStore } from "../../store"
import {carVelocityOptions} from "./config.js"

const store = useStore()
store.$subscribe((mutation, state) => {
  console.log('mutation changed:',mutation)
  console.log('state changed:', state)
})
</script>

<style scoped>

</style>
