<template>
  <div class="table-box">
    <el-row
      :gutter="20"
      class="table-row"
    >
      <el-col
        :span="4"
        class="table-dot"
      >
        <img
          class="dot"
          src="@/assets/imgs/yuan2.png"
        >
      </el-col>
      <el-col :span="16">
        <p class="time">{{renderTime(listData[productIndex].stepOrde==2 ? listData[productIndex].ccheckTime : listData[productIndex].ocreateTime)}}</p>
        <!-- <p class="details">{{listData[productIndex].oremark}}</p> -->
        <p class="details">{{ listData[productIndex].stepOrde==3 ? '标签申请': listData[productIndex].oremark}}</p>
      </el-col>
      <el-col
        :span="4"
        class="goodsImg"
        style="padding:0"
      >
        <!-- <img class="goods" src='@/assets/imgs/goods.jpg'> -->
        <img
          class="goods"
          :src="imgs[listData[productIndex].stepOrde-1]"
        >
      </el-col>
    </el-row>
  </div>

</template>
<script>
import step1 from "@/assets/imgs/1.png";
import step2 from "@/assets/imgs/2.png";
import step3 from "@/assets/imgs/3.png";
import step4 from "@/assets/imgs/4.png";
import step5 from "@/assets/imgs/5.png";
export default {
  data() {
    return {
      imgs: [step1, step2, step3, step4, step5]
    };
  },
  props: {
    listData: {
      type: Array,
      default: () => {
        return [
          {
            ocreateTime: "时间",
            oremark: "产品描述",
            stepOrde: ""
            // imagineSrc:goods
          }
        ];
      }
    },
    productIndex: {
      default: () => {
        return [];
      }
    }
  },
  mounted() {},
  methods: {
    renderTime(date) {
      if (!date) return;
      let aa = date.replace(/\-/g, "/");
      let bb = aa.replace(/T/g, " ");
      let cc = bb.split(".")[0];
      let dataObj = new Date(cc);
      let txt = "";
      txt += dataObj.getFullYear() + "-";
      txt += this.PrefixInteger(dataObj.getMonth() + 1, 2) + "-";
      txt += this.PrefixInteger(dataObj.getDate(), 2) + " ";
      txt += this.PrefixInteger(dataObj.getHours(), 2) + ":";
      txt += this.PrefixInteger(dataObj.getMinutes(), 2) + ":";
      txt += this.PrefixInteger(dataObj.getSeconds(), 2);
      return txt;
    },
    PrefixInteger(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    }
  }
};
</script>

<style lang="scss">
.table-box {
  width: 311px;
  height: 191px;
  margin: 0 auto;
  margin-top: -25px;
  position: relative;

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .table-row {
    position: relative;
  }
  .table-dot {
    position: relative;
  }
  .table-dot:after {
    content: "";
    display: inline-block;
    width: 3px;
    height: 146px;
    float: left;
    background: rgba(242, 242, 242, 1);
    position: absolute;
    top: 22px;
    left: -4px;
  }
  .dot {
    position: absolute;
    left: -11px;
  }
  .time {
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    color: rgba(85, 85, 85, 1);
    text-align: left;
  }
  .details {
    margin-top: 15px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(117, 117, 117, 1);
    line-height: 22px;
    text-align: left;
  }
  .goodsImg {
    position: relative;
    .goods {
      border-radius: 50%;
      width: 70px;
      height: 70px;
      position: absolute;
      top: 32px;
      left: 24px;
    }
  }
}
</style>