<template>
  <div class="add-stock-out">
    <p class="title">检测机构 - 检测信息填报</p>
    <el-form
      ref="stockOutForm"
      :model="stockOutForm"
      label-width="80px"
      class="form"
    >
      <el-form-item label="农企">
        <el-select
          v-model="stockOutForm.company"
          placeholder="请选择批次号"
        >
          <el-option
            v-for="(com,index) in companys"
            :key="index"
            :label="com"
            :value="com"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="批次号">
        <el-select
          v-model="stockOutForm.codes"
          placeholder="请选择批次号"
        >
          <el-option
            v-for="(code,index) in codes"
            :key="index"
            :label="code"
            :value="code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="溯源类别">
        <p>检测</p>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          v-model="stockOutForm.desc"
        ></el-input>
      </el-form-item>
      <el-form-item label="检测报告">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleFileChange"
          :file-list="fileList"
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
      <el-form-item label="时间">
        <el-date-picker
          v-model="stockOutForm.time"
          type="date"
          placeholder="请选择时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="责任人">
        <p>检测机构1</p>
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
      companys: ["农企1", "农企2"],
      fileList: []
    };
  },
  props: {},
  methods: {
    onAddSubmit() {},
    back() {
      this.$emit("back");
    },
    handleFileChange(){

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
