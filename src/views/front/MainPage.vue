<template>
  <div class="main">
    <!-- 头部 -->
    <div class="nav">
      <img class="bj" src="@/assets/imgs/bj-shouyeweb.png">
      <tab-search></tab-search>
    </div>
    <!-- 新闻中心 -->
    <head-line
      :text="'新闻中心'"
      :text02="'NEWS  CENTER'"
    ></head-line>
    <div class="news-center">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="新闻动态"
          name="first"
        >
          <div class="newsActive">
            <div class="active-content">
              <ul>
                <li
                  v-for="(item,index) in newsList"
                  :key="index"
                  @click="clickNew(index)"
                >
                  <p class="new-name">{{item.title}}</p>
                  <div class="new-text" :style="'min-height:50px'">
                    <p :style="'min-height:50px'">{{item.text}}</p>
                    <span>{{item.time}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="active-right">
              <router-link to="/news">更多新闻></router-link>
              <ul class="imgsList">
                <li>
                  <div class="right-img">
                    <img src="@/assets/imgs/news-1.png">
                    <div>
                      <p></p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="right-img">
                    <img src="@/assets/imgs/news-2.png">
                    <div>
                      <p>舌尖上的安全</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="信链资讯" name="second">信链资讯</el-tab-pane>
            <el-tab-pane label="媒体视角" name="third">媒体视角</el-tab-pane> -->
      </el-tabs>
    </div>
    <!-- 理赔公示 -->
    <!-- <head-line :text="'理赔公示'" :text02="'INSURANCE  INDEMNITY'"></head-line>
        <div class="indemnity">
            <router-link to="/">更多理赔></router-link>
             <el-table :data="publicityData">
                <el-table-column
                v-for="(item, index) in tableList"
                :key="index"
                align="center"
                :prop="item.prop"
                :label="item.label"
                >
                </el-table-column>
            </el-table>
        </div> -->
  </div>
</template>

<script>
import TabSearch from "@/components/TabSearch.vue";
import HeadLine from "@/components/HeadLine.vue";
import Slider from "@/components/Slider.vue";
export default {
  name: "mainPage",
  data() {
    return {
      activeName: "first",
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
      tableList: [
        {
          label: "交易编号",
          prop: "node",
          width: 240
        },
        {
          label: "交易时间",
          prop: "date",
          width: 240
        },
        {
          label: "原等级",
          prop: "OriginalRrade",
          width: 240
        },
        {
          label: "理赔等级",
          prop: "rank",
          width: 240
        },
        {
          label: "理赔金额",
          prop: "money",
          width: 240
        }
      ],
      publicityData: [
        {
          node: "12345678553",
          date: "2018年6月3日12:00:00",
          OriginalRrade: "特级",
          rank: "一级",
          money: "200元"
        },
        {
          node: "12345678553",
          date: "2018年6月3日12:00:00",
          OriginalRrade: "特级",
          rank: "一级",
          money: "200元"
        },
        {
          node: "12345678553",
          date: "2018年6月3日12:00:00",
          OriginalRrade: "特级",
          rank: "一级",
          money: "200元"
        },
        {
          node: "12345678553",
          date: "2018年6月3日12:00:00",
          OriginalRrade: "特级",
          rank: "一级",
          money: "200元"
        },
        {
          node: "12345678553",
          date: "2018年6月3日12:00:00",
          OriginalRrade: "特级",
          rank: "一级",
          money: "200元"
        },
        {
          node: "12345678553",
          date: "2018年6月3日12:00:00",
          OriginalRrade: "特级",
          rank: "一级",
          money: "200元"
        }
      ]
    };
  },
  props: {},
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    clickNew(index) {
      this.$router.push({path:`/news/${index + 1}`})
    }
  },
  watch: {},
  components: {
    TabSearch,
    HeadLine,
    Slider
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.main {
  .nav {
    position: relative;
    margin-bottom: 160px;
    img.bj {
      width: 100%;
      min-width: 1000px;
    }
  }
  .head-line {
    width: 1100px;
    margin: 0 auto;
    .title-text {
      font-size: 30px;
      font-weight: 600;
    }
    .title-text02 {
      font-size: 16px;
    }
  }
  .news-center {
    width: 1200px;
    margin: 0 auto;
    .newsActive {
      width: 100%;
      position: relative;
    }
    .active-content {
      width: 790px;
    }
    .active-content ul {
      border-top: 1px solid rgba(242, 242, 242, 1);
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    .active-content ul li {
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
      width: 753px;
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
      float: right;
      margin-top: -19px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(117, 117, 117, 1);
    }
    .active-right {
      float: left;
      position: absolute;
      top: -2px;
      right: 1px;
      width: 400px;
      a:first-child {
        position: absolute;
        right: 12px;
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(57, 172, 95, 1);
      }
      ul.imgsList li {
        margin-top: 20px;
      }
      ul.imgsList li div.right-img {
        width: 400px;
        height: 236px;
      }
      ul.imgsList li div.right-img img {
        width: 400px;
        height: 236px;
      }
      ul.imgsList li div.right-img div {
        width: 100%;
        height: 58px;
        background: rgba(87, 183, 44, 0.1);
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        position: absolute;
        bottom: 0px;
      }
      ul.imgsList li div.right-img div p {
        margin-left: -267px;
        margin-top: 10px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .indemnity {
    width: 1200px;
    margin: 0 auto;
    a {
      float: right;
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(57, 172, 95, 1);
    }
    .el-table {
      thead tr th {
        background-color: rgba(85, 85, 85, 0.1);
        .cell {
          font-size: 14px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(85, 85, 85, 1);
          line-height: 25px;
        }
      }
      tbody tr td div.cell {
        font-size: 14px;
        font-family: ArialMT;
        font-weight: 400;
        color: rgba(117, 117, 117, 1);
        line-height: 25px;
      }
    }
    .el-table tr {
      background-color: rgba(0, 0, 0, 0.03);
    }
    .cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap !important;
      // word-break: break-all;
      // max-height: 20px;
    }
  }
}
</style>
