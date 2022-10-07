import {createApp} from 'vue'
// import './style.css'
import App from './App.vue'
import router from "./router";
import {createPinia} from 'pinia'
import {usePermissStore} from './stores/permiss'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'


const app = createApp(App);
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 自定义权限指令
const permiss = usePermissStore()
app.directive('permiss', {
    mounted(el, binding) {
        if(!permiss.key.includes(String(binding.value))){
            el['hidden'] = true;
        }
    }
})


app.mount("#app");

// createApp(App).mount('#app')
