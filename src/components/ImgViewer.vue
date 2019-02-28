<template>
  <el-dialog
    title="图片展示"
    :visible.sync="showFlag"
    width='1000px'
  >
    <img :style="'display:block;max-width:800px;margin: 0 auto;margin-top:20px'" v-for="(img, index) in imgList" :key="index" :src="img" alt="">
  </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            showFlag: false
        }
    },
    props: {
        imgList: {
            default: () => {
                return 'http://www.33lc.com/article/UploadPic/2012-7/201272713561573668.jpg,http://www.33lc.com/article/UploadPic/2012-7/201272713562117180.jpg'.split(',')
            }
        },
    },
    methods: {
        show() {
            this.showFlag = true;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.show-img {
    display: block;
    width: 1000px;
}
</style>
