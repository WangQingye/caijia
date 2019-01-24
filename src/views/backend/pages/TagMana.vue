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
          @click="showAddCode=true"
        >申请</el-button>
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
              @click="manuCode(scope.row)"
              type="text"
              size="small"
              :disabled="true"
            >编辑</el-button>
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
      >
        <el-form-item label="批次号">
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
        <el-form-item label="农产种类">
          {{addTagForm.goodType}}
        </el-form-item>
        <el-form-item label="箱码数量">
          <el-input
            type="number"
            v-model="addTagForm.boxNum"
          ></el-input>
        </el-form-item>
        <el-form-item label="果码数量">
          <el-input
            type="number"
            v-model="addTagForm.singleNum"
          ></el-input>
        </el-form-item>
        <el-form-item label="取码方式">
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
        >
          <el-input
            placeholder="请输入收货地址"
            v-model="addTagForm.address"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="addTagForm.getType == 1"
          label="联系人"
        >
          <el-input
            placeholder="请输入联系人"
            v-model="addTagForm.contact"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="addTagForm.getType == 1"
          label="电话号码"
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
      codes: [],
      getTypes: [{ name: "快递", code: 1 }, { name: "自行打印", code: 0 }]
    };
  },
  mounted() {
    this.getApplyList();
    this.getCode();
  },
  methods: {
    async getCode() {
      let res = await this.$fetch("/storeRepertory/batchsAndVariety", {
        farmCode: this.$store.state.userInfo.companyCode
      });
      this.codes = res.data;
    },
    async applyTag() {
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
      let signData = this.$signData(data, 13);
      if (!signData) return;
      let res = await this.$fetch("/label/apply", signData, "POST");
      if (res.code == 0) {
        this.$message.success("申请成功，请等待审核");
        this.showAddCode = false;
        this.getApplyList();
      }
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
    manuCode() {
      console.log(1);
    },
    pageChange(page) {
      console.log(page);
    },
    onAddSubmit() {
      this.applyTag();
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
