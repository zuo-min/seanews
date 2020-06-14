<template>
  <el-container>
    <el-aside :width="isCollapse?'65px':'200px'">
      <el-menu
        background-color="#fff"
        text-color="#000"
        active-text-color="#FF69B4"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/welcome" style="width:200px">
          <i class="el-icon-location"></i>
          <span slot="title">新闻总览页</span>
        </el-menu-item>
        <el-submenu index="/news" :style="{width:isCollapse?'65px':'200px'}">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>新闻管理</span>
          </template>
          <el-menu-item index="/news">新闻列表</el-menu-item>
          <el-menu-item index="/newsadd">新增新闻</el-menu-item>
          <!-- <el-menu-item index="/newsedit">修改新闻</el-menu-item> -->
        </el-submenu>
        <el-menu-item index="/account" :style="{width:isCollapse?'65px':'200px'}">
          <i class="el-icon-user-solid"></i>
          <span slot="title">账户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div id="lt">
          <i
            slot="prefix"
            :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
            style="cursor:pointer"
            @click="isCollapse=!isCollapse"
          ></i>
          <span style="margin-left:10px;color:skyblue;font-weight: bold;">海诺头条新闻网平台</span>
        </div>

        <div id="rt">
          <el-input type="text" placeholder="请输入搜索的文章内容" style="width:300px;margin-right:30px">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-dropdown>
            <span class="el-dropdown-link" v-if="photo == false">
              <img src="./no.jpg" alt width="40" height="40" />
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <span class="el-dropdown-link" v-else>
              <img :src="photo" alt width="40" height="40" />
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$router.push('account')">个人信息</el-dropdown-item>
              <el-dropdown-item @click.native="github()">github地址</el-dropdown-item>
              <!-- el-dropdown-item本身是一个“组件”，
              组件是组多html标签的集合体，这个集合体绑定事件，
              不知道具体给到那个标签使用，因此事件绑定失败-->
              <!-- 使用事件修饰符 -->
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import bus from '@/utils/bus.js'
export default {
  name: 'Home',
  data () {
    return {
      isCollapse: false,
      tmpphoto: ''
    }
  },
  created () {
    bus.$on('upAccountPhoto', ph => {
      ph = ph.replace(/'/g, '')
      // console.log(ph)
      // 更新sessionStorage中photo的信息
      var userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      userInfo.photo = ph
      window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      // 更新临时成员tmpphoto
      this.tmpphoto = ph
    })
  },
  computed: {
    name () {
      return (
        JSON.parse(window.sessionStorage.getItem('userInfo')).name
      )
    },
    photo () {
      return (
        this.tmpphoto ||
        JSON.parse(window.sessionStorage.getItem('userInfo')).photo
      )
    }
  },
  methods: {
    logout () {
      this.$confirm('确定退出系统嘛?', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.clear()
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    github() {
      window.open('https://github.com/')
    }
  }
}
</script>
<style lang='less' scoped>
.el-container {
  height: 100%;
  .el-aside {
    background: url('./111.jpg') no-repeat;
    // background-position: 0,-50px;
    .el-menu {
      opacity: .5;
      font-weight: 800;
      font-size: 20px;
      li {
        margin-top: 20px;
      }
    }
  }
  .el-header {
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 9px;
    min-width: 950px;
    #lt {
      height: 100%;
      width: 40%;
      background-color: white;
      font-size: 20px;
      display: flex;
      align-items: center;
    }
    #rt {
      height: 100%;
      width: 50%;
      background-color: white;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-dropdown-link {
        display: flex;
        align-items: center;
      }
    }
  }
  .el-main {
    background-color: #f2f3f5;
  }
}
</style>
