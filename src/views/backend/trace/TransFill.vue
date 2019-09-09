<template>
  <div class="codeMana">
    <div v-if="!showAddCode">
      <p class="text">批次号</p>
      <el-input
        class="search-input"
        v-model="searchCode"
        placeholder="请输入要搜索的批次号"
      ></el-input>
      <p class="text">箱码</p>
      <el-input
        class="search-input"
        v-model="searchBoxNum"
        placeholder="请输入要搜索的箱码"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getCodeList(1,true)"
      >搜索</el-button>
      <!-- <el-row class="mana-buttons">
        <el-button
          type="primary"
          @click="showSourceFill"
        >填报信息</el-button>
      </el-row> -->
      <el-table
        ref="codeTable"
        :data="codeData"
        style="width: 100%; margin-top:40px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-for="(item,index) in labels"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          show-overflow-tooltip
          :width="item.width||'160'"
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="!scope.row[item.prop]">无</p>
            <p v-else-if="item.prop == 'endBoxNum'"> {{scope.row.endBoxNum-scope.row.startBoxNum+1}}</p>
            <p v-else>{{scope.row[item.prop]}}</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="showSourceFill(scope.row)"
              type="text"
              size="small"
              :disabled="Boolean(scope.row.isComplete)"
            >{{ scope.row.isComplete ? '填报完成':'填报物流' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="dataTotalLength"
                @page-change="pageChange"
        @size-change="sizeChange"
        :current-page="currentPage"
      ></pagination>
    </div>
    <div v-show="showAddCode">
      <add-logistics
      ref="logisticOut"
        @back="logisticBack"
        :rowData="nowRow"
      ></add-logistics>
    </div>
  </div>
</template>

<script>
// import fetch from "@/assets/js/Fetch.js";
import Pagination from "@/components/Pagination.vue";
import PageMixin from "@/assets/js/pageMixin";
import AddLogistics from "@/components/AddLogistics.vue";
import AddStockOut from "@/components/AddStockOut.vue";
import AddVerify from "@/components/AddVerify.vue";
export default {
  mixins: [PageMixin],
  data() {
    return {
      searchCode: "",
      searchBoxNum: "",
      userType: 3,
      showAddCode: false,
      codeData: [],
      labels: [
        {
          name: "农企",
          prop: "name"
        },
        {
          name: "批次号",
          prop: "batchCode"
        },
        {
          name: "品种",
          prop: "varietyName"
        },
        {
          name: "箱数",
          prop: "endBoxNum"
        },
        {
          name: "溯源类别",
          prop: "action"
        },
        {
          name: "描述",
          prop: "remark",
          width: "160"
        },
        {
          name: "时间",
          prop: "createTime"
        },
        {
          name: "责任人",
          prop: "username"
        }
      ],
      nowRow: {}
    };
  },
  mounted() {
    this.getCodeList(1);
  },
  methods: {
    async getCodeList(page, isFromSearch) {
      if (isFromSearch) page = 1;
      let res = await this.$fetch("/list/queryTransfers", {
        batchCode: this.searchCode,
        boxNum: this.searchBoxNum,
        page: page,
        limit: this.pageLimit
      });
      if (res.code == 0) {
        this.codeData = res.data.data;
        this.dataTotalLength = res.data.countSize;
      }
    },
    showSourceFill(row) {
      this.showAddCode = true;
      this.nowRow = row;
      this.$refs.logisticOut.getBoxNum(row.id);
    },
    handleSelectionChange() {
      console.log(1);
    },
    logisticBack(){
      this.showAddCode = false;
      this.getCodeList(1);
    },
    onAddSubmit() {}
  },
  components: {
    Pagination,
    AddLogistics,
    AddStockOut,
    AddVerify
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
</style>
