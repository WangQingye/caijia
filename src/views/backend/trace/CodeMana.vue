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
        @click="getCodeList(1,true)"
      >搜索</el-button>
      <el-row class="mana-buttons">
        <el-button
          type="primary"
          @click="showCodeAdd"
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
              @click="editCode(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.step == 1"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              v-if="scope.row.step == 1"
              @click="delCode(scope.row.flowId)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="dataTotalLength"
        @page-change="pageChange"
      ></pagination>
    </div>
    <div v-if="showAddCode">
      <p class="title">批次号申请</p>
      <el-form
        :rules="rules"
        ref="addCodeForm"
        :model="addCodeForm"
        label-width="80px"
        class="addCodeForm"
      >
        <el-form-item
          label="仓储机构"
          prop="storeOrg"
        >
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
        <el-form-item
          label="仓库编号"
          prop="storeNum"
        >
          <el-input v-model="addCodeForm.storeNum"></el-input>
        </el-form-item>
        <el-form-item
          label="农产种类"
          prop="goodBigType"
        >
          <el-select
            v-model="addCodeForm.goodBigType"
            placeholder="请选择农产种类"
            @change="handleOrgsChange"
          >
            <el-option
              v-for="(type,index) in goodBigTypes"
              :key="index"
              :label="type.kindName"
              :value="type.kindCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="农产品种"
          prop="goodType"
        >
          <el-select
            v-model="addCodeForm.goodType"
            placeholder="请选择农产品种"
          >
            <el-option
              v-for="(type,index) in goodTypes"
              :key="index"
              :label="type.varietyName"
              :value="type.varietyCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="数量"
          prop="num"
        >
          <el-input
            type="number"
            v-model="addCodeForm.num"
            :style="'display:inline-block;width:200px'"
          ></el-input><span> 吨</span>
        </el-form-item>
        <el-form-item
          label="产地"
          prop="sourcePlace"
        >
          <el-input
            placeholder="请输入产品产地"
            v-model="addCodeForm.sourcePlace"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="产摘时间"
          prop="pickTime"
        >
          <el-date-picker
            v-model="addCodeForm.pickTime"
            type="date"
            placeholder="请选择产摘时间"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="描述"
          prop="desc"
        >
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
          <el-button @click="backList">返回列表</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        desc: "",
        flowId: ""
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
      goodTypes: [],
      isEdit: false
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
        "/storeRepertory/getAuditOfcompany",
        {
          batchCode: this.searchCode,
          companyCode: this.$store.state.userInfo.companyCode,
          typeCode: this.$store.state.userInfo.typeCode,
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
    /* 获取物流企业，产品类别 */
    async getStoreComps() {
      let res = await this.$fetch("/storeRepertory/getStoreCompany");
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
    async editCode(data) {
      this.showAddCode = true;
      await this.getStoreComps();
      this.addCodeForm.storeOrg = data.storeCompanyCode;
      this.addCodeForm.storeNum = data.repositoryCode;
      this.addCodeForm.goodBigType = data.kindCode;
      this.handleOrgsChange(this.addCodeForm.goodBigType);
      this.addCodeForm.goodType = data.varietyCode;
      this.addCodeForm.num = data.num;
      this.addCodeForm.sourcePlace = data.origin;
      this.addCodeForm.pickTime = new Date(data.storeTime).getTime();
      this.addCodeForm.desc = data.remark;
      this.addCodeForm.flowId = data.flowId;
    },
    async delCode(id) {
      let res = await this.$fetch("/storeRepertory/delete", { ids: [id] });
      if (res.code == 0) {
        this.$message.success("操作成功");
        this.getCodeList(1);
      }
    },
    /* 批次号表单验证 */
    onAddSubmit() {
      if (this.isEdit) {
        this.postEditCode();
      } else {
        this.addCode();
      }
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
    /* 编辑批次号 */
    async postEditCode() {
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
        flowId: this.addCodeForm.flowId,
        farmCode: this.$store.state.userInfo.companyCode,
        farmName: this.$store.state.userInfo.companyName,
        account: this.$store.state.userInfo.account,
        handlerId: this.$store.state.userInfo.id
      };
      this.$refs.addCodeForm.validate(async valid => {
        if (valid) {
          let res = await this.$fetch("/storeRepertory/update", data, "POST");
          if (res.code == 0) {
            this.$message.success("修改成功");
            this.showAddCode = false;
            this.$refs.addCodeForm.resetFields();
            this.getCodeList(1);
            this.isEdit = false;
          }
        }
      });
    },
    /* 展示批次号申请界面 */
    showCodeAdd() {
      this.showAddCode = true;
      this.getStoreComps();
    },
    backList() {
      this.showAddCode = false;
      this.isEdit = false;
      this.addCodeForm = {
        storeOrg: "",
        storeNum: "",
        goodBigType: "",
        goodType: "",
        num: "",
        sourcePlace: "",
        pickTime: "",
        desc: ""
      };
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
