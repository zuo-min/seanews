import Vue from 'vue'
import router from '@/router'
// 引入axios
import axios from 'axios'
// 配置后端服务器接口公共根地址
// axios.defaults.baseURL = 'http://192.168.2.217:8888/'
axios.defaults.baseURL = 'http://localhost:8888/'
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 配置请求拦截器
axios.interceptors.request.use(function (config) {
  // userinfo并不是始终存在的，要做判断使用
  var userinfo = window.sessionStorage.getItem('userinfo')

  if (userinfo) {
    var token = JSON.parse(userinfo).token
    // 给axios请求头配置token
    config.headers.Authorization = 'Bearer ' + token
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

// axios配置响应拦截器
axios.interceptors.response.use(function (response) {
  // response：服务器端返回的数据信息，与 then(result=>{}) 的result一致
  return response
}, function (error) {
  // 判断响应状态码如果登录401，就强制登录
  // error对象
  // error.response.status======401
  // console.dir(error)
  if (error.response.status === 401) {
    // 强制登录
    router.push({ name: 'login' })
  }
  return Promise.reject(error)
})

Vue.prototype.$http = axios
