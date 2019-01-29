<template>
    <div class="phone">
      <img class="banner-wap" src="@/assets/imgs/banner-wap.png"  alt="">
      <head-line :text="'原产品'" :text02="'COUNTRY   OF  ORIGIN'"></head-line>
      <div class="map">
        <img class="map-wap" src="@/assets/imgs/map-wap.png" >
        <div class="location" >
          <img src="@/assets/imgs/Location.png">
          <p>四川</p>
        </div>
      </div>
      <head-line :text="'产品信息'" :text02="'PRODUCT INFORMATION'"></head-line>
      <div class="product-msg">
        <ul>
          <li>
            <span class="pro-title">产品编码</span>
            <span class="pro-details">{{parseQRCode(urlParam)}}</span>
          </li>
          <li>
            <span class="pro-title">产地</span>
            <span class="pro-details">{{products.sorigin}}</span>
          </li>
          <li>
            <span class="pro-title">农产种类</span>
            <span class="pro-details">{{products.skindName}}</span>
          </li>
          <li>
            <span class="pro-title">农产品种</span>
            <span class="pro-details">{{products.svarietyName}}</span>
          </li>
           <li>
            <span class="pro-title">采摘时间</span>
            <span class="pro-details">{{renderTime(products.sstoreTime)}}</span>
          </li>
          <li>
            <span class="pro-title">企业</span>
            <span class="pro-details">{{products.ocompanyName}}</span>
          </li>
        </ul>
      </div>
      <head-line :text="'产品溯源'" :text02="'PRODUCT  TRACEABILITY'"></head-line>
      <div class="product">
        <el-row :gutter="20">
          <el-col :span="12"  class="tableDot">
            <img src="@/assets/imgs/yuan1.png">
          </el-col>
        </el-row>
        <product-table
        :listData="productDetails"
        v-for="(item,index) in productDetails "
        :key="index" :productIndex="index">
        </product-table>
      </div>
      <up-to-now></up-to-now>
    </div>
</template>

<script>
import fetch from "@/assets/js/fetch.js";
import HeadLine from '@/components/HeadLine.vue'
import ProductTable from '@/components/ProductTable.vue'
import UpToNow from '@/components/UpToNow.vue'


export default {
  name: "phone",
  data() {
    return {
      urlParam:"",
      products:[],
      productDetails:[
        // {
        //       ocreateTime:'2018-12-02',
        //       oremark:'入库',
        //       stepOrde:1
        //   },
        //    {
        //       ocreateTime:'2018-12-02',
        //       oremark:'检测',
        //       stepOrde:2
        //   },
        //    {
        //       ocreateTime:'2018-12-02',
        //       oremark:'申请',
        //       stepOrde:3
        //   },
        //    {
        //       ocreateTime:'2018-12-02',
        //       oremark:'出库',
        //       stepOrde:4
        //   },
        //    {
        //       ocreateTime:'2018-12-02',
        //       oremark:'物流',
        //       stepOrde:5
        //   }
      ]
    };
  },
  props: {
  },
  methods: {
    async getProductData(){
      //console.log("当前参数：" + this.urlParam)
        let data = await fetch(
          '/queryController/queryOriginActionByBatch',
          {
           urlParam:this.urlParam
          }
        );
        console.log(data.data)
        if(data.code == 0){
          //alert(data.data.length)
          for(var i=0;i<data.data.length;i++){
            var item=data.data[i];
            console.log(item.stepOrde)
            if(item.stepOrde==1){
              //console.log("入库");
              this.products=item
            }
            // else if(item.stepOrde==2){
            //   //console.log("检测")
            // }else if(item.stepOrde==3){
            //   //console.log("标签申请")
            // }else if(item.stepOrde==4){
            //   //console.log("出库")
            // }else{
            //   //console.log("物流")
            // }
          }
          //alert(this.products)
        this.productDetails=data.data
        }

    },
    renderTime(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    parseQRCode(codeURL){
      var code = codeURL.split("id%3D");
      return code[1];
    },
    getUrlParam(){
      this.urlParam=location.href;
      var num=this.urlParam.indexOf("?");
      this.urlParam=this.urlParam.substr(num+10)
      //alert(this.urlParam)
    }
  },
  mounted(){
    this.getUrlParam();
    this.getProductData();

  },
  watch: {

  },
  components: {
    HeadLine,
    ProductTable,
    UpToNow
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.phone {
    width: 100%;
    margin: 0 auto;
    .banner-wap{
      width:100%;
      margin:0 auto;
    }
    .map{
      width:100%;
      margin:0 auto;
      position:relative;
      .map-wap{
        width:100%;
        margin:0 auto;
      }
      .location{
        position:absolute;
        top:69px;
        left:95px;
        img{
          width:50%;
        }
          p{
          font-size:10px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(85,85,85,1);
          line-height:20px;
        }
      }

  }
  .product-msg{
    width:100%;
    margin:0 auto;
    border:1px solid rgba(242, 242, 242, 1);
    ul{
      li{
        width:100%;
        height:42px;
        border-bottom:1px solid rgba(242, 242, 242, 1);
        position:relative;
        span{
          line-height:45px;
        }
        span.pro-title{
          font-size:14px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:rgba(85,85,85,1);
          line-height:42px;
          position:absolute;
          left:55px;
        }
        span.pro-details{
          position:absolute;
          left:140px;
          font-size:14px;
          font-family:ArialMT;
          font-weight:400;
          color:rgba(117,117,117,1);
          line-height:42px;
        }
      }
    }
  }
  .product{
    width:100%;
    margin:0 auto;
    padding-top:30px;
     position: relative;
  }
  .tableDot{
    position: relative;
    img{
      position: absolute;
      top:-65px;
      left:15px;
    }
  }

  .tableDot:after{
      content:"";
      display:inline-block;
      width:3px;
      height:49px;
      float: left;
      background:rgba(242,242,242,1);
      position:absolute;
      top:-49px;
      left:21px;
  }
}

</style>
