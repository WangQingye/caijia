<template>
  <div class="new-item">
    <p class="new-title">{{data.newsTitle}}</p>
    <p class="new-text">{{getNewsDesc(data.newsContent)}}</p>
    <p class="new-time">{{data.publishTime}}</p>
  </div>
</template>

<script>
export default {
  name: "new-item",
  data() {
    return {};
  },
  props: {
    data: {
      default: () => {
        return {};
      },
      type: Object
    }
  },
  methods: {
    getNewsDesc(content) {
      var reg = new RegExp("(<p>).+?(?=</p>)");
      if (reg.exec(content)) return reg.exec(content)[0].slice(3);
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.new-item {
  text-align: left;
  border-bottom: 1px solid rgb(226, 226, 226);
  padding: 5px 0;
  .new-title {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .new-text {
    color: #999;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .new-time {
    color: #999;
    text-align: right;
  }
}
</style>
