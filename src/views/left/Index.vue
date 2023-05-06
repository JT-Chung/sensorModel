<template>
  <div class="container">
    <module1 />
    <module2 />
    <module3 />
    <module4 />
  </div>
</template>

<script setup>
import Module1 from "./Module1.vue"
import Module2 from "./Module2.vue"
import Module3 from "./Module3.vue"
import Module4 from "./Module4.vue"

</script>

<style scoped>
.el-card {
  border-radius: 15px;
}
.container {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding-right: 10px;
}
</style>
