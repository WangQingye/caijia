<template>
    <transition name="el-fade-in">
        <div id="UpToNow">
            <div class="goTo" v-show="toShow" @click="comeBack">UP TO NOW</div>
        </div>
    </transition>
</template>


<script>
export default{
    data(){
        return {
            scrollTop:'',
            toShow:false
        }
    },
    methods:{
        handleScroll(){
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if(this.scrollTop>1000){
                this.toShow=true
            }else{
                this.toShow=false
            }
        },
        comeBack(){
            let timer=null,_that=this;
            cancelAnimationFrame(timer)
            timer=requestAnimationFrame(function fn(){
                if(_that.scrollTop>0){
                _that.scrollTop-=50;
                document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
                timer=requestAnimationFrame(fn)
                }else {
                cancelAnimationFrame(timer);
                _that.toShow=false;
                }
            })
        }

    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed(){
        window.removeEventListener('scroll', this.handleScroll)
    }
}

</script>

<style lang="scss">
    .goTo{
        position:fixed;
        bottom:-2px;
        left:443px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(187,187,187,1);
        cursor: pointer;
    }

</style>