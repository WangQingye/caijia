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
                    <el-breadcrumb-item>新闻动态</el-breadcrumb-item>
                    <!--<el-breadcrumb-item>媒体查询</el-breadcrumb-item> -->
                </el-breadcrumb>
                <el-tabs :tab-position="tabPosition">
                    <el-tab-pane label="新闻动态">
                            <div class="newsActive">
                                <div class="active-content">
                                    <ul>
                                        <li  v-for="(item,index) in newsList" :key="index">
                                            <p class="new-name">{{item.title}}</p>
                                            <div class="new-text">
                                                <p>{{item.text}}</p>
                                                <span>{{item.time}}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="2">
                            </el-pagination>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="信链资讯">配置管理</el-tab-pane>
                    <el-tab-pane label="媒体查询">角色管理</el-tab-pane> -->
                </el-tabs>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tabPosition: 'left',
            newsList:[
                {
                    title:'“标签连接中国 服务千县万企”走进黔西南州 ——中国物品...',
                    text:'为深入贯彻习近平新时代中国特色社会主义思想，特别是习近平总书记关于质量发展和脱贫攻坚工作的重要指示精神，2018年8月14日...',
                    time:'2018-01-27',
                    route:'/new1'
                },
                {
                    title:'福建省地方标准《食品质量安全追溯码编码技术规范》',
                    text:'为了深入实施福建省地方标准《食品质量安全追溯码编码技术规范》，扎实推进全省食品安全“一品一码”全过程追溯体系建设，...',
                    time:'2018-01-27',
                    route:'/new2'
                },
                {
                    title:'“标签连接中国 服务千县万企”走进黔西南州 ——中国物品...',
                    text:'为深入贯彻习近平新时代中国特色社会主义思想，特别是习近平总书记关于质量发展和脱贫攻坚工作的重要指示精神，2018年8月14日...',
                    time:'2018-01-27',
                    route:'/new3'
                },
                {
                    title:'福建省地方标准《食品质量安全追溯码编码技术规范》',
                    text:'为了深入实施福建省地方标准《食品质量安全追溯码编码技术规范》，扎实推进全省食品安全“一品一码”全过程追溯体系建设，...',
                    time:'2018-01-27',
                    route:'/new4'
                },
                {
                    title:'福建省地方标准《食品质量安全追溯码编码技术规范》',
                    text:'为了深入实施福建省地方标准《食品质量安全追溯码编码技术规范》，扎实推进全省食品安全“一品一码”全过程追溯体系建设，...',
                    time:'2018-01-27',
                    route:'/new4'
                }
            ]

        }
    }
}
</script>
<style lang="scss" >
.news{
    height:1400px;
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
                height:827px;
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
        .newsActive{
            width:100%;
            position:relative;
        }
        .active-content{
            height:100%;
            padding-left:30px;
        }
        .active-content ul{
            width:863px;
            border-top:1px solid rgba(242,242,242,1);
            padding-bottom:15px;
            margin-bottom:20px;
        }
        .active-content ul li{
            position:relative;
            cursor:pointer;
            margin-top:15px;
            border-bottom:1px solid rgba(242,242,242,1);
        }
        .active-content ul li p.new-name{
            width:450px;
            height:16px;
            font-size:16px;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            color:rgba(85,85,85,1);
            margin-bottom:17px;
            text-align: left;
        }
        .active-content ul li div.new-text{
            width:100%;
            height:46px;
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:30px;
            margin-bottom:20px;
            p{
                text-align: left;
            }
        }
        .active-content ul li div.new-text span{
            position: absolute;
            bottom:5px;
            right:20px;
            float:right;
            margin-top:-17px;
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(117,117,117,1);
        }
        .el-pagination{
            float:right;
            ul.el-pager li{
                background-color:#fff;
                border:1px solid rgba(242, 242, 242, 1);
                border-radius:4px;
            }
        }
    }
}

</style>
