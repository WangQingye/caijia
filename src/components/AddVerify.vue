<template>
  <div class="add-verify">
    <p class="title">检测机构 - 检测信息填报</p>
    <el-form
      ref="addVerifyForm"
      :model="addVerifyForm"
      label-width="80px"
      class="form"
      :rules="rules"
    >
      <el-form-item label="农企">
        <p>{{rowData.companyName}}</p>
      </el-form-item>
      <el-form-item label="批次号">
        <p>{{rowData.batchCode}}</p>
      </el-form-item>
      <el-form-item label="溯源类别">
        <p>检测</p>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="desc"
      >
        <el-input
          type="textarea"
          v-model="addVerifyForm.desc"
        ></el-input>
      </el-form-item>
      <el-form-item label="检测报告">
        <el-upload
          class="upload-demo"
          :action="userUrl + '/company/fileUpload'"
          :on-success="handleFileChange"
          :file-list="fileList"
          list-type="picture"
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
        label="时间"
        prop="date"
      >
        <el-date-picker
          v-model="addVerifyForm.date"
          type="date"
          placeholder="请选择时间"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="责任人">
        <p>{{this.$store.state.userInfo.companyName}}</p>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onAddSubmit"
        >添加信息</el-button>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "add-verify",
  data() {
    return {
      addVerifyForm: {
        code: "",
        boxNumStart: "",
        boxNumEnd: "",
        logisticsCompany: "",
        date: "",
        desc: "",
        filePath: ""
      },
      rules: {
        desc: [
          { required: true, message: "请输入检测结果描述", trigger: "blur" }
        ],
        date: [{ required: true, message: "请选择检测日期", trigger: "blur" }]
      },
      codes: ["001", "002"],
      companys: ["农企1", "农企2"],
      fileList: [],
      userUrl: window.userUrl
    };
  },
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    async onAddSubmit() {
      let data = {
        action: "检测",
        checkCompanyCode: this.$store.state.userInfo.companyCode,
        checkCompanyName: this.$store.state.userInfo.companyName,
        farmCode: this.rowData.companyCode,
        farmName: this.rowData.companyName,
        remark: this.addVerifyForm.desc,
        checkTime: this.addVerifyForm.date,
        account: this.$store.state.userInfo.account,
        actionId: this.rowData.actionId,
        picList: this.addVerifyForm.filePath,
        batchCode: this.rowData.batchCode,
        flowId: this.rowData.flowId,
        handlerId: this.$store.state.userInfo.id
      };
      this.$checkSign(data, async signData => {
        if (!signData) {
          signData = this.$signData(data, 8);
        }
        let res = await this.$fetch("/check/save", signData, "POST");
        if (res.code == 0) {
          this.$message.success("信息填报成功");
          this.$refs.addVerifyForm.resetFields();
          this.back();
        }
      });
    },
    back() {
      this.$emit("back", true);
    },
    handleFileChange(res, file, fileList) {
      console.log(res);
      if (res.code == 0) {
        if (this.addVerifyForm.filePath) {
          this.addVerifyForm.filePath += ",";
        }
        this.addVerifyForm.filePath += res.data;
      }
      this.fileList = fileList;
    }
  },
  watch: {}
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
}
</style>
