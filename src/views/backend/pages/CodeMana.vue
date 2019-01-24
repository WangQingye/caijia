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
      <el-row class="mana-buttons">
        <el-button
          type="primary"
          @click="showCodeAdd"
        >添加</el-button>
        <el-button type="danger">删除</el-button>
      </el-row>
      <el-table
        ref="codeTable"
        :data="codeData"
        style="width: 100%"
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
          width="160"
          align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="auto"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="manuCode(scope.row)"
              type="text"
              size="small"
              disabled
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              disabled
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="codeData.length"
        :page-change="pageChange"
      ></pagination>
    </div>
    <div v-if="showAddCode">
      <p class="title">批次号申请</p>
      <el-form
        ref="addCodeForm"
        :model="addCodeForm"
        label-width="80px"
        class="addCodeForm"
      >
        <el-form-item label="仓储机构">
          <el-select
            v-model="addCodeForm.storeOrg"
            placeholder="请选择仓储机构"
          >
            <el-option
              v-for="(org,index) in storeOrgs"
              :key="index"
              :label="org.storeCompanyName"
              :value="org.storeCompanyCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库编号">
          <el-input v-model="addCodeForm.storeNum"></el-input>
        </el-form-item>
        <el-form-item label="农产种类">
          <el-select
            v-model="addCodeForm.goodBigType"
            placeholder="请选择农产种类"
          >
            <el-option
              v-for="(type,index) in goodBigTypes"
              :key="index"
              :label="type.kind_name"
              :value="type.kind_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="农产品种">
          <el-select
            v-model="addCodeForm.goodType"
            placeholder="请选择农产品种"
          >
            <el-option
              v-for="(type,index) in goodTypes"
              :key="index"
              :label="type.variety_name"
              :value="type.variety_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量">
          <el-input
            type="number"
            v-model="addCodeForm.num"
            :style="'display:inline-block;width:200px'"
          ></el-input><span> 吨</span>
        </el-form-item>
        <el-form-item label="产地">
          <el-input
            placeholder="请输入产品产地"
            v-model="addCodeForm.sourcePlace"
          ></el-input>
        </el-form-item>
        <el-form-item label="产摘时间">
          <el-date-picker
            v-model="addCodeForm.pickTime"
            type="date"
            placeholder="请选择产摘时间"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="addCodeForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onAddSubmit"
          >提交申请</el-button>
          <el-button @click="showAddCode=false">返回列表</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
export default {
  data() {
    return {
      searchCode: "",
      showAddCode: false,
      codeData: [],
      labels: [
        {
          name: "批次号",
          prop: "batchCode"
        },
        {
          name: "仓储机构",
          prop: "storeCompanyName"
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
          name: "所属企业",
          prop: "companyName"
        },
        {
          name: "状态",
          prop: "step"
        }
      ],
      addCodeForm: {
        storeOrg: "",
        storeNum: "",
        goodBigType: "",
        goodType: "",
        num: "",
        sourcePlace: "",
        pickTime: "",
        desc: ""
      },
      storeOrgs: [],
      goodBigTypes: [],
      goodTypes: []
    };
  },
  mounted() {
    this.getCodeList(1);
  },
  methods: {
    /* 获取批次号列表 */
    async getCodeList(page) {
      let res = await this.$fetch(
        "/storeRepertory/getAuditOfcompany",
        {
          companyCode: this.$store.state.userInfo.companyCode,
          typeCode: this.$store.state.userInfo.typeCode,
          limit: 5,
          page: page
        },
        "POST"
      );
      if (res.code == 0) {
        this.codeData = res.data.data;
      }
    },
    handleSelectionChange() {
      console.log(1);
    },
    /* 获取物流企业，产品类别 */
    async getStoreComps() {
      let res = await this.$fetch("/storeRepertory/getStoreCompany");
      console.log(res);
      if (res.code == 0) {
        this.storeOrgs = res.company;
        this.goodBigTypes = res.kind;
        this.goodTypes = res.variety;
      }
    },
    manuCode() {
      console.log(1);
    },
    pageChange(page) {
      console.log(page);
    },
    /* 批次号表单验证 */
    onAddSubmit() {
      this.addCode();
    },
    /* 添加批次号 */
    async addCode() {
      // console.log(this.addCodeForm);
      // console.log(this.addCodeForm.storeOrg);
      // console.log(this.storeOrgs);
      // console.log(
      //   this.findKindName(
      //     this.addCodeForm.storeCompanyName,
      //     "storeCompanyCode",
      //     "storeCompanyName",
      //     "storeOrgs"
      //   )
      // );
      // return;
      let data = {
        account: this.$store.state.userInfo.account,
        action: "入库",
        farmCode: this.$store.state.userInfo.companyCode,
        farmName: this.$store.state.userInfo.companyName,
        handlerId: this.$store.state.userInfo.id,
        kindCode: this.addCodeForm.goodBigType,
        kindName: this.findKindName(
          this.addCodeForm.goodBigType,
          "kind_code",
          "kind_name",
          "goodBigTypes"
        ),
        num: this.addCodeForm.num,
        origin: this.addCodeForm.sourcePlace,
        remark: this.addCodeForm.desc,
        repositoryCode: this.addCodeForm.storeNum,
        storeCompanyCode: this.addCodeForm.storeOrg,
        storeCompanyName: this.findKindName(
          this.addCodeForm.storeOrg,
          "storeCompanyCode",
          "storeCompanyName",
          "storeOrgs"
        ),
        storeTime: this.addCodeForm.pickTime,
        varietyCode: this.addCodeForm.goodType,
        varietyName: this.findKindName(
          this.addCodeForm.goodType,
          "variety_code",
          "variety_name",
          "goodTypes"
        )
      };
      let signData = this.$signData(data);
      if (!signData) return;
      let res = await this.$fetch("/storeRepertory/save", signData, "POST");
      console.log(res);
      if (res.code == 0) {
        this.$message.success("申请成功");
        this.showAddCode = false;
        this.getCodeList(1);
      }
    },
    /* 展示批次号申请界面 */
    showCodeAdd() {
      this.showAddCode = true;
      this.getStoreComps();
    },
    /**
     *  值，对应的标签，要查找的标签
     */
    findKindName(value, tag, find, arrName) {
      let a;
      this[arrName].forEach(item => {
        if (item[tag] == value) {
          a = item[find];
        }
      });
      return a;
    }
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
