<template>
  <div class='login-container'>
    <div class='login-box'>
      <el-form ref='loginFormRef' :model='loginForm' :rules='rules'>
        <span class='title'>海 诺 头 条 新 闻 网 平 台</span>
        <img src='./op.png' alt />
        <el-form-item prop='zhanghao'>
          <el-input v-model='loginForm.zhanghao' placeholder='请输入账号'>
            <i slot='prefix' class='iconfont icon-zhanghao'></i>
          </el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input v-model='loginForm.password' type='password' placeholder='请输入密码' @keyup.native.enter="login()">
            <i slot='prefix' class='iconfont icon-mima'></i>
          </el-input>
        </el-form-item>
        <el-form-item prop='xieyi'>
          <el-checkbox v-model='loginForm.xieyi'></el-checkbox>
          <span style='margin-left:20px; font-size:15px;color:blue'>我已阅读并同意用户协议和隐私条款</span>
        </el-form-item>
        <el-form-item>
          <el-button style='width:100%' type='primary' @click='login()'>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入阿里小图标
import '@/assets/iconfont/iconfont.css'
import '@/assets/js/gt.js'
export default {
  name: 'Login',
  data () {
    // 设置自定义校验函数
    var xieyiTest = function (rule, value, callback) {
      value ? callback() : callback(new Error('请遵守协议'))
    }
    return {
      loginForm: {
        zhanghao: '',
        password: '',
        xieyi: false
      },
      ctaObj: null,
      rules: {
        zhanghao: [
          { required: true, message: '账号必填' },
          { pattern: /^[0-9]{1,10}$/, message: '请输入10位以下的数字' }
        ],
        password: [{ required: true, message: '密码必填' }],
        xieyi: [{ validator: xieyiTest }]
      }
    }
  },
  methods: {
    login () {
      // 进行登录时的表单验证
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          if (this.ctaObj !== null) {
            return this.ctaObj.verify()
          }
          // 获取极验秘钥信息
          var pro = this.$http.get('/gt/register-click')
          pro
          .then(res => {
            let data = res.data
            window.initGeetest({
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success,
              new_captcha: true,
              product: 'bind'
            }, captchaObj => {
              captchaObj.onReady(() => {
                this.ctaObj = captchaObj
                captchaObj.verify()
              }).onSuccess(() => {
                this.loginAct()
              }).onError(() => {})
            })
          })
          .catch(err => {
            return this.$message.error('出错了')
          })
        }
      })
    },
    // 登录检验账号真实性，登录后台首页
    loginAct () {
      // 检验账号密码的真实性
          var pro = this.$http.post('/api/login', this.loginForm)
          pro
            .then(res => {
            // console.log(res)
              if (res.data.status === 0) {
                // 客户端记录用户的信息
                window.sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
                // this.$router.push('/home')
                this.$router.push({ name: 'home' })
              } else {
                this.$message.error(res.data.message)
                this.loginForm.zhanghao = ''
                this.loginForm.password = ''
              }
            })
            .catch(err => {
              return this.$message.error(err)
            })
            // this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
  height: 100%;
  background-image: url("./beijing.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    width: 400px;
    height: 380px;
    border-radius: 30px;
    opacity: 0.8;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    img {
      width: 40%;
      // opacity: .9
      margin: 10px auto;
    }
    .title {
      display: block;
      font-size: 24px;
      color: skyblue;
      font-weight: bold;
    }
    .el-form {
      width: 75%;
    }
  }
}
</style>
