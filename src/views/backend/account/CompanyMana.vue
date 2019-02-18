<template>
  <div class="codeMana">
    <el-row class="mana-buttons">
      <p class="text">企业名称</p>
      <el-input
        class="search-input"
        v-model="searchCode"
        placeholder="请输入要搜索的企业名称"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        disabled
      >搜索</el-button>
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
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="item.prop == 'step'">
            {{calStatus(scope.row.step)}}
          </p>
          <p v-else>
            {{scope.row[item.prop]}}
          </p>
        </template>
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
      :total="dataTotalLength"
      @page-change="pageChange"
    ></pagination>
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
      codeData: [],
      labels: [
        {
          name: "启用状态",
          prop: "usable"
        },
        {
          name: "企业名称",
          prop: "name"
        },
        {
          name: "企业类型",
          prop: "typeCode"
        },
        {
          name: "账户",
          prop: "account"
        },
        {
          name: "营业执照",
          prop: "licPic"
        },
        {
          name: "联系人",
          prop: "contacts"
        },
        {
          name: "联系电话",
          prop: "phone"
        },
        {
          name: "审核状态",
          prop: "state"
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
      rules: {
        storeOrg: [
          { required: true, message: "请选择仓储机构", trigger: "blur" }
        ],
        storeNum: [
          { required: true, message: "请输入仓库编号", trigger: "blur" }
        ],
        goodBigType: [
          { required: true, message: "请选择农产品种类", trigger: "blur" }
        ],
        goodType: [
          { required: true, message: "请选择农产品品种", trigger: "blur" }
        ],
        num: [{ required: true, message: "请输入入库数量", trigger: "blur" }],
        sourcePlace: [
          { required: true, message: "请输入产地", trigger: "blur" }
        ],
        pickTime: [
          { required: true, message: "请选择产摘时间", trigger: "blur" }
        ]
      },
      storeOrgs: [],
      goodBigTypes: [],
      goodTypesBefore: [],
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
        "/company/getCompanyInfo",
        {
          limit: this.pageLimit,
          page: page,
          name: this.searchCode
        },
        "POST",
        "user"
      );
      if (res.code == 0) {
        this.codeData = res.data.data;
        this.dataTotalLength = res.data.countSize;
      }
    },
    /* 获取物流企业，产品类别 */
    async getStoreComps() {
      let res = await this.$fetch("/storeRepertory/getStoreCompany");
      console.log(res);
      if (res.code == 0) {
        this.storeOrgs = res.company;
        this.goodBigTypes = res.kind;
        this.goodTypesBefore = res.variety;
      }
    },
    handleOrgsChange(selection) {
      this.addCodeForm.goodType = "";
      this.goodTypes = this.goodTypesBefore.filter(item => {
        return item.kindCode == selection;
      });
    },
    manuCode() {
      console.log(1);
    },
    /* 批次号表单验证 */
    onAddSubmit() {
      this.addCode();
    },
    /* 添加批次号 */
    async addCode() {
      this.$refs.addCodeForm.validate(async valid => {
        if (valid) {
          let data = {
            action: "入库",
            storeCompanyCode: this.addCodeForm.storeOrg,
            storeCompanyName: this.findKindName(
              this.addCodeForm.storeOrg,
              "storeCompanyCode",
              "storeCompanyName",
              "storeOrgs"
            ),
            repositoryCode: this.addCodeForm.storeNum,
            kindCode: this.addCodeForm.goodBigType,
            kindName: this.findKindName(
              this.addCodeForm.goodBigType,
              "kindCode",
              "kindName",
              "goodBigTypes"
            ),
            varietyCode: this.addCodeForm.goodType,
            varietyName: this.findKindName(
              this.addCodeForm.goodType,
              "varietyCode",
              "varietyName",
              "goodTypes"
            ),
            num: this.addCodeForm.num,
            origin: this.addCodeForm.sourcePlace,
            storeTime: this.addCodeForm.pickTime,
            remark: this.addCodeForm.desc,
            farmCode: this.$store.state.userInfo.companyCode,
            farmName: this.$store.state.userInfo.companyName,
            account: this.$store.state.userInfo.account,
            handlerId: this.$store.state.userInfo.id
          };
          this.$checkSign(data, async signData => {
            if (!signData) {
              signData = this.$signData(data, 15);
            }
            let res = await this.$fetch(
              "/storeRepertory/save",
              signData,
              "POST"
            );
            if (res.code == 0) {
              this.$message.success("申请成功");
              this.showAddCode = false;
              this.$refs.addCodeForm.resetFields();
              this.getCodeList(1);
            }
          });
        }
      });
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
          text = "出库完成";
          break;
        case 7:
          text = "物流完成";
          break;
      }
      return text;
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
  margin: 0 0 20px 0;
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


