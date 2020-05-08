import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局的css样式
import '@/assets/css/global.css'
// 引入组件库模块
import ElementUI from 'element-ui'
// 注册
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
