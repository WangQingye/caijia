<template>
    <div class="table-box">
        <el-row :gutter="20" class="table-row">
            <el-col :span="4" class="table-dot">
                <img class="dot" src="@/assets/imgs/yuan2.png">
            </el-col>
            <el-col :span="16">
                <p class="time">{{listData[productIndex].time}}</p>
                <p class="details">{{listData[productIndex].details}}</p>
            </el-col>
            <el-col :span="4" class="goodsImg">
                <img class="goods" :src='listData[productIndex].imagineSrc'>
            </el-col>
        </el-row>
    </div>

</template>
<script>
export default{
    data(){
        return {

        }
    },
    props:{
        listData:{
            type:Array,
            default:()=>{
                return[
                    {
                        time:'时间',
                        details:'产品描述',
                        imagineSrc:''
                    }
                ];
            }
        },
        productIndex:{

            default:()=>{
                return []
            }
        }
    },
    mounted(){

    }
}
</script>

<style lang="scss">
.table-box{
    width:375px;
    height:191px;
    margin:0 auto;
    margin-top:-25px;
}
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
.table-row{
    position:relative;
}
.table-dot:after{
    content:"";
    display:inline-block;
    width:3px;
    height:150px;
    float: left;
    background:rgba(242,242,242,1);
    position:absolute;
    top:19px;
    left:-14px;
}
.dot{
    position:absolute;
    left:-21px;
}
.time{
    font-size:18px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    color:rgba(85,85,85,1);
    text-align:left;
}
.details{
    margin-top:15px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(117,117,117,1);
    line-height:22px;
    text-align:left;
}
.goodsImg{
    position: relative;
    .goods{
        border-radius:50%;
        width:70px;
        height:70px;
        position:absolute;
        top:32px;
        left:18px;
    }

}


</style>