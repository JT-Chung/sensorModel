<template>
  <el-card shadow="hover" :body-style="echo.calcCardPadding">
    <div class="radio-group">
      <input type="radio" id="0x04" value="4" name="carRunMode" v-model.number="echo.carRunMode" @click="store.onCarRunModeChanged">
      <label for="0x04"><b>Crossing</b></label>
    </div>
    <el-space v-spacing-bottom alignment="left">
      <div>
        <div class="label" v-spacing-bottom>F-module len(mm)：</div>
        <el-input-number v-model="store.crossAbstacleDis1" placeholder="请输入前模组长度" :step="echo.accuracy" :min="0"/>
      </div>
      <div>
        <div class="label" v-spacing-bottom>R-module len(mm)：</div>
        <el-input-number v-model="store.crossAbstacleDis2" placeholder="请输入后模组长度" :step="echo.accuracy" :min="0"/>
      </div>
    </el-space>
    <div v-spacing-bottom="5"> Front lift /lower：</div>
    <div v-spacing-bottom>
      <el-radio-group v-model="store.frontLifterCmd">
        <el-radio-button :label="0">&nbsp;&nbsp;&nbsp;&nbsp;Stop&nbsp;&nbsp;&nbsp;&nbsp;</el-radio-button>
        <el-radio-button :label="1">&nbsp;&nbsp;&nbsp;&nbsp;Up&nbsp;&nbsp;&nbsp;&nbsp;</el-radio-button>
        <el-radio-button :label="2">&nbsp;&nbsp;&nbsp;&nbsp;Down&nbsp;&nbsp;&nbsp;&nbsp;</el-radio-button>
      </el-radio-group>
    </div>
    <div v-spacing-bottom="5">Rear lift /lower：</div>
    <div v-spacing-bottom>
      <el-radio-group v-model="store.backLifterCmd">
        <el-radio-button :label="0">&nbsp;&nbsp;&nbsp;&nbsp;Stop&nbsp;&nbsp;&nbsp;&nbsp;</el-radio-button>
        <el-radio-button :label="1">&nbsp;&nbsp;&nbsp;&nbsp;Up&nbsp;&nbsp;&nbsp;&nbsp;</el-radio-button>
        <el-radio-button :label="2">&nbsp;&nbsp;&nbsp;&nbsp;Down&nbsp;&nbsp;&nbsp;&nbsp;</el-radio-button>
      </el-radio-group>
    </div>
    <el-space>
      <span>lifting limit：</span>
      <span>
          Front
          <el-icon size="20" style="vertical-align: bottom;padding-left: 5px" :color="echo.frontDownlimitSta === 0 ? '#13950a' : '#d23535'">
            <CircleCheckFilled />
          </el-icon>
      </span>
      <span>
          Rear
          <el-icon size="20" style="vertical-align: bottom;padding-left: 5px" :color="echo.backDownlimitSta === 0 ? '#13950a' : '#d23535'">
            <CircleCheckFilled />
          </el-icon>
        </span>
    </el-space>
  </el-card>
</template>

<script setup>
import { useStore } from "../../store/index.js";
import { useEcho } from "../../store/echo.js";
import {CircleCheckFilled} from "@element-plus/icons-vue";

const store = useStore()
const echo = useEcho()
</script>

<style scoped lang="scss">
.label {
  white-space: nowrap;
}
.radio-group {
  position: relative;
  line-height: 30px;
input[type="radio"] {
  height: 22px;
  width: 22px;
  margin-right: 10px;
  display: none;
}
input[type="radio"] + label::before {
  content: "\a0"; /*不换行空格*/
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  width: 18px;
  height: 18px;
  margin-right: 10px;
  border-radius: 50%;
  border: 1px solid #003c66;
  background: #fff;
  line-height: 22px;
  box-sizing: border-box;
}
input[type="radio"]:checked + label::before {
  background-color: #d23535;
  background-clip: content-box;
  padding: 3px;
}
input:checked+label::after {
  position: absolute;
  content: '';
  width: 4px;
  height: 4px;
  top: 12px;
  left: 6px;
  border: 2px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
}
}
</style>
