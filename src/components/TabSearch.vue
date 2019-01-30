<template>
  <div class="tab-search">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="追溯码"
        name="first"
      >
        <el-row :gutter="24">
          <el-col :span="14">
            <el-input
              v-model="input"
              maxlength="19"
              placeholder="输入产品追溯码进行查询"
            ></el-input>
          </el-col>
          <el-col :span="7">
            <slider
              ref="confirmSuccess"
              :modalEvent="isModalshow"
            ></slider>
          </el-col>
          <el-col
            :span="3"
            style="padding:0;margin:0"
          >
            <el-button
              type="primary"
              @click="open"
              :disabled="isDisabled"
              icon="el-icon-search"
            >搜索</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      show-close
      :visible.sync="isModalshow"
    >
      <img
        src="@/assets/imgs/bj-web.png"
        class="bj-web"
      />
      <head-line
        :text="'原产品'"
        :text02="'COUNTRY   OF  ORIGIN'"
      ></head-line>
      <div class="mapImg">
        <img
          class="map-web"
          src="@/assets/imgs/map-web.png"
        >
        <div class="location">
          <img src="@/assets/imgs/Location.png">
          <p>四川</p>
        </div>
      </div>
      <head-line
        :text="'产品信息'"
        :text02="'PRODUCT INFORMATION'"
      ></head-line>
      <div class="productMsg">
        <ul class="ul1">
          <li>
            产品编号<span>{{inputText}}</span>
          </li>
          <li>
            产地<span>{{products.sorigin}}</span>
          </li>
          <li>
            农产种类<span>{{products.skindName}}</span>
          </li>
        </ul>
        <ul class="ul2">
          <li>
            农产品种<span>{{products.svarietyName}}</span>
          </li>
          <li>
            采摘时间<span>{{renderTime(products.sstoreTime)}}</span>
          </li>
          <li>
            企业<span>{{products.sstoreCompanyName}}</span>
          </li>
        </ul>
      </div>
      <head-line
        :text="'产品溯源'"
        :text02="'PRODUCT  TRACEABILITY'"
      ></head-line>
      <div class="product-list">
        <div class="Dot-row">
          <div class="Dot">
            <img
              src="@/assets/imgs/yuan1.png"
              alt=""
            >
          </div>
        </div>
        <product-table
          :class="['goods-item',`item-${index+1}`, index%2==0 ?'goods-left':'goods-right']"
          :listData="productDetails"
          v-for="(item,index) in productDetails "
          :key="index"
          :productIndex="index"
        >
        </product-table>

      </div>

    </el-dialog>

  </div>
</template>


<script>
import fetch from "@/assets/js/fetch.js";
import HeadLine from "@/components/HeadLine.vue";
import ProductTable from "@/components/ProductTable.vue";
import Slider from "@/components/Slider.vue";
import UpToNow from "@/components/UpToNow.vue";
import goods from "@/assets/imgs/goods.jpg";
export default {
  data() {
    return {
      activeName: "first",
      input: "",
      inputText: "",
      tabValue: 0,
      stopValue: "",
      index: "",
      products: [],
      productDetails: [
        // {
        //     ocreateTime:'2018-12-02',
        //     oremark:'入库',
        //     stepOrde:1
        // },
        //  {
        //     ocreateTime:'2018-12-02',
        //     oremark:'检测',
        //     stepOrde:2
        // },
        //  {
        //     ocreateTime:'2018-12-02',
        //     oremark:'申请',
        //     stepOrde:3
        // },
        //  {
        //     ocreateTime:'2018-12-02',
        //     oremark:'出库',
        //     stepOrde:4
        // },
        //  {
        //     ocreateTime:'2018-12-02',
        //     oremark:'物流',
        //     stepOrde:5
        // }
      ],
      isDrag: false,
      isDisabled: true,
      isModalshow: false
    };
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    open() {
      this.isDrag = this.$refs.confirmSuccess.confirmSuccess;
      this.inputText = this.input;
      this.getData();
    },
    async getData() {
      let data = await fetch(
        "/queryController/queryOriginActionByCode",
        {
          inputCode: this.inputText
        },
        "get"
      );
      console.log(data);

      if (data.code == 0) {
        for (var i = 0; i < data.data.length; i++) {
          var item = data.data[i];
          //console.log(item)
          if (item.stepOrde == 1) {
            //console.log("入库");
            this.products = item;
          } else if (item.stepOrde == 2) {
            //console.log("检测")
          } else if (item.stepOrde == 3) {
            //console.log("标签申请")
          } else if (item.stepOrde == 4) {
            //console.log("出库")
          } else {
            //console.log("物流")
          }
        }
        this.productDetails = data.data;
        this.isModalshow = true;
        //console.log(data);
      } else if (data.code !== 0) {
        this.$message({
          showClose: true,
          message: "溯源码输入有误，请确认后重新输入！！",
          type: "error"
        });
      } else if (!this.isDrag) {
        this.$message({
          showClose: true,
          message: "请拖动滑片来验证！！",
          type: "error"
        });
      }
    },
    renderTime(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    }
  },
  computed: {},
  mounted() {},
  watch: {
    input: {
      handler() {
        //console.log("input改变了")
        this.isDisabled = false;
      }
    },
    isModalshow: {
      handler() {
        //console.log("模态框改变了");
        this.isDisabled = true;
        this.input = "";
      }
    }
  },
  components: {
    HeadLine,
    ProductTable,
    UpToNow,
    Slider
  }
};
</script>

