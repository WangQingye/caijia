<template>
  <div class="home">
    <img
      class="main-bg"
      src="@/assets/imgs/main-bg.png"
    />
    <img
      class="main-header"
      src="@/assets/imgs/main-header.png"
    />
    <div class="main-content">
      <section class="main-left">
        <div class="left-top">
          <div class="top-item">
            <p class="top-item-left-text justify">采价点</p>
            <ul class="top-item-ul">
              <li
                class="top-item-li"
                v-for="(item,index) in placeNum"
                :key="index"
              >{{item}}</li>
            </ul>
          </div>
          <div class="top-item">
            <p class="top-item-left-text justify">采价次数</p>
            <ul class="top-item-ul">
              <li class="top-item-li">0</li>
              <li class="top-item-li">0</li>
              <li class="top-item-li">0</li>
              <li class="top-item-li">3</li>
              <li class="top-item-li">4</li>
            </ul>
          </div>
          <div class="top-item">
            <p class="top-item-left-text justify">采集品种</p>
            <ul class="top-item-ul">
              <li
                class="top-item-li"
                v-for="(item,index) in kindNum"
                :key="index"
              >{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="left-bottom">
          <img
            class="left-bottom-bg"
            src="@/assets/imgs/left-bottom.png"
          />
          <p class="title">采价分布</p>
          <div
            class="chart1"
            id="chart1"
          ></div>
          <p class="title">采价频次</p>
          <p class="chart2-text">单位：次/天</p>
          <div
            class="chart2"
            id="chart2"
          ></div>
        </div>
      </section>
      <div class="main-middle">
        <img src="@/assets/imgs/middle-title.png" />
        <div class="middle-bottom">
          <img
            class="middle-bottom-bg"
            src="@/assets/imgs/middle-bottom.png"
          />
          <img
            class="middle-map"
            src="@/assets/imgs/main-map.png"
          />
          <p class="title">实时采价数据</p>
          <div class="data-list">
            <ul
              class="data-ul"
              ref="scrollUl"
            >
              <li
                class="data-li"
                v-for="(item, index) in scrollList"
                :key='index'
              >
                <div class="li-item">
                  <p class="item-top">时间</p>
                  <p class="item-bottom">{{item.gatherTime}}</p>
                </div>
                <div class="li-item">
                  <p class="item-top">采价点</p>
                  <p class="item-bottom">{{item.point}}</p>
                </div>
                <div class="li-item">
                  <p class="item-top">采价品种</p>
                  <p class="item-bottom">{{item.kind}}</p>
                </div>
                <div class="li-item">
                  <p class="item-top">价格</p>
                  <p class="item-bottom">{{item.price}}元/斤</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="main-right">
        <img src="@/assets/imgs/right-title.png" />
        <ul class="right-ul">
          <li
            class="right-li right-li-head"
            style="background-color: rgba(1, 254, 254, 0.1)"
          >
            <p>品种</p>
            <p>今日均价</p>
            <p>涨幅</p>
            <p>涨跌</p>
          </li>
          <li
            class="right-li"
            v-for="(item, index) in priceData"
            :key="index"
          >
            <p style="font-weight:normal">{{item.name}}</p>
            <p>{{item.price}}</p>
            <p :style="'color:' + (item.percent > 0 ? '#ff5656':'#48dd8d')">{{item.percent == '-' ? '-' : item.percent + '%'}}</p>
            <p :style="'color:' + (item.percent > 0 ? '#ff5656':'#48dd8d')">{{item.percent == '-' ? '-' : item.gap}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
var echarts = require("echarts");
export default {
  data: () => {
    return {
      chart1: {},
      chart2: {},
      priceData: [
        // { name: "大白菜", price: 3.14, percent: -0.12, gap: 0.16 },
        // { name: "红萝卜", price: 3.14, percent: 0.12, gap: 0.16 },
        // { name: "大白菜", price: 3.14, percent: -0.12, gap: 0.16 },
        // { name: "红萝卜", price: 3.14, percent: 0.12, gap: 0.16 },
        // { name: "大白菜", price: 3.14, percent: -0.12, gap: 0.16 },
        // { name: "红萝卜", price: 3.14, percent: 0.12, gap: 0.16 },
        // { name: "大白菜", price: 3.14, percent: -0.12, gap: 0.16 },
        // { name: "红萝卜", price: 3.14, percent: 0.12, gap: 0.16 },
        // { name: "大白菜", price: 3.14, percent: -0.12, gap: 0.16 },
        // { name: "红萝卜", price: 3.14, percent: 0.12, gap: 0.16 },
        // { name: "大白菜", price: 3.14, percent: -0.12, gap: 0.16 },
        // { name: "红萝卜", price: 3.14, percent: 0.12, gap: 0.16 },
        // { name: "大白菜", price: 3.14, percent: -0.12, gap: 0.16 }
      ],
      productUrl,
      scrollList: [
        {
          gatherTime: 1567951491000,
          point: "bb",
          kind: "茎菜类 > 大白菜",
          price: 1
        }
      ],
      placeNum: "00031",
      kindNum: "00034",
      gatherNum: "00014",
      chartData1: [],
      chartDays: [],
      chartDaysData: []
    };
  },
  mounted() {
    // this.initChart();
    this.initWebScoket();
    // this.initScroll();
    this.getGatherForLocation();
    this.getKindCount();
    this.getLocationCount();
    this.getDayCount();
    this.getKindPrice();
    this.getCacheGather();
  },
  methods: {
    async getGatherForLocation() {
      let res = await this.$fetch(
        "/common/api/v1/gatherForLocation",
        {},
        "POST"
      );
      if (res.code == 200) {
        if (res.data) {
          res.data.forEach(item => {
            this.chartData1.push({ value: item.count, name: item.point });
          });
          this.initChart1();
        }
      }
    },
    async getKindCount() {
      let res = await this.$fetch("/common/api/v1/kindCount", {}, "POST");
      if (res.code == 200) {
        this.kindNum = this.prefixZero(res.data, 5);
      }
    },
    async getLocationCount() {
      let res = await this.$fetch("/common/api/v1/locationCount", {}, "POST");
      if (res.code == 200) {
        this.placeNum = this.prefixZero(res.data, 5);
      }
    },
    async getDayCount() {
      let res = await this.$fetch("/common/api/v1/gatherDayCount", {}, "POST");
      if (res.code == 200) {
        res.data.forEach(item => {
          this.chartDays.push(item.days.slice(5));
          this.chartDaysData.push(item.count);
        });
        this.initChart2();
      }
    },
    async getKindPrice() {
      let res = await this.$fetch("/common/api/v1/gatherByKind", {}, "POST");
      if (res.code == 200) {
        let data = res.data.data;
        data.today.forEach((item, index) => {
          let percent, gap;
          if (item.price && data.yesterday[index].price) {
            percent =
              ((item.price - data.yesterday[index].price) / item.price) * 100;
            gap = Math.abs(item.price - data.yesterday[index].price);
          } else {
            percent = "-";
            gap = "-";
          }
          this.priceData.push({
            name: item.name,
            price: item.price,
            percent,
            gap
          });
        });
      }
    },
    async getCacheGather() {
      let res = await this.$fetch("/common/api/v1/getCacheGather", {}, "POST");
      if (res.code == 200) {
      }
    },
    initChart1() {
      this.chart1 = echarts.init(document.getElementById("chart1"));
      // 绘制图表
      this.chart1.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.chartData1,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            textStyle: {
              fontWeight: "bold"
            }
          }
        ],
        color: ["#48dd8d", "#4dbeff", "#01ffff", "#f4b73a"]
      });
    },
    initChart2() {
      this.chart2 = echarts.init(document.getElementById("chart2"));
      this.chart2.setOption({
        xAxis: {
          type: "category",
          data: this.chartDays,
          axisLine: {
            lineStyle: {
              color: "#828c94"
            }
          },
          axisLabel: {
            color: "white"
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "transparent"
            }
          },
          axisLabel: {
            color: "white"
          }
        },
        gird: {},
        series: [
          {
            data: this.chartDaysData,
            type: "bar",
            itemStyle: {
              barBorderRadius: 7
            },
            barWidth: 18,
            barGap: 0,
            color: "#36a9eb"
          }
        ]
      });
    },
    initWebScoket() {
      let webSocketUrl = this.productUrl.replace("http", "ws");
      this.webSocket = new WebSocket(`${webSocketUrl}/ws/api/v1`);
      this.webSocket.onopen = () => {
        console.log("websocket链接成功");
      };
      this.webSocket.onclose = () => {
        console.log("websocket断开成功");
      };
      this.webSocket.onmessage = msg => {
        try {
          let data = JSON.parse(msg.data);
          if (data.type == 1) {
            this.scrollList.push({
              gatherTime: data.data.gatherTime,
              point: data.data.point,
              kind: data.data.largeKindName + " > " + data.data.kindName,
              price: data.data.price
            });
            this.gatherNum = this.prefixZero(data.data.count);
          }
        } catch (error) {}
      };
    },
    closeWebSocket() {
      this.webSocket.close();
    },
    initScroll() {
      this.$refs.scrollUl.style.animationDuration =
        this.scrollList.length * 2 + "s";
    },
    prefixZero(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
    fixTime(timeStamp) {
      let time = new Date(timeStamp);
      let hour = time.toString()[4];
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day + ' ' + hour;
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  min-width: 1920px;
  height: 100vh;
  position: relative;
  color: white;
  text-align: left;
  .main-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    min-width: 1920px;
  }
  .main-header {
    position: relative;
    z-index: 1;
  }
  .main-content {
    position: relative;
    z-index: 1;
    padding: 0 30px;
    display: flex;
    .main-left {
      width: 510px;
      .left-top {
        margin-top: 20px;
        .top-item {
          height: 74px;
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          .top-item-left-text {
            font-size: 20px;
            font-weight: bold;
            color: #01fefe;
            width: 90px;
            margin-right: 20px;
          }
          .top-item-ul {
            margin-top: -20px;
            width: 412px;
            .top-item-li {
              width: 74px;
              height: 74px;
              background-color: rgba(1, 254, 254, 0.1);
              display: inline-block;
              font-size: 40px;
              font-weight: bold;
              line-height: 74px;
              text-align: center;
              margin-right: 8px;
            }
            .top-item-li:last-child {
              margin-right: 0px;
            }
          }
        }
      }
      .left-bottom {
        position: relative;
        padding: 30px;
        .left-bottom-bg {
          width: 510px;
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
        }
        .chart1 {
          width: 330px;
          height: 240px;
          margin: 0 auto;
        }
        .chart2-text {
          margin-top: 20px;
        }
        .chart2 {
          width: 450px;
          height: 280px;
          margin: 0 auto;
          margin-top: -20px;
        }
      }
    }
    .main-middle {
      padding: 10px 20px 20px 20px;
      margin-left: 10px;
      .middle-bottom {
        position: relative;
        padding: 20px;
        .middle-bottom-bg {
          position: absolute;
          left: 0;
          top: 602px;
          z-index: -1;
        }
        .middle-map {
          width: 676px;
          height: 564px;
          margin: 0 auto;
          display: block;
          margin-bottom: 40px;
        }
        .data-list {
          overflow: hidden;
          margin-top: 10px;
          height: 240px;
          .data-ul {
            height: 240px;
            margin-top: 10px;
            animation: upup 15s linear infinite;
            @keyframes upup {
              0% {
                transform: translateY(240px);
              }
              // 99% {
              //   transform: translateY(-30px); // 每行高50
              // }
              100% {
                transform: translateY(-100%); // 每行高50
              }
            }
            .data-li {
              display: flex;
              text-align: center;
              width: 750px;
              margin: 0 auto;
              .li-item {
                width: 190px;
                border-bottom: 1px dotted #ddd;
                padding: 12px 0;
                .item-top {
                  line-height: 28px;
                  color: #1886c5;
                  font-size: 16px;
                  font-weight: bold;
                }
                .item-bottom {
                  line-height: 28px;
                  color: white;
                  font-size: 16px;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
    .main-right {
      padding: 10px 20px 20px 20px;
      .right-ul {
        width: 500px;
        margin-top: 20px;
        .right-li {
          width: 500px;
          height: 62px;
          display: flex;
          text-align: center;
          p {
            font-size: 16px;
            line-height: 62px;
            width: 125px;
            font-weight: bold;
          }
        }
        .right-li:nth-child(odd) {
          background-color: rgba(1, 254, 254, 0.03);
        }
        .right-li-head {
          color: #01ffff;
          font-weight: bold;
          background-color: rgba(1, 254, 254, 0.1);
        }
      }
    }
  }
}
.justify {
  display: inline-block;
  width: 100%;
  text-align: justify;
  word-break: break-all;
}
.justify::after {
  content: "";
  display: inline-block;
  width: 100%;
  overflow: hidden;
  height: 0;
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: #01fefe;
  border-left: 6px solid #01fefe;
  padding-left: 15px;
  height: 20px;
  line-height: 20px;
}
</style>

