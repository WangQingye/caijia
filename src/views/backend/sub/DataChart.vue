<template>
  <div class="data-chart">
    <div class="options">
      <div
        class="options-type"
        style="margin-top:10px"
      >
        <p>采价品种</p>
        <el-select
          v-model="searchType"
          placeholder="请选择"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div
        class="options-type"
        style="margin-top:20px"
      >
        <p>采价点</p>
        <div class="places">
          <div style="display:inline-block">
            <el-checkbox-group
              v-model="checkedPoints"
              :min="0"
              :max="3"
              @change="pointChange"
            >
              <el-checkbox
                style="text-align:center; margin-top: 5px"
                v-for="item in places"
                :key="item"
                :label="item"
              >{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <el-button
            size="small"
            style="margin-right:100px;display:inline-block;height:30px;"
            v-if="places.length > 20"
          >+更多</el-button>
        </div>
      </div>
    </div>
    <div class="charts">
      <div
        class="single-wrapper"
        style="margin-right: 30px"
      >
        <div class="chart-title">
          <p class="chart-title-text"><span class="chart-title-dot"></span>价格波动信息统计</p>
          <div class="chart-desc">
            <p
              v-for="item in checkedPoints"
              :key="item"
            ><span class="chart-desc-line"></span>{{item}}</p>
            <!-- <i class="el-icon-full-screen"></i> -->
          </div>
        </div>
        <p style="text-align: right;margin: 10px 24px 0 0">单位：元</p>
        <div
          class="chart"
          id="chart1"
        >
        </div>
      </div>
      <div class="single-wrapper">
        <div class="chart-title">
          <p class="chart-title-text"><span class="chart-title-dot"></span>采价次数信息统计</p>
          <div class="chart-desc">
            <p
              v-for="item in checkedPoints"
              :key="item"
            ><span class="chart-desc-line"></span>{{item}}</p>
            <!-- <i class="el-icon-full-screen"></i> -->
          </div>
        </div>
        <p style="text-align: right;margin: 10px 24px 0 0">单位：次</p>
        <div
          class="chart"
          id="chart2"
        >
        </div>
      </div>
      <div
        class="single-wrapper"
        style="margin-right: 30px;"
      >
        <div class="chart-title">
          <p class="chart-title-text"><span class="chart-title-dot"></span>价格行情</p>
          <div class="chart-desc">
            <!-- <i class="el-icon-full-screen"></i> -->
          </div>
        </div>
        <el-table
          :data="priceData"
          style="width: 700px;margin: 0 auto;margin-top:15px"
          size="small"
          header-cell-class-name="table-header"
        >
          <el-table-column
            prop="place"
            label="采价点"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="今日价格"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="percent"
            label="涨幅"
            align="center"
          >
            <template slot-scope="scope">
              <p :style="'color:' + (scope.row.percent > 0 ? '#f05e5e' : '#39ac5f')">{{scope.row.percent}}%</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="num"
            label="涨跌"
            align="center"
          >
            <template slot-scope="scope">
              <p :style="'color:' + (scope.row.percent > 0 ? '#f05e5e' : '#39ac5f')">{{scope.row.num}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="
        single-wrapper">
        <div class="chart-title">
          <p class="chart-title-text"><span class="chart-title-dot"></span>采价排名</p>
          <div class="chart-desc">
            <!-- <i class="el-icon-full-screen"></i> -->
          </div>
        </div>
        <el-table
          :data="priceData"
          style="width: 700px;margin: 0 auto;margin-top:15px"
          size="small"
          header-cell-class-name="table-header"
        >
          <el-table-column
            prop="rank"
            label="排位"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <p :style="'color:' + (scope.row.percent > 0 ? '#f05e5e' : '#39ac5f')"></p>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="采价人"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="place"
            label="所属采价点"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="采价次数"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
var echarts = require("echarts");
export default {
  data: () => {
    return {
      searchType: 1,
      typeOptions: [],
      places: [],
      checkedPoints: [],
      chart1: null,
      chart2: null,
      chartData1: [
        [1.5, 2, 3.6, 1, 3, 2],
        [2, 1, 3.1, 2, 3, 2],
        [2.5, 2.5, 3, 1.2, 1, 3]
      ],
      colors: ["#6bc688", "#67c9f6", "#fbcf97"],
      priceData: [
        { place: "高新", price: "2.3", percent: -0.12, num: 0.16 },
        { place: "高新", price: "2.3", percent: 0.12, num: 0.16 },
        { place: "高新", price: "2.3", percent: -0.12, num: 0.16 },
        { place: "高新", price: "2.3", percent: 0.12, num: 0.16 }
      ],
      priceData: [
        { place: "高新", rank: "1", name: "小王", time: 230 },
        { place: "高新", rank: "2", name: "小王1", time: 200 },
        { place: "高新", rank: "3", name: "小王2", time: 180 },
        { place: "高新", rank: "4", name: "小王3", time: 160 }
      ]
    };
  },
  mounted() {
    this.getLocation();
    this.getKind();
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart1 = echarts.init(document.getElementById("chart1"));
      this.chart2 = echarts.init(document.getElementById("chart2"));
      // 绘制图表
      this.chart1.setOption({
        xAxis: {
          type: "category",
          data: ["6.20", "6.21", "6.22", "6.23", "6.24", "6.25"]
        },
        yAxis: {},
        series: [
          {
            type: "line",
            smooth: true,
            color: "#6bc688",
            data: this.chartData1[0],
            symbolSize: 6,
            itemStyle: {},
            lineStyle: {
              width: 4,
              color: "#6bc688"
            }
          },
          {
            type: "line",
            smooth: true,
            color: "#67c9f6",
            data: this.chartData1[1],
            symbolSize: 6,
            lineStyle: {
              width: 4
            }
          },
          {
            type: "line",
            smooth: true,
            color: this.colors[2],
            data: this.chartData1[2],
            symbolSize: 6,
            lineStyle: {
              width: 4
            }
          }
        ]
      });
      this.chart2.setOption({
        legend: {
          show: false
        },
        tooltip: {},
        dataset: {
          dimensions: ["product", "2015", "2016", "2017"],
          source: [
            {
              product: "6.20",
              "2015": 43.3,
              "2016": 85.8,
              "2017": 93.7
            },
            { product: "6.21", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
            {
              product: "6.22",
              "2015": 86.4,
              "2016": 65.2,
              "2017": 82.5
            },
            {
              product: "6.23",
              "2015": 72.4,
              "2016": 53.9,
              "2017": 39.1
            },
            {
              product: "6.24",
              "2015": 72.4,
              "2016": 53.9,
              "2017": 39.1
            },
            {
              product: "6.25",
              "2015": 72.4,
              "2016": 53.9,
              "2017": 39.1
            }
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            type: "bar",
            itemStyle: {
              barBorderRadius: 7
            },
            barWidth: 18,
            barGap: 0,
            color: this.colors[0]
          },
          {
            type: "bar",
            itemStyle: {
              barBorderRadius: 7
            },
            barWidth: 18,
            barGap: 0,
            color: this.colors[1]
          },
          {
            type: "bar",
            itemStyle: {
              barBorderRadius: 7
            },
            barWidth: 18,
            barGap: 0,
            color: this.colors[2]
          }
        ]
      });
    },
    pointChange() {
      this.chartData1 = this.chartData1.slice(0, 1);
      this.initChart();
    },
    async getLocation() {
      let res = await this.$fetch(
        "/admin/api/v1/locationSearch",
        {
          page: 1,
          pageSize: 100
        },
        "POST"
      );
      if (res.code == 200) {
        res.data.list.forEach(item => {
          this.places.push(item.point);
        });
      }
    },
    async getKind(page) {
      let res = await this.$fetch(
        "/admin/api/v1/kindSearch",
        {
          pageNo: 1,
          pageSize: 1000
        },
        "POST"
      );
      if (res.code == 200) {
        res.data.list.forEach(item => {
          this.typeOptions.push({label: item.name, value: item.name});
        });
      }
    }
  }
};
</script>
<style lang="scss">
.data-chart {
  text-align: left;
  padding: 0 20px;
  .options {
    background: #f9f9f9;
    padding: 10px 0;
    .options-type {
      display: flex;
      align-items: center;
      p {
        text-align: right;
        font-weight: bold;
        margin-right: 20px;
        min-width: 80px;
      }
      .places {
        display: flex;
      }
    }
  }
  .charts {
    margin-top: 20px;
    .single-wrapper {
      display: inline-block;
      width: 750px;
      height: 280px;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .chart {
        width: 850px;
        height: 280px;
        margin-top: -50px;
        margin-left: -40px;
      }
      .chart-title {
        display: flex;
        margin-top: 18px;
        justify-content: space-between;
        .chart-title-text {
          font-size: 22px;
          margin-left: 25px;
          .chart-title-dot {
            vertical-align: middle;
            display: inline-block;
            width: 6px;
            height: 6px;
            background: #39ac5f;
            margin-right: 10px;
          }
        }
        .chart-desc {
          margin-right: 24px;
          p {
            display: inline-block;
            min-width: 80px;
            max-width: 180px;
            margin: 0 10px;
            .chart-desc-line {
              display: inline-block;
              border-radius: 3px;
              width: 20px;
              height: 6px;
              background: #67c9f6;
              vertical-align: middle;
              margin-right: 6px;
            }
          }
        }
      }
    }
  }
  .table-header {
    color: black;
    font-weight: bold;
    font-size: 14px;
  }
}
</style>