<style lang="scss" >
.main {
  .tab-search {
    position: absolute;
    bottom: 160px;
    left: 10%;
    width: 80%;
    min-width: 1000px;
    margin: 0 auto;
    background-color: #fff;
    padding: 40px;
    box-sizing: border-box;
    .productMsg {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      width: 1100px;
    }
    .productMsg ul {
      width: 550px;
      li {
        height: 42px;
        text-align: left;
        padding-left: 70px;
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(85, 85, 85, 1);
        line-height: 42px;
        border: 1px solid rgba(242, 242, 242, 1);
        span {
          font-family: ArialMT;
          margin-left: 20px;
          font-weight: 400;
          color: rgba(117, 117, 117, 1);
        }
      }
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-dialog__header {
      padding: 0;
    }
  }
  @media only screen and (max-width: 1300px) {
    .tab-search {
      bottom: 90px;
    }
  }
  .title-text {
    font-size: 30px;
    font-family: SourceHanSerifCN-SemiBold;
    font-weight: 300;
    color: rgba(85, 85, 85, 1);
  }
  .title-text02 {
    font-size: 16px;
    font-family: MicrosoftYaHeiLight;
    font-weight: 300;
    color: rgba(187, 187, 187, 1);
  }
  .head-line {
    width: 1000px;
    margin: 0 auto;
    margin-bottom: 64px;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .el-col-4 {
      padding: 0;
    }
  }
  .el-slider__runway {
    width: 100%;
    height: 42px;
    background-color: #e4e7ed;
    border-radius: 3px;
    position: relative;
    top: -17px;
    cursor: pointer;
    vertical-align: middle;
  }

  .mapImg {
    width: 100%;
    margin: 0 auto;
    position: relative;
    .map-web {
      width: 80%;
      margin: 0 auto;
    }
    .location {
      position: absolute;
      bottom: 236px;
      left: 320px;
      img {
        position: relative;
        bottom: -12px;
      }
      p {
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(85, 85, 85, 1);
        line-height: 52px;
      }
    }
  }
  .productMsg {
    width: 1025px;
    margin: 0 auto;
  }
  .product {
    width: 1000px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .table.box {
    width: 100%;
  }
  .table-row {
    position: relative;
    .table-dot {
      position: absolute;
      left: 168px;
    }
    .el-col-16 {
      position: absolute;
      left: -108px;
    }
    .goodsImg {
      position: absolute;
      top: -26px;
      left: -317px;
      img {
        left: 0px;
        width: 140px;
        height: 140px;
      }
    }
  }
  .product-list {
    width: 100%;
    min-width: 1000px;
    padding-top: 95px;
    .Dot-row {
      width: 100%;
      max-width: 311px;
      margin: 0 auto;
      height: 29px;
      position: relative;
    }
    .Dot {
      img {
        position: absolute;
        top: -65px;
        left: 145px;
      }
    }
    .Dot:after {
      content: "";
      display: inline-block;
      width: 3px;
      height: 49px;
      float: left;
      background: rgba(242, 242, 242, 1);
      position: absolute;
      top: -49px;
      left: 152px;
    }
  }
  .goods-right div.table-row {
    .el-col-16 {
      left: 219px;
    }
    .goodsImg {
      left: 510px;
    }
  }
  #UpToNow {
    width: 1200px;
    height: 20px;
    .goTo[data-v-15e02a80] {
      width: 311px;
      margin: 0 auto;
      display: block;
      position: absolute;
      bottom: 18px;
      left: 440px;
    }
  }
}
</style>