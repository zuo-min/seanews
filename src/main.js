import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 导入全局的css样式
import '@/assets/css/global.css'
// 引入组件库模块
import ElementUI from 'element-ui'
// 注册
Vue.use(ElementUI)
// 配置后端服务器接口公共根地址
// axios.defaults.baseURL = 'http://192.168.2.217:8888/'  
axios.defaults.baseURL = 'http://localhost:8888/'  
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'  
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
