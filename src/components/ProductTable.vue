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
        <p class="test-report" v-if="listData[productIndex].stepOrde==2">
          <button  @click="dialogTableVisible = true" class="test-report-btn">查看检测报告</button>
        </p>

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
         <el-dialog title="检测报告" :visible.sync="dialogTableVisible" >
        <!--移动端-->
        <!-- <ml-i-view  v-model="imgShow" :url="url" :scale="4"></ml-i-view> -->
        <div v-if="phoneShow" class="phone-text-Report-modal">
          <img src="@/assets/imgs/test1-1.jpg" preview preview-text="描述">
          <img src="@/assets/imgs/test1-2.jpg" preview="1" preview-text="描述">
          <img src="@/assets/imgs/test1-3.jpg" preview="1" preview-text="描述">

        </div>


        <!--pc段端-->
        <el-carousel class="pc-textReport-modal" v-if="pcShow"  :interval="4000" type="card" height="850px" :autoplay="isAutoPlay">
          <el-carousel-item v-for="(item,index) in testImgs" :key="index">
            <div class="grid-content">
              <img class="testImg" :src="item.src">
							<h3 class="italictext">{{ item.txt}}</h3>
            </div>

          </el-carousel-item>
        </el-carousel>
      </el-dialog>

    </el-row>
  </div>

</template>
<script>
import step1 from "@/assets/imgs/1.png";
import step2 from "@/assets/imgs/2.png";
import step3 from "@/assets/imgs/3.png";
import step4 from "@/assets/imgs/4.png";
import step5 from "@/assets/imgs/5.png";

import test1 from "@/assets/imgs/test1-1.jpg";
import test2 from "@/assets/imgs/test1-2.jpg";
import test3 from "@/assets/imgs/test1-3.jpg";

export default {
  data() {
    return {
      imgs: [step1, step2, step3, step4, step5],
      testImgs:[
        {
          src:test1,
          txt:"检测报告1"
        },
        {
          src:test2,
          txt:"检测报告2"
        },
        {
          src:test3,
          txt:"检测报告3"
        }
      ],
      imgShow:false,
      url:'D:\syy-Project\test-report',
      isAutoPlay:false,
      phoneShow:false,
      pcShow:false,
      dialogTableVisible: false
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
  mounted() {
    this.goPAGE();
  },
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
    },
    goPAGE() {
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            /*window.location.href="你的手机版地址";*/
            console.log("mobile")
            this.phoneShow=true
        }
        else {
            /*window.location.href="你的电脑版地址";    */
            console.log("pc")
            this.pcShow=true;
        }
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
  .test-report{
    margin-top:10px;
    margin-left:-142px;
    .test-report-btn{
      outline: none;
      border:none;
      background:#fff;
      text-decoration:underline
    }
  }
  .phone-text-Report-modal{
    img{
      width:100%;
    }
  }
  .pc-textReport-modal{
    .grid-content{
      .testImg{
        width:100%;
        cursor: pointer;

      }
    }
  }
}

</style>