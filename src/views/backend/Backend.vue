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
            <span slot="title" >首页</span>
          </el-menu-item>
          <el-submenu index="trace">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">溯源数据管理</span>
            </template>
            <el-menu-item index="codemana">批次号管理</el-menu-item>
            <el-menu-item index="storemana">入库信息管理</el-menu-item>
            <el-menu-item index="tagmana">溯源标签管理</el-menu-item>
            <el-menu-item index="tagverify">溯源标签审核</el-menu-item>
            <el-menu-item index="sourcefill">溯源内容填报</el-menu-item>
          </el-submenu>
          <el-menu-item
            index="2"
            disabled
          >
            <i class="el-icon-document"></i>
            <span slot="title">账号管理</span>
          </el-menu-item>
          <el-menu-item
            index="3"
            disabled
          >
            <i class="el-icon-setting"></i>
            <span slot="title">资讯管理</span>
          </el-menu-item>
        <i :class=" menuCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"  @click="menuCollapse = !menuCollapse" :style="'margin-top:50px;font-size:10px'">{{menuCollapse ? '' : ' 折叠菜单'}}</i>
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
          <router-view></router-view>
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
      menuCollapse: false,
      pathName: {
        trace: "溯源数据管理",
        codemana: "批次号管理",
        sourcefill: "溯源内容填报",
        storemana: "入库信息管理",
        tagmana: "溯源标签管理",
        tagverify: "溯源标签审核"
      },
      paths: []
    };
  },
  mounted() {
    console.log(this.$store.state);
  },
  methods: {
    onMenuSelect(index, indexPath) {
      this.paths = [];
      indexPath.forEach(element => {
        this.paths.push(this.pathName[element]);
      });
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
  min-height: 130px;
  // background: #87CEFA;
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