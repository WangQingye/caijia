<template>
  <div class="news">
    <!-- <div class="nav">
      <img
        class="nav-bg"
        src="@/assets/imgs/bj1.png"
      >
    </div> -->
    <div class="box">
      <div class="green-div">
        <p>NEWS</p>
      </div>
      <div class="news-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>新闻中心</el-breadcrumb-item>
          <el-breadcrumb-item>
            <p @click="showNewIndex=null" :style="'cursor:pointer'">新闻动态</p>
          </el-breadcrumb-item>
          <!--<el-breadcrumb-item>媒体查询</el-breadcrumb-item> -->
        </el-breadcrumb>
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="新闻动态">
            <div class="news-active" v-if="!showNewIndex">
              <div class="active-content">
                <ul>
                  <li
                    v-for="(item,index) in newsList"
                    :key="index"
                    @click="clickNew(index)"
                  >
                    <p class="new-name">{{item.title}}</p>
                    <div class="new-text">
                      <p>{{item.text}}</p>
                      <span>{{item.time}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="news-content" v-else>
              <img v-if="showNewIndex==1" src="@/assets/imgs/new1.png" alt="">
              <img v-if="showNewIndex==2" src="@/assets/imgs/new2.png" alt="">
              <img v-if="showNewIndex==3" src="@/assets/imgs/new3.png" alt="">
              <img v-if="showNewIndex==4" src="@/assets/imgs/new4.png" alt="">
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="2"
            >
            </el-pagination>
          </el-tab-pane>
          <!-- <el-tab-pane label="信链资讯">配置管理</el-tab-pane>
                    <el-tab-pane label="媒体查询">角色管理</el-tab-pane> -->
        </el-tabs>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabPosition: "left",
      newsList: [
        {
          title: "农产品溯源系统解析，没有更全的了！",
          text:
            "我国是农业大国，但农业发展举步维艰，农产品安全问题更是屡见报端，虽然管理部门积极采取措施，加强各方面的管理和监督，但效果一直不理想...",
          time: "2018-04-27",
          route: "/new1"
        },
        {
          title: "区块链技术为传统种业赋能，有助于解决农业诸多问题",
          text:
            "区块链技术应用在种业领域，有利于遏制侵权假冒行为、维护市场公平竞争、保护农民合法权益...",
          time: "2018-07-23",
          route: "/new2"
        },
        {
          title: "2018“区块链+农业”引爆颠覆性变革，将为农业带来什么？",
          text:
            "无论你在什么行业，想必这两天都能在朋友圈里看到关于区块链（Block Chain）的各种新闻。2018新年伊始，轰轰烈烈的区块链猝不及防进入农业人的视野...",
          time: "2018-02-27",
          route: "/new3"
        },
        {
          title: "基于区块链农产品溯源解决方案",
          text:
            "质量安全问题，是当前政府重视、社会关注的热点，不仅关系到公众的身体健康，商品质量追溯是对商品生产全过程的信息跟踪与追溯...",
          time: "2018-07-12",
          route: "/new4"
        }
      ],
      showNewIndex: null
    };
  },
  methods: {
    clickNew(index){
      this.showNewIndex = index + 1;
    }
  },
  beforeRouteEnter (to, from, next) {
      next(async vm => {
        vm.showNewIndex = to.params.id;
    });
  }
};
</script>
<style lang="scss" >
.news {
  min-height: 900px;
  .nav {
    width: 100%;
    min-width: 1200px;
    .nav-bg {
      width: 100%;
      min-width: 1200px;
    }
  }
  .box {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    top: 100px;
    background-color: #fff;
    .green-div {
      width: 240px;
      height: 120px;
      background-color: rgba(57, 172, 95, 1);
      position: absolute;
      top: -45px;
      padding-top: 90px;
      text-align: left;
      p {
        margin-left: 30px;
        font-size: 32px;
        font-family: MicrosoftYaHeiLight;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
      }
    }
    .news-container {
      position: relative;
      top: 39px;
      clear: both;
      .el-breadcrumb {
        height: 40px;
        position: absolute;
        left: 262px;
        span {
          font-weight: bold;
          font-size: 14px;
          color: rgba(57, 172, 95, 1);
        }
        .el-icon-arrow-right:before {
          color: rgba(57, 172, 95, 1);
        }
      }
      .el-tabs {
        min-height: 700px;
        position: relative;
        top: 50px;
        background-color: #fff;
        .el-tabs__nav-scroll {
          height: 200px;
          border-left: 2px solid rgba(228, 231, 237, 1);
          box-sizing: border-box;
        }
      }
    }
    .el-tabs__item {
      text-align: left;
      line-height: 38px;
      width: 240px;
      color: rgba(153, 153, 153, 1);
    }
    .is-active {
      font-weight: bold;
      color: rgba(57, 172, 95, 1);
      background-color: rgba(223, 244, 225, 1);
    }
    .news-content {
      margin-bottom: 150px;
    }
    .news-active {
      width: 100%;
      position: relative;
    }
    .active-content {
      height: 100%;
      padding-left: 30px;
    }
    .active-content ul {
      width: 863px;
      border-top: 1px solid rgba(242, 242, 242, 1);
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    .active-content ul li {
      position: relative;
      cursor: pointer;
      margin-top: 15px;
      border-bottom: 1px solid rgba(242, 242, 242, 1);
    }
    .active-content ul li p.new-name {
      width: 450px;
      height: 16px;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(85, 85, 85, 1);
      margin-bottom: 17px;
      text-align: left;
    }
    .active-content ul li div.new-text {
      width: 100%;
      height: 46px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 30px;
      margin-bottom: 20px;
      p {
        text-align: left;
      }
    }
    .active-content ul li div.new-text span {
      position: absolute;
      bottom: 5px;
      right: 20px;
      float: right;
      margin-top: -17px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(117, 117, 117, 1);
    }
    .el-pagination {
      float: right;
      ul.el-pager li {
        background-color: #fff;
        border: 1px solid rgba(242, 242, 242, 1);
        border-radius: 4px;
      }
    }
  }
}
</style>
