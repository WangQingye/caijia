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
          <li v-for="(pro,index) in products " :key="index">
            <span class="pro-title">{{pro.title}}</span>
            <span class="pro-details">{{pro.details}}</span>
          </li>
        </ul>
      </div>
      <head-line :text="'产品溯源'" :text02="'PRODUCT  TRACEABILITY'"></head-line>
      <div class="product">
        <product-table :listData="productDetails" v-for="(item,index) in productDetails " :key="index" :productIndex="index"></product-table>
      </div>
      <up-to-now></up-to-now>
    </div>
</template>

<script>
import HeadLine from '@/components/HeadLine.vue'
import ProductTable from '@/components/ProductTable.vue'
import UpToNow from '@/components/UpToNow.vue'
import goods from "@/assets/imgs/goods.jpg";
export default {
  name: "phone",
  data() {
    return {
      products:[
        {
          title:'产品编号',
          details:'12545645648323564545'
        },
        {
          title:'产品品牌',
          details:'徐香猕猴桃'
        },
        {
          title:'单果重量',
          details:'75-135g'
        },
        {
          title:'产品等级',
          details:'一等'
        },
        {
          title:'采摘时间',
          details:'2018年2月30日'
        },
        {
          title:'原产地',
          details:'四川。蒲江'
        },
        {
          title:'生产单位',
          details:'成都猕猴桃基地'
        },
        {
          title:'农残指标',
          details:'承保公司'
        },
         {
          title:'承保单位',
          details:'锦泰保险'
        },
         {
          title:'储藏条件',
          details:'0-10度条件下30天'
        }
      ],
      productDetails:[
        {
          time:'2012-03-02',
          details:'猕猴桃嫁接苗培育----选生长充实，髓部较小的接穗，要求接穗大小与砧木相同，用塑料薄膜嫁接包扎，露出接穗芽即可',
          imagineSrc:goods
        },
        {
          time:'2017-10-20',
          details:'施肥管理----沿植株横向开沟，施入腐熟的有机肥，萌芽前追肥，结合灌水，尿素液进行根外追肥',
          imagineSrc:goods
        },
        {
          time:'2018-09-02',
          details:'猕猴桃嫁接苗培育----选生长充实，髓部较小的接穗，要求接穗大小与砧木相同，用塑料薄膜嫁接包扎，露出接穗芽即可',
          imagineSrc:goods
        },
        {
          time:'2018-09-05',
          details:'猕猴桃分拣装箱----沿植株横向开沟，施入腐熟的有机肥，萌芽前追肥，结合灌水，尿素液进行根外追肥',
          imagineSrc:goods
        },
        {
          time:'2018-09-20',
          details:'猕猴桃嫁接苗培育----选生长充实，髓部较小的接穗，要求接穗大小与砧木相同，用塑料薄膜嫁接包扎，露出接穗芽即可',
          imagineSrc:goods
        }
      ]
    };
  },
  props: {
  },
  methods: {
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
    width: 750px;
    margin: 0 auto;
    .banner-wap{
      width:375px;
      margin:0 auto;
    }
}
.map{
  width:375px;
  margin:0 auto;
  position:relative;
  .map-wap{
    width:375px;
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
  width:375px;
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
        line-height:55px;
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
        line-height:55px;
      }
    }
  }
}
.product{
  width:311px;
  margin:0 auto;
}

</style>
