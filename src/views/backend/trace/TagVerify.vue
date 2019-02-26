<template>
  <div class="codeMana">
    <div v-if="!showAddCode">
            <p class="text">企业名称</p>
      <el-input
        class="search-input"
        v-model="searchName"
        placeholder="请输入要搜索的企业名称"
      ></el-input>
      <p class="text">批次号</p>
      <el-input
        class="search-input"
        v-model="searchCode"
        placeholder="请输入要搜索的批次号"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getCodeList(1,true)"
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
          <template slot-scope="scope">
            <p v-if="item.prop == 'tagNum'">
              {{scope.row.boxNum * scope.row.perNum}}
            </p>
            <p v-else-if="item.prop == 'step'">
              {{scope.row.step == 4 ? '待审核' : '审核完成'}}
            </p>
            <p v-else>
              {{scope.row[item.prop]}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-if="scope.row.step == 4"
              @click="showAuditConfirm(scope.row)"
            >审核</el-button>
            <el-button
              @click="manuCode(scope.row)"
              type="text"
              size="small"
              v-else
              :disabled="true"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="dataTotalLength"
        @page-change="pageChange"
        :current-page="currentPage"
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
import Pagination from "@/components/Pagination.vue";
import PageMixin from "@/assets/js/pageMixin";
export default {
  mixins: [PageMixin],
  data() {
    return {
      searchCode: "",
      searchName: "",
      showAddCode: false,
      dialogVisible: false,
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
    this.getCodeList(1);
  },
  methods: {
    async getCodeList(page, isFromSearch) {
      if (isFromSearch) page = 1;
      let res = await this.$fetch(
        "/label/getAudit",
        {
          batchCode: this.searchCode,
          companyName: this.searchName,
          companyCode: this.$store.state.userInfo.companyCode,
          typeCode: this.$store.state.userInfo.typeCode,
          limit: this.pageLimit,
          page: page
        },
        "POST"
      );
      console.log(res);
      if (res.code == 0) {
        this.codeData = res.data.data;
        this.dataTotalLength = res.data.countSize;
        console.log(this.currentPage);
        this.currentPage = page;
        console.log(this.currentPage);
      }
    },
    showAuditConfirm(row) {
      this.dialogVisible = true;
      this.nowRow = row;
    },
    async auditApply(flag) {
      console.log(this.nowRow);
      let data = {
        action: "审核标签",
        labelCompanyCode: this.$store.state.userInfo.companyCode,
        labelCompanyName: this.$store.state.userInfo.companyName,
        account: this.$store.state.userInfo.account,
        actionId: this.nowRow.actionId,
        flowId: this.nowRow.flowId,
        companyCode: this.nowRow.companyCode,
        labelUserId: this.$store.state.userInfo.id
      };
      this.$checkSign(data, async signData => {
        console.log(data);
        if (!signData) {
          signData = this.$signData(data, 4);
        }
        let res = await this.$fetch("/label/audit", signData, "POST");
        if (res.code == 0) {
          this.dialogVisible = false;
          this.$message.success("操作成功！");
          this.getCodeList(1);
        }
      });
    },
    handleSelectionChange() {
      console.log(1);
    },
    manuCode() {
      console.log(1);
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
