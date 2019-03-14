<template>
  <div class="codeMana">
    <div v-if="!showAddInfo">
      <p class="text">状态</p>
      <el-select
        v-model="searchStatus"
        placeholder="请选择资讯类型"
        class="search-input"
      >
        <el-option
          v-for="item in statusTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <p class="text">资讯类型</p>
      <el-select
        v-model="searchType"
        placeholder="请选择资讯类型"
        class="search-input"
      >
        <el-option
          v-for="item in infoTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getCodeList(1,true)"
      >搜索</el-button>
      <el-button
        type="warning"
        @click="resetSearch"
      >重置</el-button>
      <el-row class="mana-buttons">
        <el-button
          type="primary"
          @click="addInfo"
        >添加</el-button>
      </el-row>
      <el-table
        ref="codeTable"
        :data="codeData"
        style="width: 100%"
      >
        <el-table-column
          v-for="(item,index) in labels"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          show-overflow-tooltip
          :width="item.width || 160"
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="item.prop == 'newsStatus'">
              {{scope.row.newsStatus == 1 ? '启用中' : '未启用'}}
            </p>
            <p v-else>
              {{scope.row[item.prop]}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="功能操作"
          width="auto"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="addInfo(scope.row.id)"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              @click="manaInfo(scope.row.id, scope.row.newsStatus == 1 ? 2 : 1)"
              type="text"
              size="small"
            >{{scope.row.newsStatus == 1 ? '停用' : '启用'}}</el-button>
            <el-button
              type="text"
              size="small"
              @click="manaInfo(scope.row.id, 3)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="dataTotalLength"
        @page-change="pageChange"
      ></pagination>
    </div>
    <div v-if="showAddInfo">
      <add-info @back="addBack" :editId="editId"></add-info>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import AddInfo from "./AddInfo.vue";
import PageMixin from "@/assets/js/pageMixin";
export default {
  mixins: [PageMixin],
  data() {
    return {
      searchType: "",
      searchStatus: "",
      showAddInfo: false,
      codeData: [],
      labels: [
        {
          name: "状态",
          prop: "newsStatus"
        },
        {
          name: "资讯类型",
          prop: "newsType"
        },
        {
          name: "标题",
          prop: "newsTitle",
          width: "auto"
        },
        {
          name: "内容来源",
          prop: "newRm"
        },
        {
          name: "发布时间",
          prop: "publishTime"
        },
        {
          name: "修改时间",
          prop: "updateTime"
        }
      ],
      infoTypes: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "新闻动态",
          value: "1"
        },
        {
          label: "信链资讯",
          value: "2"
        },
        {
          label: "媒体视角",
          value: "3"
        }
      ],
      statusTypes: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "启用",
          value: "1"
        },
        {
          label: "未启用",
          value: "2"
        }
      ],
      editId: null
    };
  },
  mounted() {
    this.getCodeList(1);
  },
  methods: {
    /* 获取批次号列表 */
    async getCodeList(page, isFromSearch) {
      if (isFromSearch) page = 1;
      let res = await this.$fetch(
        "/newsController/queryNewsPage",
        {
          newsStatus: this.searchStatus,
          newsType: this.searchType,
          limit: this.pageLimit,
          page: page
        },
        "POST"
      );
      if (res.code == 0) {
        this.codeData = res.data.data;
        this.dataTotalLength = res.data.countSize;
      }
    },
    resetSearch() {
      this.searchType = "";
      this.searchStatus = "";
      this.getCodeList(1);
    },
    addInfo(id) {
      // 有可能会传入事件对象，所以用类型来判断
      this.editId = typeof id == 'number' ? id : null;
      this.showAddInfo = true;
    },
    addBack(needFresh) {
      this.showAddInfo = false;
      if (needFresh) this.resetSearch();
    },
    async manaInfo(id, flag) {
      let res = await this.$fetch(
        "/newsController/operNewsStopOrStart",
        {
          id,
          operStatus: flag
        },
        "POST"
      );
      this.$message.success('操作成功');
      this.resetSearch();
    }
  },
  components: {
    Pagination,
    AddInfo
  }
};
</script>
<style lang="scss" scoped>
.codeMana {
  text-align: left;
}
.text {
  font-size: 16px;
  display: inline-block;
}
.search-input {
  width: 200px;
  margin: 0 20px;
}
.mana-buttons {
  margin: 20px 0;
}
.addCodeForm {
  width: 400px;
  margin: 20px auto;
}
.title {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
