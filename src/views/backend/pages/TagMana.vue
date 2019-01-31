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
          @click="showAdd"
        >申请</el-button>
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
              @click="downCode(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.step >= 5"
              :disabled="!Boolean(scope.row.labelStatus)"
            >{{scope.row.labelStatus ? '下载溯源码' : '标签生成中'}}</el-button>
            <el-button
              type="text"
              size="small"
              :disabled="true"
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
      <p class="title">溯源标签申请</p>
      <el-form
        ref="addTagForm"
        :model="addTagForm"
        label-width="80px"
        class="addTagForm"
        :rules="rules"
      >
        <el-form-item
          label="批次号"
          prop="code"
        >
          <el-select
            v-model="addTagForm.code"
            placeholder="请选择批次号"
            @change="onSelectCode"
          >
            <el-option
              v-for="(code,index) in codes"
              :key="index"
              :label="code.batch"
              :value="code.batch"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="农产种类"
          prop="goodType"
        >
          {{addTagForm.goodType}}
        </el-form-item>
        <el-form-item
          label="箱码数量"
          prop="boxNum"
        >
          <el-input
            type="number"
            v-model="addTagForm.boxNum"
            placeholder="请输入箱码数量"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="果码数量"
          prop="singleNum"
        >
          <el-input
            type="number"
            v-model="addTagForm.singleNum"
            placeholder="请输入每箱的果码数量"
          ></el-input>
          <p :style="'font-size:10px;color:gray'">标签数 = 箱码数 X 果码数，单次申请不能超过100万个。</p>
        </el-form-item>
        <el-form-item
          label="取码方式"
          prop="getType"
        >
          <el-select
            v-model="addTagForm.getType"
            placeholder="请选择取码方式"
          >
            <el-option
              v-for="(type,index) in getTypes"
              :key="index"
              :label="type.name"
              :value="type.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="addTagForm.getType == 1"
          label="收货地址"
          prop="address"
        >
          <el-input
            placeholder="请输入收货地址"
            v-model="addTagForm.address"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="addTagForm.getType == 1"
          label="联系人"
          prop="contact"
        >
          <el-input
            placeholder="请输入联系人"
            v-model="addTagForm.contact"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="addTagForm.getType == 1"
          label="电话号码"
          prop="phone"
        >
          <el-input
            placeholder="请输入电话号码"
            v-model="addTagForm.phone"
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
// import fetch from "@/assets/js/Fetch.js";
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
        goodType: "",
        boxNum: "",
        singleNum: "",
        getType: 0,
        address: "",
        contact: "",
        phone: "",
        kindCode: "",
        flowId: ""
      },
      rules: {
        code: [{ required: true, message: "请选择批次号", trigger: "blur" }],
        boxNum: [
          { required: true, message: "请输入箱码数量", trigger: "blur" }
        ],
        singleNum: [
          { required: true, message: "请选择农产品种类", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请选择农产品品种", trigger: "blur" }
        ],
        contact: [
          { required: true, message: "请输入入库数量", trigger: "blur" }
        ],
        sourcePlace: [
          { required: true, message: "请输入产地", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请选择产摘时间", trigger: "blur" }]
      },
      codes: [],
      getTypes: [{ name: "快递", code: 1 }, { name: "自行打印", code: 0 }]
    };
  },
  mounted() {
    setInterval(() => {
      this.getApplyList();
    }, 10000);
  },
  methods: {
    async getCode() {
      let res = await this.$fetch("/storeRepertory/batchsAndVariety", {
        farmCode: this.$store.state.userInfo.companyCode
      });
      this.codes = res.data;
    },
    async applyTag() {
      this.$refs.addTagForm.validate(async valid => {
        if (
          valid &&
          this.addTagForm.boxNum * this.addTagForm.singleNum < 1000000
        ) {
          let data = {
            action: "申请标签",
            companyCode: this.$store.state.userInfo.companyCode,
            companyName: this.$store.state.userInfo.companyName,
            varietyCode: this.addTagForm.kindCode,
            varietyName: this.addTagForm.goodType,
            batchCode: this.addTagForm.code,
            boxNum: this.addTagForm.boxNum,
            perNum: this.addTagForm.singleNum,
            recType: this.addTagForm.getType,
            contacts: this.addTagForm.contact,
            recAddr: this.addTagForm.address,
            phone: this.addTagForm.phone,
            account: this.$store.state.userInfo.account,
            flowId: this.addTagForm.flowId,
            handlerId: this.$store.state.userInfo.id
          };
          this.$checkSign(data, async signData => {
            if (!signData) {
              signData = this.$signData(data, 13);
            }
            let res = await this.$fetch("/label/apply", signData, "POST");
            if (res.code == 0) {
              this.$message.success("申请成功，请等待审核");
              this.$refs.addTagForm.resetFields();
              this.showAddCode = false;
              this.getApplyList();
            }
          });
        } else {
          this.$message.error("标签数量过大，请分批申请");
        }
      });
    },
    async getApplyList() {
      let res = await this.$fetch(
        "/label/getAuditOfcompany",
        {
          batchCode: "",
          companyCode: this.$store.state.userInfo.companyCode,
          typeCode: this.$store.state.userInfo.typeCode,
          limit: 5,
          page: 1
        },
        "POST"
      );
      if (res.code == 0) {
        this.codeData = res.data.data;
      }
    },
    onSelectCode(value) {
      this.codes.forEach(item => {
        if (item.batch == value) {
          this.addTagForm.goodType = item.varietyName;
          this.addTagForm.kindCode = item.varietyCode;
          this.addTagForm.flowId = item.flowId;
        }
      });
    },
    handleSelectionChange() {
      console.log(1);
    },
    async downCode(row) {
      let res = await this.$fetch("/label/download", {
        companyCode: row.companyCode,
        batch: row.batchCode
      });
      var a = document.createElement("a");
      var url = window.URL.createObjectURL(res);
      a.href = url;
      a.download = `溯源码${row.batchCode}.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    pageChange(page) {
      console.log(page);
    },
    onAddSubmit() {
      this.applyTag();
    },
    showAdd() {
      this.showAddCode = true;
      this.getCode();
    },
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
.addTagForm {
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
