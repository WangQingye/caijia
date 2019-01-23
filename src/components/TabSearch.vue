<template>
    <div class="tab-search">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="追溯码" name="first">
                <el-row :gutter="20">
                    <el-col :span="16">
                    <el-input v-model="input" maxlength="19" placeholder="输入产品追溯码进行查询"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <slider></slider>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="open"  icon="el-icon-search">搜索</el-button>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <div id='popContainer' @click="close" >
            <div class="modalBg">
                <img src="@/assets/imgs/bj-web.png">
                <head-line :text="'原产品'" :text02="'COUNTRY   OF  ORIGIN'"></head-line>
                <div class="mapImg">
                    <img class="map-web" src="@/assets/imgs/map-web.png" >
                    <div class="location" >
                    <img src="@/assets/imgs/Location.png">
                    <p>四川</p>
                    </div>
                </div>
                <head-line :text="'产品信息'" :text02="'PRODUCT INFORMATION'"></head-line>
                <div class="productMsg">
                    <ul class="ul1">
                        <li>
                            产品编号<span>1234678945613465</span>
                        </li>
                        <li>
                            产品品牌<span>徐香猕猴桃</span>
                        </li>
                        <li>
                            单果重量<span>75-135g</span>
                        </li>
                        <li>
                            产品等级<span>一等</span>
                        </li>
                        <li>
                            采摘时间<span>2018年2月30日</span>
                        </li>
                    </ul>
                    <ul class="ul2">
                        <li>
                            原产地<span>四川。蒲江</span>
                        </li>
                        <li>
                            生产单位<span>成都市猕猴桃基地</span>
                        </li>
                        <li>
                            农残指标<span>合格</span>
                        </li>
                        <li>
                            承包单位<span>锦泰保险</span>
                        </li>
                        <li>
                            储藏条件<span>0-10度条件下30天</span>
                        </li>
                    </ul>
                </div>
                <head-line :text="'产品溯源'" :text02="'PRODUCT  TRACEABILITY'"></head-line>
                <div class="product-list">
                    <el-row :gutter="20">
                        <el-col :span="12" :offset="6"  class="Dot">
                            <img src="@/assets/imgs/yuan1.png" alt="">
                        </el-col>
                    </el-row>
                    <product-table
                    :class="['goods-item',`item-${index+1}`, index%2==0 ?'goods-left':'goods-right']"
                    :listData="productDetails" v-for="(item,index) in productDetails "
                    :key="index" :productIndex="index">
                    </product-table>
                </div>


            </div>
        </div>
    </div>
</template>


<script>
import fetch from '@/assets/js/fetch.js'
import HeadLine from '@/components/HeadLine.vue'
import ProductTable from '@/components/ProductTable.vue'
import Slider from '@/components/Slider.vue'
import goods from "@/assets/imgs/goods.jpg"
export default{
    data(){
        return {
            activeName: 'first',
            input:'',
            tabValue: 0,
            stopValue:'',
            index:'',
            productDetails:[
                {
                time:'2012-03-02',
                details:'猕猴桃嫁接苗培育----选生长充实，髓部较小的接穗，要求接穗大小与砧木相同，用塑料薄膜嫁接包扎，露出接穗芽即可',
                imagineSrc:goods,
                index:1
                },
                {
                time:'2017-10-20',
                details:'施肥管理----沿植株横向开沟，施入腐熟的有机肥，萌芽前追肥，结合灌水，尿素液进行根外追肥',
                imagineSrc:goods,
                index:2
                },
                {
                time:'2018-09-02',
                details:'猕猴桃嫁接苗培育----选生长充实，髓部较小的接穗，要求接穗大小与砧木相同，用塑料薄膜嫁接包扎，露出接穗芽即可',
                imagineSrc:goods,
                index:3
                },
                {
                time:'2018-09-05',
                details:'猕猴桃分拣装箱----沿植株横向开沟，施入腐熟的有机肥，萌芽前追肥，结合灌水，尿素液进行根外追肥',
                imagineSrc:goods,
                index:4
                },
                {
                time:'2018-09-20',
                details:'猕猴桃嫁接苗培育----选生长充实，髓部较小的接穗，要求接穗大小与砧木相同，用塑料薄膜嫁接包扎，露出接穗芽即可',
                imagineSrc:goods,
                index:5
                }
            ]
        }
    },
    props:{

    },
    methods: {
        handleClick(tab, event) {
            //console.log(tab, event);
        },
        open(){
            var modelBox= document.getElementById("popContainer");
            modelBox.style.visibility="visible";
            modelBox.style.overflow="scroll"
            document.body.style.overflow="hidden";
            console.log(this.input)
            this.getData()

        },
        close(){
            var modelBox= document.getElementById("popContainer");
            modelBox.style.visibility="hidden";
            document.body.style.overflow="auto";
            this.input=""
        },
        async getData() {
            let data = await fetch(
                "/queryController/queryOriginActionByCode",
                {
                    inputCode:this.input
                },
                "get"
            );
            this.productDetails=data.data
            console.log(data)

        },


    },
    computed:{

    },
    watch: {

    },
    components: {
        HeadLine,
        ProductTable,
        Slider
  }
}

