<template>
    <div class="news">
        <div class="nav">
            <img  src="@/assets/imgs/bj1.png" >
        </div>
        <div class="box">
            <div class="green-div">
                <p>NEWS</p>
            </div>
            <div class="news-container">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>新闻中心</el-breadcrumb-item>
                    <el-breadcrumb-item>信链资讯</el-breadcrumb-item>
                    <el-breadcrumb-item>媒体查询</el-breadcrumb-item>
                </el-breadcrumb>
                <el-tabs :tab-position="tabPosition" style="height: 200px;">
                    <el-tab-pane label="新闻动态">用户管理</el-tab-pane>
                    <el-tab-pane label="信链资讯">配置管理</el-tab-pane>
                    <el-tab-pane label="媒体查询">角色管理</el-tab-pane>
                </el-tabs>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tabPosition: 'left'
        }
    }
}
</script>
<style lang="scss" >
.news{
    .nav{
        width:100%;
        min-width:1200px;
    }
    .box{
        width:1200px;
        margin:0 auto;
        position: relative;
        top:-323px;
        background-color:#fff;
        .green-div{
            width:240px;
            height:120px;
            background-color:rgba(57,172,95,1);
            position: absolute;
            top:-45px;
            padding-top:90px;
            text-align:left;
            p{
                margin-left:30px;
                font-size:32px;
                font-family:MicrosoftYaHeiLight;
                font-weight:normal;
                color:rgba(255,255,255,1);
            }
        }
        .news-container{
            position: relative;
            top:39px;
            clear: both;
            .el-breadcrumb{
                height:40px;
                position:absolute;
                left:262px;
                span{
                    font-weight:bold;
                    font-size:14px;
                    color:rgba(57,172,95,1);
                }
                .el-icon-arrow-right:before{
                    color:rgba(57,172,95,1);
                }
            }
            .el-tabs{
                position: relative;
                top:50px;
                background-color:#fff;
            }
        }
        .el-tabs__item{
            text-align: left;
            line-height: 38px;
            width:240px;
            color:rgba(153,153,153,1);
        }
        .is-active{
            font-weight:bold;
            color:rgba(57,172,95,1);
            background-color:rgba(223,244,225,1);
        }
    }
}

</style>
