<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>
    <div class="text item cardbody">
      <div class="pic" v-if="accountForm.photo === null">
        <img src="./no.jpg" alt />
      </div>
      <div class="pic" v-else>
        <img :src="accountForm.photo" alt />
      </div>
      <div class="form">
        <el-form ref="accountFormRef" :model="accountForm" label-width="100px">
          <el-form-item label="账号:">
            <el-input v-model="name" disabled></el-input>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input v-model="accountForm.password" type="password" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份:">
            <el-input v-model="accountForm.identity" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="isDia=true">修改密码</el-button>
            <el-button @click="isPic=true">修改头像</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="密码修改" :visible.sync="isDia" top="300px" width="500px" @close="closeDig()">
      <el-form ref="passwordRef" :model="passwordForm" :rules="rules">
        <el-form-item label="旧密码:" prop="oldPwd">
          <el-input v-model="passwordForm.oldPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newPwd">
          <el-input v-model="passwordForm.newPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="surePwd">
          <el-input v-model="passwordForm.surePwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="editPwd()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="头像修改" :visible.sync="isPic" top="300px" width="300px">
      <el-upload 
      action="$http.defaults.baseURL + '/public/user_photo'" 
      :show-file-list="false" 
      :on-success="afterUpload"
      class="avatar-uploader"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      accountForm: {
        Id: "",
        password: "",
        identity: "",
        photo: ""
      },
      isDia: false,
      isPic: false,
      passwordForm: {
        oldPwd: "",
        newPwd: "",
        surePwd: ""
      },
      rules: {
        oldPwd: [{ required: true, message: "请输入旧密码" }],
        newPwd: [{ required: true, message: "请输入新密码" }],
        surePwd: [{ required: true, message: "请再次输入新密码" }]
      }
    };
  },
  created() {
    this.getAccount();
  },
  computed: {
    name() {
      return JSON.parse(window.sessionStorage.getItem("userInfo")).name;
    }
  },
  methods: {
    closeDig() {
      this.passwordForm.oldPwd = "";
      this.passwordForm.newPwd = "";
      this.passwordForm.surePwd = "";
    },
    getAccount() {
      var pro = this.$http.get("/api/account/", {
        params: { zhanghao: this.name }
      });
      pro
        .then(res => {
          if (res.data.status === 0) {
            // console.log(res.data.data)
            this.accountForm = res.data.data[0];
          }
        })
        .catch(err => {
          return this.$message.error("获取个人信息出错!" + err);
        });
    },
    editPwd() {
      var pro = this.$http.post("/api/pwdedit/", this.passwordForm, {
        params: { id: this.accountForm.Id }
      });
      pro
        .then(res => {
          if (res.data.status === 0) {
            if (res.data.oldPwd !== this.accountForm.password) {
              this.$message.error("原密码输入错误!");
              this.isDia = false;
            } else if (res.data.newPwd === res.data.oldPwd) {
              this.$message.error("新密码不能与原密码相同！");
            } else if (res.data.newPwd !== res.data.surePwd) {
              this.$message.error("两次密码不一致！");
            } else {
              this.$message.success("密码修改成功!");
              this.isDia = false;
            }
          }
        })
        .catch(err => {
          return this.$message.error("修改密码失败" + err);
        });
    },
    afterUpload () {
      
    }
  }
};
</script>

<style lang="less" scoped>
.pic {
  width: 100%;
  // background-color: black;
  height: 200px;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  img {
    height: 200px;
    width: 200px;
    border: 1px solid black;
  }
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  margin-left: 40px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed black;
  border-radius: 6px;
}
</style>
