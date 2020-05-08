<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="loginFormRef" :model="loginForm">
        <img src="./op.png" alt />
        <el-form-item>
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.code" placeholder="请输入校验码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.xieyi"></el-checkbox>
          <span style="margin-left:10px;">我已阅读并同意用户协议和隐私条款</span>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%;" type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        mobile: "",
        code: "",
        xieyi: false
      }
    };
  },
  methods: {
    login() {
      this.$router.push({name:'home'})
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-image: url("./beijing.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    width: 400px;
    height: 300px;
    border-radius: 30px;
    opacity: 0.8;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    img {
      width: 40%;
      // opacity: .9;
      margin: 0 auto;
      margin-top: 15px;
    }
    .el-form {
      width: 75%;
    }
  }
}
</style> 
