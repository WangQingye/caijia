<template>
  <div class="subpage">
    <router-link
      tag="li"
      to="/"
    >
      <a>返回首页</a>
    </router-link>
    <p>子页面头部</p>
    <router-link
      to="/subpage"
    >
      <a>子路由1</a>
    </router-link>
    <router-link
      to="/page2"
    >
      <a>子路由2</a>
    </router-link>
    <div class="subpage-router">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "subpage"
};
</script>
<style>
.subpage-router {
  width: 100%;
  min-height: 130px;
  background: gray;
}
</style>