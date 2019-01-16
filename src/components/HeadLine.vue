<template>
  <div class="head-line">
    <p class="title-text">{{text}}</p>
    <p class="title-text02">{{text02}}</p>
    <P class="title-bg"></P>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
      text:{
          type:String,
          default:()=>{
              return "标题"
          }
      },
      text02:{
          type:String,
          default:()=>{
              return "英文标题"
          }
      }
  },
  methods: {
  },
  mounted (){
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.head-line{
    width:375px;
    margin:0 auto;
    margin-bottom:64px;

}
.title-text{
    font-size:15px;
    font-family:SourceHanSerifCN-SemiBold;
    font-weight:300;
    color:rgba(85,85,85,1);
    margin-bottom:8px;
    margin-top:21px;
}
.title-text02{
    font-size:10px;
    font-family:MicrosoftYaHeiLight;
    font-weight:300;
    color:rgba(187,187,187,1);
}
.title-bg{
    width:30px;
    height:4px;
    margin:0 auto;
    margin-top:24px;
    background:rgba(57,172,95,1);
}
</style>