<template>
  <div class="content">
    <div class="nav">
      <span class="tit">海 诺 头 条 新 闻 网 平 台</span>
      <div class="lbt">
        <template>
          <el-carousel indicator-position="none" height="300px">
            <el-carousel-item v-for="(item,i) in imgList" :key="i">
              <img :src="item.url" alt />
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
      <div class="meun">
        <ul>
          <li class="one">
            <span>首 页</span>
          </li>
          <li class="two" @click="$router.push('news')">
            <span>新闻列表</span>
          </li>
          <li class="thr" @click="$router.push('newsadd')">
            <span>新增新闻</span>
          </li>
          <li class="for" @click="$router.push('account')">
            <span>个人中心</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="data">
      <div id="style"></div>
      <div id="style2"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Welcome",
  created() {
    this.getPieType();
    this.getPieStatus()
  },
  data() {
    return {
      imgList: [
        { url: require("./img/lbt3.jpg") },
        { url: require("./img/lbt2.jpg") },
        { url: require("./img/lbt1.jpg") }
      ]
    };
  },
  methods: {
    getPieType() {
      var pro = this.$http.get("/api/pie_type");
      pro
        .then(res => {
          if (res.data.status === 0) {
            var myChart = echarts.init(document.getElementById("style"));
            myChart.setOption({
              title: {
                text: "新闻类型数量分布",
                left: "center"
              },
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: "vertical",
                left: 10,
                data: [
                  "要闻",
                  "抗肺炎",
                  "娱乐",
                  "体育",
                  "美食",
                  "动漫",
                  "游戏",
                  "历史"
                ]
              },
              series: [
                {
                  name: "访问来源",
                  type: "pie",
                  radius: ["50%", "70%"],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: "30",
                      fontWeight: "bold"
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: res.data.list
                }
              ]
            });
          }
        })
        .catch(err => {
          return this.$message.console.error("获取新闻类型数量失败" + err);
        });
    },
    getPieStatus() {
      var pro = this.$http.get("/api/pie_status");
      pro
        .then(res => {
          if (res.data.status === 0) {
            var myChart2 = echarts.init(document.getElementById("style2"));
            myChart2.setOption({
              title: {
                text: "新闻审核状态分布",
                left: "center"
              },
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: "vertical",
                left: "left",
                data: [
                  "待审核",
                  "审核通过",
                  "审核失败"
                ]
              },
              series: [
                {
                  name: "访问来源",
                  type: "pie",
                  radius: "55%",
                  center: ["50%", "50%"],
                  data: res.data.list,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                  }
                }
              ]
            });
          }
        })
        .catch(err => {
          return this.$message.error("获取新闻状态数量失败" + err);
        });
    },
    paintPieTwo() {}
  }
};
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  background-color: #f1f1f1;
  min-width: 1500px;
  .nav {
    height: 500px;
    background: url("./img/mao.jpg") no-repeat 0 -200px;
    background-size: cover;
    margin-bottom: 30px;

    .tit {
      // width: 500px;
      height: 150px;
      display: block;
      line-height: 100px;
      text-align: center;
      font-size: 40px;
      color: skyblue;
      letter-spacing: 0;
      text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777,
        0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333,
        0px 8px 7px #001135;
    }
    .lbt {
      float: left;
      width: 600px;
      height: 300px;
      margin-left: 100px;
      opacity: 0.6;
      img {
        height: 300px;
        width: 600px;
      }
      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
    .meun {
      float: right;
      width: 400px;
      height: 300px;
      margin-right: 300px;
      // background-color: black;
      ul {
        height: 300px;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: center;
        list-style: none;

        li {
          width: 170px;
          height: 60px;
          border-radius: 20px;
          margin-right: 20px;
          margin-bottom: 40px;
          opacity: 0.8;
          cursor: pointer;
          // background-color: #fff;
          span {
            font-size: 16px;
            font-weight: bold;
            line-height: 60px;
            margin-left: 40px;
            color: white;
          }
        }
        .one {
          background: url("./img/sea1.png");
        }
        .one:hover {
          background: url("./img/sea1-hover.png");
        }
        .two {
          background: url("./img/sea2.png");
        }
        .two:hover {
          background: url("./img/sea2-hover.png");
        }
        .thr {
          background: url("./img/sea3.png");
        }
        .thr:hover {
          background: url("./img/sea3-hover.png");
        }
        .for {
          background: url("./img/sea4.png");
        }
        .for:hover {
          background: url("./img/sea4-hover.png");
        }
      }
    }
  }
  .data {
    height: 450px;
    // margin-top: 30px;
    background-color: #fff;
    background: url('./img/luffy.jpg');
    background-position: -250px,-200px;
    #style {
      margin-top: 40px;
      margin-left: 150px;
      width: 600px;
      height: 400px;
      float: left;
    }
    #style2 {
      margin-top: 40px;
      width: 600px;
      height: 400px;
      float: right;
      margin-right: 150px;
    }
  }
}
</style>
