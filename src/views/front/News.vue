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
          <el-breadcrumb-item>新闻中心</el-breadcrumb-item>
          <el-breadcrumb-item>
            <p
              @click="showNewIndex=null"
              :style="'cursor:pointer'"
            >{{titleLabels[this.activeName]}}</p>
          </el-breadcrumb-item>
          <!--<el-breadcrumb-item>媒体视角</el-breadcrumb-item> -->
        </el-breadcrumb>
        <el-tabs
          tab-position="left"
          v-model="activeName"
          @tab-click="handleTabClick"
        >
          <el-tab-pane
            label="新闻动态"
            name="1"
          >
          </el-tab-pane>
          <el-tab-pane
            label="信链资讯"
            name="2"
          ></el-tab-pane>
          <el-tab-pane
            label="媒体视角"
            name="3"
          ></el-tab-pane>
          <div
            class="news-active"
            v-if="!showNewIndex"
          >
            <div class="active-content">
              <ul>
                <li
                  v-for="(item,index) in newsList"
                  :key="index"
                  @click="getSingleNew(item.id)"
                >
                  <new-item :data="item"></new-item>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="news-content"
            v-else
          >
          <h1 :style="'padding: 0 20px;'" v-if="signleNew.newsContent.indexOf('<h1>') == -1">{{signleNew.newsTitle}}</h1>
            <div
              v-html="signleNew.newsContent"
              class="news-content"
            ></div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="dataTotalLength"
          >
          </el-pagination>
        </el-tabs>
      </div>

    </div>
  </div>
</template>
<script>
import NewItem from "@/components/NewItem.vue";
import PageMixin from "@/assets/js/pageMixin";
export default {
  mixins: [PageMixin],
  data() {
    return {
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
      titleLabels: {
        1:'新闻动态',
        2:'信链资讯',
        3:'媒体视角'
      },
      showNewIndex: null,
      signleNew: "",
      activeName: "1"
    };
  },
  mounted() {
    this.getCodeList(1);
  },
  methods: {
    async getSingleNew(id) {
      let res = await this.$fetch("/newsController/queryNewsById", { id });
      if (res.code == 0) {
        this.showNewIndex = true;
        this.signleNew = res.data;
        console.log(this.signleNew);
      }
    },
    async getCodeList(page) {
      let res = await this.$fetch(
        "/newsController/queryNewsPage",
        {
          newsStatus: 1,
          newsType: this.activeName,
          limit: 5,
          page
        },
        "POST"
      );
      if (res.code == 0) {
        this.newsList = res.data.data;
        this.dataTotalLength = res.data.countSize;
      }
    },
    handleTabClick(tab) {
      this.showNewIndex=false;
      this.activeName = tab.name;
      this.getCodeList(1);
    }
  },
  components: {
    NewItem
  },
  watch: {
    activeName(val) {
      this.showNewIndex=false;
      this.getCodeList(1);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      if (to.params.id) {
        vm.getSingleNew(to.params.id);
        vm.showNewIndex = true;
      }
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
          height: 800px;
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
    .el-pagination {
      float: right;
      margin-top: 20px;
      ul.el-pager li {
        background-color: #fff;
        border: 1px solid rgba(242, 242, 242, 1);
        border-radius: 4px;
      }
    }
  }
}
.news-content {
  line-height: 30px;
  padding: 0 20px;
  text-align: left;
  h1 {
    font-size: 30px;
    margin-bottom: 30px;
  }
  h2 {
    font-size: 20px;
    text-align: left;
    margin-bottom: 20px;
  }
  a {
    text-decoration: underline;
    color: blue;
  }
  p {
    text-align: left;
    font-size: 16px;
    // text-indent: 36px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    width: 100%;
    margin-bottom: 20px;
  }
  img {
    display: block;
    margin: 20px auto;
  }
}
</style>
