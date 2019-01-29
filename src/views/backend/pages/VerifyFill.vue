<template>
  <div class="codeMana">
    <div v-if="!showAddCode">
      <p class="text">批次号</p>
      <el-select
        v-model="searchCode"
        placeholder="请选择要搜索的批次号"
        style="margin:0 20px;"
      >
        <el-option
          v-for="(code,index) in codes"
          :key="index"
          :label="code"
          :value="code"
        ></el-option>
      </el-select>
      <p class="text">箱码</p>
      <el-input
        class="search-input"
        v-model="searchBoxNum"
        placeholder="请输入要搜索的箱码"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        disabled
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
        style="width: 100%;margin-top:40px"
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
            <p v-if="item.prop == 'step'">
              {{calStatus(scope.row.step)}}
            </p>
            <p v-else-if="!scope.row[item.prop]">无</p>
            <p v-else>{{scope.row[item.prop]}}</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template
            slot-scope="scope"
            v-if="1< scope.row.step < 6"
          >
            <el-button
              @click="showSourceFill(scope.row)"
              type="text"
              size="small"
            >填报信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="codeData.length"
        :page-change="pageChange"
      ></pagination>
    </div>
    <div v-if="showAddCode">
      <add-verify
        v-if="userType == 3"
        @back="onFillBack"
        :rowData="nowRow"
      ></add-verify>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import AddLogistics from "@/components/AddLogistics.vue";
import AddStockOut from "@/components/AddStockOut.vue";
import AddVerify from "@/components/AddVerify.vue";
export default {
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
          prop: "companyName"
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
          name: "溯源状态",
          prop: "step"
        },
        {
          name: "描述",
          prop: "remark",
          width: "auto"
        },
        {
          name: "报告",
          prop: "report"
        },
        {
          name: "时间",
          prop: "storeTime"
        },
        {
          name: "责任人",
          prop: "userName"
        }
      ],
      codes: ["001", "002"],
      nowRow: null
    };
  },
  mounted() {
    // this.getTem();
    this.getList();
  },
  methods: {
    async getList() {
      let res = await this.$fetch(
        "/check/noCheckList",
        {
          page: 1,
          limit: 5,
          companyCode: this.$store.state.userInfo.companyCode,
          typeCode: this.$store.state.userInfo.typeCode
        },
        "POST"
      );
      if (res.code == 0) {
        this.codeData = res.data.data;
      }
    },
    showSourceFill(row) {
      this.showAddCode = true;
      this.nowRow = row;
    },
    handleSelectionChange() {
      console.log(1);
    },
    manuCode() {
      console.log(1);
    },
    pageChange(page) {
      console.log(page);
    },
    onAddSubmit() {},
    onFillBack(flag) {
      this.showAddCode = false;
      if (flag) {
        this.getList();
      }
    },
    calStatus(step) {
      let text;
      switch (step) {
        case 1:
          text = "入库待审核";
          break;
        case 2:
          text = "入库审核完成";
          break;
        case 3:
          text = "检测完成";
          break;
        case 4:
          text = "申请标签待审核";
          break;
        case 5:
          text = "标签审核完成";
          break;
        case 6:
          text = "出库中";
          break;
        case 7:
          text = "出库完成";
          break;
      }
      return text;
    }
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
