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
        <p class="time">
          {{renderTime(listData[productIndex].stepOrde==2 ? listData[productIndex].cCheckTime : (listData[productIndex].stepOrde==6 ? listData[productIndex].policyDate:listData[productIndex].oCreateTime))}}
        </p>
        <!-- <p class="details">{{listData[productIndex].oremark}}</p> -->
        <p class="details">
          {{ listData[productIndex].stepOrde==3 ? '标签申请':(listData[productIndex].stepOrde==6 ? listData[productIndex].policyRemark: listData[productIndex].oRemark)}}
        </p>
        <p class="block-identification"><span>区块链标识：</span>{{listData[productIndex].stepOrde==6 ? listData[productIndex].bxHash:listData[productIndex].actionHash}}</p>
        <el-button  v-if="listData[productIndex].stepOrde==2"  @click="dialogTableVisible = true" class="test-report-btn">查看检测报告</el-button>
        <el-button  v-if="listData[productIndex].stepOrde==1"  @click="dialogTableVisible = true" class="real-scene-btn">查看实景照片</el-button>
        <el-button  v-if="listData[productIndex].stepOrde==4"  @click="dialogTableVisible = true" class="real-scene-btn">查看实景照片</el-button>
      </el-col>
      <el-col
        :span="4"
        class="goodsImg"
        style="padding:0"
      >
        <!-- <img class="goods" :src='imgs[5]'> -->
        <img
          class="goods"
          :src="imgs[listData[productIndex].stepOrde-1]"
        >
      </el-col>
         <el-dialog title="检测报告" id="report-modal" :visible.sync="dialogTableVisible" append-to-body>
        <!--移动端-->
        <!-- <ml-i-view  v-model="imgShow" :url="url" :scale="4"></ml-i-view> -->
        <div v-if="phoneShow" class="phone-text-Report-modal" >
          <div class="image" v-for="(pic,index) in picdata" :key="index" @click="openBox(pic)">
            <img :src="pic.imgUrl" alt="" style="width:100%;">
            <h3 class="italictext"> {{ pic.caption }}</h3>
          </div>

        </div>


        <!--pc段端-->
        <el-carousel class="pc-textReport-modal" v-if="pcShow"  :interval="4000" type="card" height="750px" :autoplay="isAutoPlay">
          <el-carousel-item v-for="(item,index) in picdata" :key="index">
            <div class="grid-content">
              <img class="testImg" :src="item.imgUrl" style="width:100%;">
							<h3 class="italictext">{{ item.caption}}</h3>
            </div>

          </el-carousel-item>
        </el-carousel>
      </el-dialog>

    </el-row>
    <transition name="fade">
      <app-lightbox :close="closeBox" :imgsource="currentPic" v-if="lightBoxToggle"></app-lightbox>
    </transition>
  </div>

</template>
<script>
import appLightbox from "@/components/AppLightbox.vue";

import step1 from "@/assets/imgs/1.png";
import step2 from "@/assets/imgs/2.png";
import step3 from "@/assets/imgs/3.png";
import step4 from "@/assets/imgs/4.png";
import step5 from "@/assets/imgs/5.png";
import step6 from "@/assets/imgs/5.png";

import test1 from "@/assets/imgs/test1-1.jpg";
import test2 from "@/assets/imgs/test1-2.jpg";
import test3 from "@/assets/imgs/test1-3.jpg";

export default {
  data() {
    return {
      imgs: [step1, step2, step3, step4, step5,step6],
      isAutoPlay:false,
      phoneShow:false,
      pcShow:false,
      dialogTableVisible: false,
      picdata: [
          {
              id: 1,
              caption: '检测报告1',
              imgUrl: test1
          },
          {
              id: 2,
              caption: '检测报告2',
              imgUrl: test2
          },
          {
              id: 3,
              caption: '检测报告3',
              imgUrl: test3
          }
        ],
      currentPic: '',
      lightBoxToggle: false,

    };
  },

  props: {
    listData: {
      type: Array,
      default: () => {
        return [
          {
            oCreateTime: "时间",
            oRemark: "产品描述",
            stepOrde: "",
            cCheckTime:""
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
    goPAGE() {
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            /*window.location.href="你的手机版地址";*/
            //console.log("mobile")
            this.phoneShow=true
        }
        else {
            /*window.location.href="你的电脑版地址";    */
            //console.log("pc")
            this.pcShow=true;
        }
    },
    openBox (d) {
        this.currentPic = d;
        this.lightBoxToggle = !this.lightBoxToggle;
    },
    closeBox() {
        this.lightBoxToggle = false;
    },

  },
  components: {
      appLightbox
  },
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
  .block-identification{
    color:#5daf34;
    word-break:break-all;
    text-align: left;
    width:250px;
    span{
      font-weight:bold
    }
  }
  .real-scene-btn{
    border:1px solid #5daf34;
    border-radius: 30px;
    color:#5daf34;
  }
  .test-report-btn{
    outline: none;
    border:none;
    background:#fff;
    border:1px solid #5daf34;
    border-radius: 30px;
    color:#5daf34;
  }

}

</style>