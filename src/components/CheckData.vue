<template>
  <div class="check-data">
    <el-form
      ref="dataForm"
      :model="dataForm"
      label-width="100px"
      label-align="right"
      class="form"
    >
      <el-form-item label="采集品种：">
        <p>{{rowData.largeKindName}} > {{rowData.kindName}}</p>
      </el-form-item>
      <el-form-item label="采价时间：">
        <p>{{rowData.gatherTime.split(".")[0]
        .replace("T", " ")}}</p>
      </el-form-item>
      <el-form-item label="采价点：">
        <p>{{rowData.point}}</p>
      </el-form-item>
      <el-form-item
        label="离地价格："
        prop="startPlace"
        v-if="!rowData.abnormal"
      >
        <p>{{rowData.price}}</p>
      </el-form-item>
      <el-form-item
        label="产品来源："
        prop="endPlace"
        v-if="!rowData.abnormal"
      >
        <p>{{rowData.origin}}</p>
      </el-form-item>
      <el-form-item
        label="交易规模："
        prop="date"
        v-if="!rowData.abnormal"
      >
        <p>{{rowData.gatherNum}}</p>
      </el-form-item>
      <el-form-item
        label="照片："
        v-if="!rowData.abnormal"
      >
        <img
          v-if="rowData.pic1"
          class="check-img"
          :src="productUrl + '/admin/api/v1/img/' + rowData.pic1"
        >
        <img
          v-if="rowData.pic2"
          class="check-img"
          :src="productUrl + '/admin/api/v1/img/' + rowData.pic2"
        >
        <img
          v-if="rowData.pic3"
          class="check-img"
          :src="productUrl + '/admin/api/v1/img/' + rowData.pic3"
        >
      </el-form-item>
      <el-form-item
        label="异常原因："
        prop="mark"
        v-if="rowData.abnormal"
      >
        <p>{{rowData.mark}}</p>
      </el-form-item>
      <el-form-item>
        <el-button
          style="margin-left:-80px;width:140px"
          type="primary"
          @click="back"
        >确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addLogistics",
  data() {
    return {
      dataForm: {
        varityValue: 1,
        typeValue: 1,
        originValue: 1,
        scaleValue: 1
      },
      varityOptions: [
        { value: 1, label: "叶菜类" },
        { value: 2, label: "茎菜类" }
      ],
      typeOptions: [{ value: 1, label: "大白菜" }, { value: 2, label: "青菜" }],
      originOptions: [{ value: 1, label: "温江" }, { value: 2, label: "郫县" }],
      scaleOptions: [{ value: 1, label: "10斤" }, { value: 2, label: "20斤" }],
      productUrl
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
  },
  methods: {
    back() {
      this.$emit("back");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.check-data {
  .title {
    width: 100%;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .form {
    width: 640px;
    .check-img:first-child {
      margin-left: -80px;
    }
    .check-img {
      margin-top: 40px;
      width: 162px;
      height: 162px;
      border-radius: 10px;
      box-shadow: 5px 5px 10px rgb(238, 238, 238);
      margin-right: 20px;
    }
  }
  .box-num {
    width: 100px;
    display: inline-block;
  }
  .el-form-item__label {
    color: #999999;
  }
  .el-form-item__content {
    font-weight: bold;
  }
}
</style>
