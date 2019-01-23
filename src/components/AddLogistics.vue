<template>
  <div class="add-logistics">
    <p class="title">物流企业 - 物流信息填报</p>
    <el-form
      ref="logisticsForm"
      :model="logisticsForm"
      label-width="80px"
      class="form"
    >
      <el-form-item label="批次号">
        <el-select
          v-model="logisticsForm.code"
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
          v-model="logisticsForm.boxNumStart"
          class="box-num"
        ></el-input>
        <span> ~ </span>
        <el-input
          type="number"
          v-model="logisticsForm.boxNumEnd"
          class="box-num"
        ></el-input>
      </el-form-item>
      <el-form-item label="溯源类别">
        <p>物流</p>
      </el-form-item>
      <el-form-item label="始发地">
        <el-input
          placeholder="请输入物流始发地"
          v-model="logisticsForm.startPlace"
        ></el-input>
      </el-form-item>
      <el-form-item label="目的地">
        <el-input
          placeholder="请输入物流目的地"
          v-model="logisticsForm.endPlace"
        ></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="logisticsForm.time"
          type="date"
          placeholder="请选择时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="责任人">
        <p>物流机构1</p>
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
  name: "addLogistics",
  data() {
    return {
      logisticsForm: {
        code: "",
        boxNumStart: "",
        boxNumEnd: "",
        startPlace: "",
        endPlace: "",
        date: ""
      },
      codes: ["001", "002"]
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
.add-logistics {
}
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
