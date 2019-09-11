<template>
  <el-container class="backend">

    <el-aside width="auto">
      <el-menu
        :default-active="defaultPath"
        class="aside-menu"
        :router="true"
        @select="onMenuSelect"
        ref="asideMenu"
      >
        <img style="margin: 60px 0 100px 0" src="@/assets/imgs/logo-1.png"/>
        <el-submenu index="stat">
          <template slot="title">
            <i class="el-icon-s-data"></i>
            <span slot="title">数据统计</span>
          </template>
          <el-menu-item index="datadetail">详细数据</el-menu-item>
          <!-- <el-menu-item index="datachart">图表</el-menu-item> -->
        </el-submenu>
        <el-menu-item index="membermana"><i class="el-icon-user-solid"></i>采价人管理</el-menu-item>
        <el-submenu index="datamana">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span slot="title">数据管理</span>
          </template>
          <el-menu-item index="placemana">采价点管理</el-menu-item>
          <el-menu-item index="varitymana">采价品种管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <back-header></back-header>
      </el-header>
      <el-main>
        <el-card class="back-main">
          <div slot="header">
            <p class="back-title">{{$store.state.paths[$store.state.paths.length - 1]}}</p>
          </div>
          <router-view v-if="afterTestLogin"></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import BackHeader from "@/components/BackHeader.vue";
export default {
  name: "backend",
  data: () => {
    return {
      pathName: {
        stat: "数据统计",
        datadetail: "详细数据",
        datachart: "图表",
        membermana: "采价人管理",
        datamana: "数据管理",
        placemana: "采价点管理",
        varitymana: "采价品种管理"
      },
      pathChain: {
        datadetail: "stat",
        datachart: "stat",
        membermana: "",
        placemana: "datamana",
        varitymana: "datamana"
      },
      paths: [],
      privateKey: "",
      afterTestLogin: true,
      defaultPath: "datadetail"
    };
  },
  created() {
    this.defaultPath = this.$route.path.replace("/", "");
    this.paths = [
      this.pathName[this.pathChain[this.defaultPath]] ||
        this.pathName[this.defaultPath],
      this.pathName[this.defaultPath]
    ];
    this.paths = [...new Set(this.paths)];
    this.$store.commit("setPaths", this.paths);
    this.testLogin();
  },
  mounted() {},
  methods: {
    onMenuSelect(index, indexPath) {
      this.paths = [];
      indexPath.forEach(element => {
        this.paths.push(this.pathName[element]);
      });
      this.$store.commit("setPaths", this.paths);
    },
    closePkDialog() {
      this.$store.commit("setPkDialogShow", false);
    },
    savePrivateKey() {
      try {
        let sign = api.apiSign(
          { a: 1 },
          api.apiDecESk(this.privateKey, this.$store.state.userInfo.esk)
        );
        var rr = api.apiVerify(
          { a: 1 },
          api.apiGetPk(this.$store.state.userInfo.pk),
          sign
        );
        if (rr !== 0) {
          this.$message.error("二级密码错误");
          return;
        }
      } catch (error) {
        this.$message.error("二级密码错误");
        return;
      }
      this.$store.commit(
        "savePrivateKey",
        api.apiDecESk(this.privateKey, this.$store.state.userInfo.esk)
      );
      this.$store.commit("setPkDialogShow", false);
      this.$store.state.pkCallBack();
    },
    async testLogin() {
      if (!this.$store.state.userInfo.userId) {
        // let res = await this.$fetch("/user/automaticLogin", {}, "GET", "user");
        // if (res.code == 0) {
        //   this.$store.commit("saveUserInfo", res.data);
        // } else {
        //   this.$store.commit("clearUserInfo");
        // }
        this.$router.push({
          path: "/login"
        });
        this.afterTestLogin = true;
      } else {
        this.afterTestLogin = true;
      }
    }
  },
  components: {
    BackHeader
  }
};
</script>
<style lang="scss" scoped>
.backend {
  width: 100%;
  min-height: 100vh;
  background: #f2f2f2;
}
.aside-menu {
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
  min-height: calc(100vh - 1.3vh);
  width: 250px;
}
.back-main {
  min-height: 89vh;
  .back-title {
    text-align: left;
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
    margin-left: 20px;
  }
}
</style>