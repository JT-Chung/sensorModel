<template>
  <el-container >
    <el-aside width="29%" class="aside-left">
      <left />
    </el-aside>
    <el-main width="41%">
      <content />
    </el-main>
    <el-aside width="30%" class="aside-right">
      <right />
    </el-aside>
  </el-container>
</template>

<script setup>
import Left from "./left/Index.vue"
import Right from "./right/Index.vue"
import Content from "./content/Index.vue"
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  width: 100%;
  padding: 9px;
}
.el-main {
  padding: 0;
  //&::after {
  //  display: block;
  //  content: '';
  //  width: 2px;
  //  height: 100%;
  //  margin: 0 auto;
  //  border-left: 2px solid #888;
  //  position: absolute;
  //  left: 0;
  //  top: 12px;
  //}
  //&::before {
  //  display: block;
  //  content: '';
  //  width: 2px;
  //  height: 100%;
  //  margin: 0 auto;
  //  border-right: 2px solid #888;
  //  position: absolute;
  //  right: 0;
  //  top: 12px;
  //}
}
</style>
