<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <div class="text item">
        <el-form ref="addFormRef" :model="addForm" label-width="120px" :rules="rules">
          <el-form-item label="标题:" prop="title">
            <el-input v-model="addForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容:" prop="news">
            <quill-editor v-model="addForm.news"></quill-editor>
            <!-- <el-input v-model='addForm.news'></el-input> -->
          </el-form-item>
          <el-form-item label="时间:" prop="pubdate">
            <el-input v-model="addForm.pubdate" placeholder="时间格式如20200511" class="time"></el-input>
          </el-form-item>
          <el-form-item label="图片:">
            <el-radio-group v-model="addForm.image">
              <el-radio :label="1" @click.native="isTrue=true">有图</el-radio>
              <el-radio :label="0" @click.native="isTrue=false">无图</el-radio>
            </el-radio-group>
            <el-upload
              action
              :http-request="httpRequest"
              :show-file-list="false"
              class="avatar-uploader"
            >
              <ul v-show="isTrue">
                <li class="uploadbox">
                  <span>点击图标选择图片</span>
                  <img v-if="addForm.photo" :src="addForm.photo" alt />
                  <div v-else class="el-icon-picture-outline"></div>
                </li>
              </ul>
            </el-upload>
          </el-form-item>
          <el-form-item label="新闻类型:" prop="type">
            <el-select v-model="addForm.type" placeholder="请选择" clearable>
              <el-option
                v-for="item in typeList"
                :key="item.Id"
                :label="item.types"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addNews()">发布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 通过es6按需导入方式 导入需要的组件模块
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'NewsAdd',
  components: {
    quillEditor
  },
  data () {
    return {
      isTrue: false,
      typeList: [], // 接收类型列表数据
      addForm: {
        photo: '',
        title: '', // 文章标题
        news: '', // 文章内容
        image: '',
        type: '', // 类型
        pubdate: '' // 时间
      },
      rules: {
        title: [
          { required: true, message: '文章标题必填' },
          { min: 5, max: 30, message: '文章标题长度介于5-30个字符' }
        ],
        news: [{ required: true, message: '新闻内容必填' }],
        type: [{ required: true, message: '新闻类型必选' }],
        pubdate: [{ required: true, message: '发布时间必填' }]
      }
    }
  },
  created () {
    this.getNewsType()
  },
  methods: {
    getNewsType () {
      var pro = this.$http.get('/api/newstype')
      pro
        .then(res => {
          // console.log(res)
          if (res.data.status === 0) {
            this.typeList = res.data.data
          }
        })
        .catch(err => {
          return this.$message.error('获取新闻列表失败!' + err)
        })
    },
    addNews () {
      // 表单校验
      this.$refs.addFormRef.validate(valid => {
        if (valid) {
          // 把被添加的文章信息通过axios传递给服务器端存储
          // this.$http.post(地址,post数据,get请求字符串信息)
          var pro = this.$http.post('/api/newsadd', this.addForm)
          pro
            .then(res => {
              if (res.data.status === 0) {
                this.$message.success('新闻发布成功')
                this.$router.push({ name: 'news' })
              }
            })
            .catch(err => {
              return this.$message.error('发布新闻失败' + err)
            })
        }
      })
    },
    httpRequest (resource) {
      // 1. FormData表单数据对象收集表单信息，即上传附件信息
      var fd = new FormData()
      // 把图片的信息添加给fd对象
      // fd.append(名称，值)
      fd.append('file', resource.file) // 文件已经被fd保存好了

      // 2. axios带着附件到达服务器端存储
      var pro = this.$http.post('/api/newsadd_imgname', fd)
      pro
        .then(res => {
          if (res.data.status === 0) {
            this.addForm.photo = res.data.photo
          }
        })
        .catch(err => {
          return this.$message.error('图片上传失败：' + err)
        })
    }
  }
}
</script>
<style lang='less' scoped>
.time {
  width: 217px;
}
/*给富文本编辑器设置内容区域高度*/
/* .ql-editor{   .ql-editor[data-v-xxx]不对了*/
/*deep：深度作用选择器，使得编译后的效果为：.el-form[data-v-xx] .ql-editor{}*/
.el-form /deep/ .ql-editor {
  height: 200px;
}
.uploadbox {
  list-style: none;
  width: 200px;
  height: 200px;
  margin: 10px;
  float: left;
  cursor: pointer;
  border: 1px solid #eee;
  span {
    width: 200px;
    height: 50px;
    font-weight: bold;
    line-height: 50px;
    display: block;
    text-align: center;
  }
  div {
    width: 200px;
    height: 150px;
    font-size: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  img {
    width: 200px;
    height: 150px;
  }
}
</style>
