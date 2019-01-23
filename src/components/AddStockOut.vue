<template>
  <div class="add-stock-out">
    <p class="title">农企 - 出库信息填报</p>
    <el-form
      ref="stockOutForm"
      :model="stockOutForm"
      label-width="80px"
      class="form"
    >
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
      <el-form-item label="箱码">
        <el-input
          type="number"
          v-model="stockOutForm.boxNumStart"
          class="box-num"
        ></el-input>
        <span> ~ </span>
        <el-input
          type="number"
          v-model="stockOutForm.boxNumEnd"
          class="box-num"
        ></el-input>
      </el-form-item>
      <el-form-item label="溯源类别">
        <p>出库</p>
      </el-form-item>
      <el-form-item label="物流企业">
        <el-select
          v-model="stockOutForm.logisticsCompany"
          placeholder="请选择物流企业"
        >
          <el-option
            v-for="(com,index) in logisticsCompanys"
            :key="index"
            :label="com"
            :value="com"
          ></el-option>
        </el-select>
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
        <p>农企1</p>
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
      logisticsCompanys: ['物流企业1','物流企业2']
    };
  },
  props: {},
  methods: {
    onAddSubmit() {},
    back() {
      this.$emit("back");
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