</script>

<style lang="scss" >

.main{
    .tab-search{
        position: absolute;
        bottom:160px;
        left:16%;
        width:1200px;
        margin:0 auto;
        background-color:#fff;
        padding:40px;
        .productMsg{
            display: flex;
            flex-direction: row;
            width: 1100px;
            height: 250px;
        }
        .productMsg ul{
            width:550px;
            height: 250px;
            li{
                height:42px;
                text-align:left;
                padding-left:70px;
                font-size:14px;
                font-family:MicrosoftYaHei-Bold;
                font-weight:bold;
                color:rgba(85,85,85,1);
                line-height:55px;
                border:1px solid rgba(242, 242, 242, 1);
                span{
                    font-family:ArialMT;
                    margin-left:20px;
                    font-weight:400;
                    color:rgba(117,117,117,1);
                }
            }
        }
    }
    .title-text{
        font-size:30px;
        font-family:SourceHanSerifCN-SemiBold;
        font-weight:300;
        color:rgba(85,85,85,1);
    }
    .title-text02{
        font-size:16px;
        font-family:MicrosoftYaHeiLight;
        font-weight:300;
        color:rgba(187,187,187,1);
    }
    .head-line{
        width:1000px;
        margin:0 auto;
        margin-bottom:64px;

    }

    .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .el-slider__runway{
        width: 100%;
        height:42px;
        background-color: #e4e7ed;
        border-radius: 3px;
        position: relative;
        top:-17px;
        cursor: pointer;
        vertical-align: middle;
    }

    .el-slider__bar {
        height:41px;
        background-color: #88D58E;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        position: absolute;
    }
    .el-slider__bar:after{
        content:"";
        color:#fff;
    }
    .el-slider__button-wrapper {
        height: 36px;
        width: 36px;
        position: absolute;
        z-index: 1001;
        top: 1px;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        background-color: transparent;
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        line-height: normal;
    }
    .el-slider__button {
        width: 30px;
        height: 36px;
        background-color: #88D58E;
        border: solid 2px #88D58E;
        border-radius: 3%;
        -webkit-transition: .2s;
        transition: .2s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .el-slider__button:after{
        content:">>>";
        display:inline-block;
        width:30px;
        height:26px;
        color:#fff;
        position:relative;
        top:10px;
    }
    .el-slider__button:hover{
        transform: scale(1)
    }
    .el-slider__button.dragging{
        transform: scale(1)
    }
    //遮罩层
    #popContainer{
        //overflow:scroll;
        visibility:hidden;
        position: fixed;
        top:0px;
        left:0px;
        width:100% ;
        height:100%;
        text-align: center;
        z-index: 2000;
        background-color:#333;
        background-color:rgba(85,85,85,.83);
        .modalBg{
            width:1200px;
            //height:2900px;
            margin:417px auto;
            background-color:#fff;

        }
    }

    .mapImg{
        width:100%;
        margin:0 auto;
        position:relative;
        .map-web{
            width:100%;
            margin:0 auto;
        }
        .location{
            position:absolute;
            bottom:340px;
            left:320px;
            img{
                position:relative;
                bottom:-12px;
            }
            p{
                font-size:16px;
                font-family:MicrosoftYaHei-Bold;
                font-weight:bold;
                color:rgba(85,85,85,1);
                line-height:52px;
            }
        }

    }
    .productMsg{
        width:1025px;
        margin:0 auto;
    }
    .product{
        width:1000px;
        margin:0 auto;
        margin-top:20px;
    }
    .table.box{
        width:100%;
    }
    .table-row{
        position:relative;
        .table-dot{
            position:absolute;
            left:200px;
        }
        .el-col-16{
            position:absolute;
            left:-88px;
        }
        .goodsImg{
            position:absolute;
            top:-26px;
            left:-275px;
            img{
                width:140px;
                height:140px;
            }
        }
    }
    .product-list{
        padding-top:30px;
        .Dot{
            position: relative;
            img{
                position: absolute;
                top:-65px;
                left:286px;
            }
        }
        .Dot:after{
            content:"";
            display:inline-block;
            width:3px;
            height:49px;
            float:left;
            background:rgba(242,242,242,1);
            position:absolute;
            top:-49px;
            left:292px;
        }
    }
    .goods-right div.table-row{
        .el-col-16{
            left:268px;
        }
        .goodsImg{
            left:544px;
        }
    }
}


</style>