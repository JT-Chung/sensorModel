import { createApp } from 'vue'
import "normalize.css"
import App from './App.vue'

const Vue = createApp(App)

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

Vue.mount('#app')
