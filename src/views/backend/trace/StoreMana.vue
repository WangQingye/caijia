<template>
  <div class="codeMana">
    <div>
      <p class="text">企业名称</p>
      <el-input
        class="search-input"
        v-model="searchCompany"
        placeholder="请输入要搜索的企业名称"
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
            <p v-if="item.prop == 'step'">
              {{scope.row.step == 2 ? '审核完成' : '待审核'}}
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
          <template
            slot-scope="scope"
            v-if="scope.row.step == 1"
          >
            <el-button
              @click="showDialog(scope.row)"
              type="text"
              size="small"
            >审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="dataTotalLength"
                @page-change="pageChange"
        @size-change="sizeChange"
      ></pagination>
    </div>
    <el-dialog
      title="审核操作"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>是否要通过此条入库审核？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="manuCode(0)">不通过</el-button>
        <el-button
          type="primary"
          @click="manuCode(1)"
        >通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import fetch from "@/assets/js/Fetch.js";
import Pagination from "@/components/Pagination.vue";
import PageMixin from "@/assets/js/pageMixin";
export default {
  mixins: [PageMixin],
  data() {
    return {
      searchCompany: "",
      codeData: [],
      labels: [
        {
          name: "批次号",
          prop: "batchCode"
        },
        {
          name: "所属企业",
          prop: "companyName"
        },
        {
          name: "仓库编号",
          prop: "repositoryCode"
        },
        {
          name: "农产品种类",
          prop: "varietyName"
        },
        {
          name: "描述",
          prop: "remark"
        },
        {
          name: "数量 / 吨",
          prop: "num"
        },
        {
          name: "仓储机构",
          prop: "storeCompanyName"
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
      dialogVisible: false,
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
        "/storeRepertory/getAudit",
        {
          companyName: this.searchCompany,
          page: page,
          limit: this.pageLimit,
          typeCode: this.$store.state.userInfo.typeCode,
          storeCompanyCode: this.$store.state.userInfo.companyCode
        },
        "POST"
      );
      if (res.code == 0) {
        this.codeData = res.data.data;
        this.dataTotalLength = res.data.countSize;
      }
    },
    handleSelectionChange() {
      console.log(1);
    },
    showDialog(row) {
      console.log(row);
      this.dialogVisible = true;
      this.nowRow = row;
    },
    async manuCode(flag) {
      this.dialogVisible = false;
      let data = {
        action: "审核入库",
        storeCompanyCode: this.nowRow.storeCompanyCode,
        storeCompanyName: this.nowRow.storeCompanyName,
        account: this.$store.state.userInfo.account,
        actionId: this.nowRow.actionId,
        flowId: this.nowRow.flowId,
        companyCode: this.nowRow.companyCode,
        storeUserId: this.$store.state.userInfo.id
      };
      this.$checkSign(data, async signData => {
        if (!signData) {
          signData = this.$signData(data, 4);
        }
        let res = await this.$fetch("/storeRepertory/audit", signData, "POST");
        if (res.code == 0) {
          this.$message.success("审核成功");
          this.getCodeList(1);
        }
      });
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
