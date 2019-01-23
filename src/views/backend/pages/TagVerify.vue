<template>
  <div class="codeMana">
    <div v-if="!showAddCode">
      <p class="text">批次号</p>
      <el-input
        class="search-input"
        v-model="searchCode"
        placeholder="请输入要搜索的批次号"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        disabled
      >搜索</el-button>
      <el-table
        ref="codeTable"
        :data="codeData"
        style="width: 100%;margin-top:40px"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column> -->
        <el-table-column
          v-for="(item,index) in labels"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          show-overflow-tooltip
          :width="'160' || item.width"
          align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="manuCode(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.state == '审核通过'"
            >查看</el-button>
            <el-button
              type="text"
              size="small"
              v-else
              @click="showAuditConfirm(scope.row)"
            >审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="codeData.length"
        :page-change="pageChange"
      ></pagination>
    </div>
    <el-dialog
      title="审核操作"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>是否要通过此条溯源标签申请？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="auditApply(0)">不通过</el-button>
        <el-button
          type="primary"
          @click="auditApply(1)"
        >通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import fetch from "@/assets/js/Fetch.js";
import Pagination from "@/components/Pagination.vue";
export default {
  data() {
    return {
      searchCode: "",
      showAddCode: false,
      dialogVisible: false,
      codeData: [
      ],
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
          name: "箱码数量",
          prop: "boxNum"
        },
        {
          name: "果码数量",
          prop: "perNum"
        },
        {
          name: "农产种类",
          prop: "varietyName"
        },
        {
          name: "溯源码数量",
          prop: "tagNum"
        },
        {
          name: "状态",
          prop: "step"
        }
      ],
      addTagForm: {
        code: "",
        goodType: "红心猕猴桃",
        boxNum: "",
        singleNum: "",
        getType: "自行打印",
        address: "",
        contact: "",
        phone: ""
      },
      codes: ["001", "002"],
      getTypes: ["快递", "自行打印"],
      nowRow: null
    };
  },
  mounted() {
    this.getApplyList();
  },
  methods: {
    async getApplyList() {
      let res = await this.$fetch(
        "/label/getAudit",
        {
          batchCode: "",
          companyCode: this.$store.state.userInfo.companyCode,
          typeCode: this.$store.state.userInfo.typeCode,
          limit: 5,
          page: 1
        },
        "POST"
      );
      console.log(res);
      if (res.code == 0) {
        this.codeData = res.data.data;
      }
    },
    showAuditConfirm(row) {
      this.dialogVisible = true;
      this.nowRow = row;
    },
    async auditApply(flag) {
      console.log(this.nowRow);
      let data = {
        account: this.$store.state.userInfo.account,
        action: "审核标签",
        actionId: this.nowRow.actionId,
        flowId: this.nowRow.flowId,
        companyCode: this.nowRow.companyCode,
        labelCompanyCode: this.$store.state.userInfo.companyCode,
        labelCompanyName: this.$store.state.userInfo.companyName,
        labelUserId: this.$store.state.userInfo.id,
      };
      let signData = this.$signData(data);
      if (!signData) return;
      let res = await this.$fetch('/label/audit', signData, 'POST');
      if (res.code == 0) {
        this.dialogVisible = false;
        this.$Message.success('操作成功！');
        this.getApplyList();
      };
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
    onAddSubmit() {}
  },
  components: {
    Pagination
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
.addTagForm {
  width: 400px;
  margin: 20px auto;
}
</style>
