<template>
  <div class="add-stock-out">
    <p class="title">农企 - 出库信息填报</p>
    <el-form
      ref="stockOutForm"
      :model="stockOutForm"
      label-width="80px"
      class="form"
      :rules="rules"
    >
      <el-form-item
        label="批次号"
        prop="batchCode"
      >
        <p>{{rowData.batchCode}}</p>
      </el-form-item>
      <el-form-item
        label="箱码"
        prop="boxNum"
      >
        <p
          class="box-num"
          :style="'width:20px'"
        >{{stockOutForm.boxNumStart}}</p>
        <span>~ </span>
        <el-input
          type="number"
          v-model="stockOutForm.boxNumEnd"
          class="box-num"
        ></el-input>
      </el-form-item>
      <el-form-item label="溯源类别">
        <p>出库</p>
      </el-form-item>
      <el-form-item label="文件">
        <el-upload
          class="upload-demo"
          :action="productUrl + '/list/upload'"
          :on-success="handleFileChange"
          :file-list="fileList"
          list-type="text"
          ref="imgUpload"
        >
          <el-button
            size="small"
            type="primary"
          >点击上传</el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="物流企业"
        prop="company"
      >
        <el-select
          v-model="stockOutForm.logisticsCompany"
          placeholder="请选择物流企业"
        >
          <el-option
            v-for="(com,index) in logisticsCompanys"
            :key="index"
            :label="com.name"
            :value="com.company_code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="时间"
        prop="date"
      >
        <el-date-picker
          v-model="stockOutForm.date"
          type="date"
          placeholder="请选择时间"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="填报人">
        <p>{{this.$store.state.userInfo.companyName}}</p>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="addTransInfo"
        >添加信息</el-button>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "add-stock-out",
  data() {
    return {
      stockOutForm: {
        code: "",
        boxNumStart: "",
        boxNumEnd: "",
        logisticsCompany: "",
        date: ""
      },
      codes: ["001", "002"],
      logisticsCompanys: [],
      rules: {
        boxNumEnd: [
          { required: true, message: "请输入出库箱码", trigger: "blur" }
        ],
        logisticsCompany: [
          { required: true, message: "请选择物流机构", trigger: "blur" }
        ],
        date: [{ required: true, message: "请选择出库时间", trigger: "blur" }]
      },
      fileList: [],
      productUrl: window.productUrl,
    };
  },
  props: {
    rowData: {
      default: () => {
        return { batchCode: 0 };
      },
      type: Object
    }
  },
  mounted() {
    this.getTransCom();
  },
  methods: {
    onAddSubmit() {},
    back() {
      this.$emit("back");
    },
    async getBoxNum(code) {
      let res = await this.$fetch("/out/boxCountByCode", {
        batchCode: code || this.rowData.batchCode
      });
      if (res.code == 0) {
        this.stockOutForm.boxNumStart = (res.data.curBoxNum || 0) + 1;
        this.stockOutForm.boxNumEnd = res.data.boxNum;
      }
    },
    async getTransCom() {
      let res = await this.$fetch("/list/agricultureList", {
        companyType: 5
      });
      console.log(res);
      if (res.code == 0) {
        this.logisticsCompanys = res.data;
      }
    },
    async addTransInfo() {
      this.$refs.stockOutForm.validate(async valid => {
        if (valid) {
          let data = {
            batchCode: this.rowData.batchCode,
            startBoxNum: this.stockOutForm.boxNumStart,
            endBoxNum: this.stockOutForm.boxNumEnd,
            action: "产品出库",
            transferCompanyCode: this.stockOutForm.logisticsCompany,
            outTime: this.stockOutForm.date,
            actionId: this.rowData.id,
            filePath:this.stockOutForm.filePath
          };
          console.log(data)
          this.$checkSign(data, async signData => {
            if (!signData) {
              signData = this.$signData(data, 6);
            }
            let res = await this.$fetch("/out/outRepertory", data, "POST");
            if (res.code == 0) {
              this.$message.success("添加成功");
              this.$refs.stockOutForm.resetFields();
              this.$emit("back");
            }
          });
        }
      });
    },
    handleFileChange(res, file, fileList) {
      if (res.code == 0) {
          if (this.stockOutForm.filePath) {
              this.stockOutForm.filePath += ",";
              this.stockOutForm.filePath += res.data;
              //console.log(this.stockOutForm.filePath)
          }else{
              this.stockOutForm.filePath = res.data.join('');
              //console.log(this.stockOutForm.filePath)
          }

      }
      this.fileList = fileList;
    }
  },
  watch: {
    "rowData.batchCode": {
      // immediate: true,
      handler: function(val) {
        // this.getBoxNum();
        // this.getTransCom();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.title {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.form {
  width: 400px;
  margin: 0 auto;
}
.box-num {
  width: 100px;
  display: inline-block;
}
</style>
