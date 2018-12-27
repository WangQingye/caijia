<template>
  <div>
    子路由1
    <p>接口示例：</p>
    <p>{{`今日成都温度：${temperature}度`}}</p>
  </div>
</template>

<script>
// import fetch from "@/assets/js/Fetch.js";
export default {
  data() {
    return {
      temperature: "26"
    };
  },
  mounted() {
    // this.getTem();
  },
  methods: {
    // async getTem() {
    //   let data = await fetch('/weather', {
    //     location: "成都",
    //     output: "json",
    //     ak: 'TueGDhCvwI6fOrQnLM0qmXxY9N0OkOiQ'
    //   });,
    //   console.log(data);
    // }
  }
};
</script>