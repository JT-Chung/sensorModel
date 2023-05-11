(function () {
    if (typeof EventTarget !== "undefined") {
        let func = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (type, fn, capture) {
            this.func = func;
            if (typeof capture !== "boolean") {
                capture = capture || {};
                capture.passive = false;
            }
            this.func(type, fn, capture);
        };
    }
}());

console.log('全屏高度：', window.screen.height)
console.log('可用高度：', window.screen.availHeight)

import { createApp, onMounted } from 'vue'
import "normalize.css"
// import "./libs/index.js"
import { createPinia } from "pinia";
import App from './App.vue'

const pinia = createPinia()
const Vue = createApp(App)

/* 定义全局样式指令 */
Vue.directive('spacing-left', {
    mounted(el,binding) {
        const style = {
            paddingLeft: binding.value ? binding.value + 'px' : '10px'
        }
        Object.assign(el.style, style)
    }
})
Vue.directive('spacing-bottom', {
    mounted(el,binding) {
        const style = {
            paddingBottom: binding.value ? binding.value + 'px' : '4px'
        }
        Object.assign(el.style, style)
    }
})

Vue.use(pinia).mount('#app')
