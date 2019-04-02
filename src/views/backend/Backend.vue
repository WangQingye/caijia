<template>
  <el-container class="backend">
    <el-header>
      <back-header></back-header>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu
          :default-active="this.$route.fullPath.slice(1)"
          class="aside-menu"
          :router="true"
          @select="onMenuSelect"
          :collapse="menuCollapse"
          ref="asideMenu"
        >
          <el-menu-item
            index="backend"
            :style="!menuCollapse?'padding:0 75px':''"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="trace">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">溯源数据管理</span>
            </template>
            <!--
              typeCode: {
                1:超管,
                2:农企,
                3:检测,
                4:仓储,
                5:物流

                6:保险
              }
             -->
            <el-menu-item
              v-if="this.$store.state.userInfo.typeCode == 2"
              index="codemana"
            >批次号管理</el-menu-item>
            <el-menu-item
              v-if="this.$store.state.userInfo.typeCode == 4"
              index="storemana"
            >入库信息管理</el-menu-item>
            <el-menu-item
              v-if="this.$store.state.userInfo.typeCode == 2"
              index="tagmana"
            >溯源标签管理</el-menu-item>
            <el-menu-item
              v-if="this.$store.state.userInfo.typeCode == 1"
              index="tagverify"
            >溯源标签审核</el-menu-item>
            <el-menu-item
              v-if="this.$store.state.userInfo.typeCode == 1"
              index="insurancemana"
            >产品保险管理</el-menu-item>
            <el-menu-item
              v-if="this.$store.state.userInfo.typeCode == 3"
              index="verifyfill"
            >检测信息填报</el-menu-item>
            <el-menu-item
              v-if="this.$store.state.userInfo.typeCode == 2"
              index="stockoutfill"
            >出库信息填报</el-menu-item>
            <el-menu-item
              v-if="this.$store.state.userInfo.typeCode == 5"
              index="transfill"
            >物流信息填报</el-menu-item>
          </el-submenu>
          <el-submenu
            index="account"
            v-if="this.$store.state.userInfo.companyAccount || this.$store.state.userInfo.typeCode == 1"
          >
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">账号管理</span>
            </template>
            <el-menu-item
              v-if="this.$store.state.userInfo.typeCode == 1"
              index="companymana"
            >企业管理</el-menu-item>
            <el-menu-item
              v-if="this.$store.state.userInfo.companyAccount"
              index="accountmana"
            >子账号管理</el-menu-item>
          </el-submenu>
          <el-submenu
            index="info"
            v-if="this.$store.state.userInfo.typeCode == 1"
          >
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span slot="title">资讯管理</span>
            </template>
            <el-menu-item index="infomana">资讯列表</el-menu-item>
          </el-submenu>

          <el-submenu
            index="labelmana"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">溯源标签管理</span>
            </template>
            <el-menu-item
              index="labelspecmana"
            >标签规格管理</el-menu-item>
            <el-menu-item
              index="labelgeneration"
            >标签生成</el-menu-item>
          </el-submenu>

          <i
            :class=" menuCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"
            @click="menuCollapse = !menuCollapse"
            :style="'margin-top:50px;font-size:10px;color:#2292DD'"
          >{{menuCollapse ? '' : ' 折叠菜单'}}</i>
        </el-menu>
      </el-aside>
      <el-main>
        <el-card class="back-main">
          <div slot="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/backend' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item
                v-for="(path, index) in paths"
                :key="index"
              >{{path}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <router-view v-if="afterTestLogin"></router-view>
        </el-card>
      </el-main>
    </el-container>
    <el-dialog
      :visible.sync="this.$store.state.showPkDialog"
      width="30%"
      :show-close="false"
    >
      <p slot="title">
        此操作需要二级密码
      </p>
      <el-input
        v-model="privateKey"
        placeholder="请输入二级密码"
        type="password"
      ></el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="closePkDialog">取 消</el-button>
        <el-button
          type="primary"
          @click="savePrivateKey"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
// @ is an alias to /src
import BackHeader from "@/components/BackHeader.vue";
export default {
  name: "backend",
  data: () => {
    return {
      menuCollapse: false,
      pathName: {
        trace: "溯源数据管理",
        codemana: "批次号管理",
        transfill: "物流信息填报",
        verifyfill: "检测信息填报",
        stockoutfill: "出库信息填报",
        storemana: "入库信息管理",
        tagmana: "溯源标签管理",
        tagverify: "溯源标签审核",
        insurancemana:'产品保险管理',
        account: "账号管理",
        companymana: "企业管理",
        accountmana: "子账号管理",
        info: "资讯管理",
        infomana: "资讯列表",
        labelmana:'溯源标签管理',
        labelspecmana:'标签规格管理',
        labelgeneration:'标签生成'
      },
      paths: [],
      privateKey: "",
      afterTestLogin: false
    };
  },
  created() {
    this.testLogin();
  },
  mounted() {},
  methods: {
    onMenuSelect(index, indexPath) {
      this.paths = [];
      indexPath.forEach(element => {
        this.paths.push(this.pathName[element]);
      });
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
      if (!this.$store.state.userInfo.id) {
        let res = await this.$fetch("/user/automaticLogin", {}, "GET", "user");
        if (res.code == 0) {
          this.$store.commit("saveUserInfo", res.data);
        } else {
          this.$store.commit("clearUserInfo");
          this.$router.push({
            path: "/login"
          });
        }
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
  background: rgb(248, 248, 248);
}
.aside-menu {
  margin: 20px 0 0 20px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
}
.back-main {
  min-height: 750px;
}
</style>