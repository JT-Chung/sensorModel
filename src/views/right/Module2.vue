<template>
  <el-card shadow="hover" :body-style="store.getCardBodyStyle">
    <div v-spacing-bottom>Mode：</div>
    <el-space v-spacing-bottom :size="30">
      <div class="radio-group">
        <input type="radio" id="0x00" value="0" name="carRunMode"  v-model.number="echo.carRunMode" @click="store.onCarRunModeChanged">
        <label for="0x00">E-Stop</label>
      </div>
      <div class="radio-group">
        <input type="radio" id="0x01" value="1" name="carRunMode" v-model.number="echo.carRunMode" @click="store.onCarRunModeChanged">
        <label for="0x01">Manual</label>
      </div>
      <div class="radio-group">
        <input type="radio" id="0x06" value="6" name="carRunMode" v-model.number="echo.carRunMode" @click="store.onCarRunModeChanged">
        <label for="0x06">Unlimited</label>
      </div>
    </el-space>
    <div>
      <div class="radio-group">
        <input type="radio" id="0x03" value="3" name="carRunMode" v-model.number="echo.carRunMode" @click="store.onCarRunModeChanged">
        <label for="0x03">Edgewise</label>
      </div>
      <el-space v-spacing-bottom alignment="left">
        <div>
          <span>Edgewise distance(mm)：</span>
          <el-input-number v-model="store.HuggingSideDis" placeholder="请输入距离" :step="echo.accuracy" :min="0" @blur="onBLur"/>
        </div>
      </el-space>
    </div>
    <div>
      <div class="radio-group">
        <input type="radio" id="0x05" value="5" name="carRunMode" v-model.number="echo.carRunMode" @click="store.onCarRunModeChanged">
        <label for="0x05">Zigzag mode</label>
      </div>
      <el-space alignment="left" direction="vertical">
        <el-space>
          <span class="label">Horizontal distance(m):</span>
          <el-input-number style="margin-left: 18px" v-model="store.autoMoveLevelDis" placeholder="请输入" :step="echo.accuracy" :min="0"/>
        </el-space>
        <el-space>
          <span class="label">Vertical Distance(cm):</span>
          <el-input-number style="margin-left: 10px" v-model="store.autoMoveVerticalDis" placeholder="请输入" :step="echo.accuracy" :min="0"/>
        </el-space>
      </el-space>
    </div>
  </el-card>
</template>

<script setup>
import { useStore } from "../../store/index.js";
import { useEcho } from "../../store/echo.js";

const store = useStore()
const echo = useEcho()

const onBLur = (val) => {
  // console.log('val:', val)
}
</script>

<style scoped lang="scss">
.label {
  white-space: nowrap;
}
.el-radio.el-radio--large {
  height: 30px;
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
