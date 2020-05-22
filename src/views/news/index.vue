<template>
  <div>
    <!--搜索卡片区-->
    <el-card class="search-card">
      <!--命名插槽，头部内容-->
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!--匿名插槽，内容主体-->
      <div class="text item">
        <!--el-form搜索表单区域-->
        <el-form ref="searchFormRef" :model="searchForm" label-width="100px">
          <el-form-item label="新闻状态:">
            <el-radio-group v-model="searchForm.status">
              <el-radio>全部</el-radio>
              <el-radio label="0">待审核</el-radio>
              <el-radio label="1">审核通过</el-radio>
              <el-radio label="2">审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="新闻类型:">
            <el-select v-model="searchForm.type" placeholder="请选择" clearable>
              <el-option
                v-for="item in typeList"
                :key="item.Id"
                :label="item.types"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间选择:">
            <el-date-picker
              v-model="timetotime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{tot}}条符合条件的内容</span>
      </div>
      <div class="text item">
        <el-table :data="newsList" style="width:100%">
          <el-table-column label="图标" width="200">
            <!--图标效果：html标签+数据部分(作用域插槽提供数据)-->
            <img :src="stData.row.image" slot-scope="stData" alt="没有图标" width="150" height="100" />
          </el-table-column>
          <el-table-column label="类型" width="100" prop="type">
            <!--通过template统一设置接收作用域插槽数据-->
            <template slot-scope="stData">
              <el-tag v-if="stData.row.type==='1'">要闻</el-tag>
              <el-tag v-else-if="stData.row.type==='2'">抗肺炎</el-tag>
              <el-tag v-else-if="stData.row.type==='3'">娱乐</el-tag>
              <el-tag v-else-if="stData.row.type==='4'">体育</el-tag>
              <el-tag v-else-if="stData.row.type==='5'">美食</el-tag>
              <el-tag v-else-if="stData.row.type==='6'">动漫</el-tag>
              <el-tag v-else-if="stData.row.type==='7'">游戏</el-tag>
              <el-tag v-else-if="stData.row.type==='8'">历史</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="标题" prop="title" width="500"></el-table-column>
          <el-table-column label="状态" prop="status" width="150">
            <!--通过template统一设置接收作用域插槽数据-->
            <template slot-scope="stData">
              <el-tag v-if="stData.row.status==='0'" type="warning">待审核</el-tag>
              <el-tag v-else-if="stData.row.status==='1'" type="success">审核通过</el-tag>
              <el-tag v-else-if="stData.row.status==='2'" type="info">审核失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="发布时间" prop="pubdate"></el-table-column>
          <el-table-column label="操作">
            <!--内容区域设置当前列显示的信息-->
            <template slot-scope="stData">
              <el-button
                type="primary"
                size="mini"
                @click="$router.push(`/newsedit/${stData.row.Id}`)"
              >修改</el-button>
              <el-button
                type="danger"
                size="mini"
                style="margin-left:0px"
                @click="del(stData.row.Id)"
              >删除</el-button>
            </template>
          </el-table-column>
          <el-table-column label="审批" v-if="identity === '新闻编辑审查者'">
            <template slot-scope="stData">
              <el-button
              size="mini"
              type="success"
              v-if="stData.row.status ==='0'"
              @click="shenhe(stData.row.Id, 0)"
              >通过</el-button>
              <el-button
              size="mini"
              type="warning"
              v-if="stData.row.status ==='0'"
              style="margin-left:0px"
              @click="shenhe(stData.row.Id, 1)"
              >未通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="text item">
        <!--分页
          @size-change='handleSizeChange' // 每页显示条数变化的回调事件处理，需要methods声明方法
          @current-change='handleCurrentChange' //  当前页码变化的回调事件处理，需要methods声明方法
          :current-page='currentPage4' // 默认当前页码
          :page-sizes='[100, 200, 300, 400]' // 下拉列表，设置每页显示条数
          :page-size='100' // 默认每页显示条数
          layout='total, sizes, prev, pager, next, jumper' // 分页组件构件
          :total='400' // 记录总条数
        -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="searchForm.per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tot"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      // 搜索表单数据对象
      searchForm: {
        status: '',
        type: '', // 类型
        begin_pubdate: '', // 文章发布开始时间
        end_pubdate: '', // 文章发布结束时间
        page: 1, // 默认第一页数据
        per_page: 10 // 每页返回10条数据记录
      },
      tot: 0,
      newsList: [], // 新闻数据
      typeList: [], // 类型数据
      timetotime: [] // 临时接收时间范围信息
    }
  },
  created () {
    this.getNewsType()
    this.getNewsList()
  },
  watch: {
    // 对timetotime成员进行监听
    timetotime (newval) {
      // 把newval的值拆分分别给到 begin_pubdate和end_pubdate 里边
      if (newval) {
        // 赋予时间信息
        this.searchForm.begin_pubdate = newval[0]
        this.searchForm.end_pubdate = newval[1]
      } else {
        // 清空
        this.searchForm.begin_pubdate = ''
        this.searchForm.end_pubdate = ''
      }
    },
    // 对searchForm的各个成员多深度监听，统一筛选获得文章
    searchForm: {
      handler: function (newv, oldv) {
        this.getNewsList()
      },
      deep: true
    }
  },
  computed: {
    identity () {
      return JSON.parse(window.sessionStorage.getItem('userInfo')).identity
    }
  },
  methods: {
    getNewsType () {
      var pro = this.$http.get('/api/newstype')
      pro
        .then(res => {
          // console.log(res)
          if (res.data.status === 0) {
            this.typeList = res.data.data
            // console.log(this.typeList)
          }
        })
        .catch(err => {
          return this.$message.error('获取新闻列表失败!' + err)
        })
    },
    getNewsList () {
      // 把空的筛选条件都去除
      var searchData = {} // 筛选后的条件数据
      for (var i in this.searchForm) {
        // i：代表遍历出来对象的成员属性名称： status、channel_id、page等等
        if (this.searchForm[i]) {
          searchData[i] = this.searchForm[i]
        }
      }
      var pro = this.$http.get('/api/newslist', { params: searchData })
      pro
        .then(res => {
          for (var i = 0; i < res.data.data.length; i++) {
            // console.log(res.data.data[i].pubdate)
            var str = String(res.data.data[i].pubdate)
            res.data.data[i].pubdate =
              str.slice(0, 4) + '-' + str.slice(4, 6) + '-' + str.slice(6)
          }
          if (res.data.status === 0) {
            this.newsList = res.data.data
            // console.log(this.newsList)
            this.tot = res.data.total_count
          }
        })
        .catch(err => {
          return this.$message.error('获取新闻列表失败!' + err)
        })
    },
    shenhe (id, num) {
      var pro = this.$http.post('/api/editstatus/', { id: id, num: num })
      pro
        .then(res => {
          if (res.data.status === 0) {
            this.$message.success('审核成功!')
            this.getNewsList()
          }
        })
        .catch(err => {
          return this.$message.error('审核失败' + err)
        })
    },
    del (id) {
      this.$confirm('确认要删除嘛?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var pro = this.$http.get('/api/newsdel/', { params: { id: id } })
          pro
            .then(res => {
              if (res.data.status === 0) {
                this.getNewsList()
                this.$message.success('新闻删除成功!')
              }
            })
            .catch(err => {
              return this.$message.error('删除新闻失败!' + err)
            })
        })
        .catch(() => {})
    },
    // 当前页码变化的回调处理
    handleCurrentChange (val) {
      // val: 变化后页码的值
      this.searchForm.page = val
      this.getNewsList()
    },
    // 每页数据记录条数变化的回调处理
    handleSizeChange (val) {
      // val: 变化后的页码条数
      this.searchForm.per_page = val
      this.getNewsList()
    }
  }
}
</script>

<style lang='less' scoped>
/*给卡片区设置向下的外边距*/
.search-card {
  margin-bottom: 15px;
  background: url('./444.jpg');
}
.el-pagination {
  margin-top: 15px;
}
</style>
