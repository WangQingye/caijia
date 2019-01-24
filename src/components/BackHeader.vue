<template>
  <div class="back-header">
    <p class="logo"><i class="el-icon-setting"></i> 电科信链溯源后台管理系统</p>
    <div class="header-right">
      <router-link
        to="/"
        class="back-main"
      >
        <p><i class="el-icon-menu"></i> 回到首页</p>
      </router-link>
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{this.$store.state.userInfo.account}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <p class="user-company">{{this.$store.state.userInfo.companyName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "back-header",
  data() {
    return {};
  },
  props: {},
  methods: {},
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.back-header {
  // background: red;
  min-width: 1000px;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 8px;
}
.logo {
  padding-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.header-right {
    display: flex;
  padding-top: 10px;

}
.back-main {
  padding-top: 10px;
  font-size: 14px;
  margin-right: 50px;
}
.user-info {
    .el-dropdown-link{
        cursor: pointer;
        font-size: 16px;
    }
    .user-company {
        color: #777;
        font-size: 12px;
        text-align: left;
    }
}
</style>
