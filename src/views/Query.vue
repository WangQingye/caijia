<template>
  <div class="query">
    <my-header></my-header>
    <div class="query-router">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MyHeader from "@/components/Header.vue";

export default {
  name: "query",
  components: {
    MyHeader
  }
};
</script>
<style>
.query-router {
  width: 1200px;
  min-height: 730px;
  display: block;
  margin: 30px auto;
  background: white;
  padding: 50px 40px 0 40px;
}
</style>