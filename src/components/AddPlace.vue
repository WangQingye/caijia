<template>
  <div class="add-place">
    <el-form
      ref="dataForm"
      :model="dataForm"
      label-width="80px"
      label-align="right"
      class="form"
    >
      <el-form-item label="地区">
        <!-- <el-select
          v-model="dataForm.provinceValue"
          placeholder="请选择"
        >
          <el-option
            v-for="item in provinceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
        {{dataForm.provinceValue}}
        <span style="margin: 0 10px"> — </span>
        <!-- <el-select
          v-model="dataForm.cityValue"
          placeholder="请选择"
        >
          <el-option
            v-for="item in cityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
        {{dataForm.cityValue}}
      </el-form-item>
      <el-form-item label="采价点">
        <el-input
          placeholder="采价点"
          v-model="dataForm.point"
          suffix-icon="el-icon-location"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          style="margin-left:-80px;width:140px"
          @click="back"
        >取消</el-button>
        <el-button
          style="width:140px"
          type="primary"
          @click="submit"
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
        provinceValue: "四川省",
        cityValue: "成都市",
        point: ""
      },
      provinceOptions: [
        { value: "四川", label: "四川" },
        { value: "云南", label: "云南" }
      ],
      cityOptions: [{ value: "成都", label: "成都" }, { value: "昆明", label: "昆明" }]
    };
  },
  props: {
    rowData: {
      default: () => {
        return {};
      },
      type: Object
    }
  },
  mounted() {
    if (this.rowData) {
      this.setData();
    }
  },
  methods: {
    setData() {
      this.dataForm.provinceValue = this.rowData.province;
      this.dataForm.cityValue = this.rowData.city;
      this.dataForm.point = this.rowData.point;
    },
    async submit() {
      let data, url;
      data = {
        city: this.dataForm.cityValue,
        point: this.dataForm.point,
        province: this.dataForm.provinceValue
      };
      if (this.rowData) {
        data.id = this.rowData.id;
        url = "/admin/api/v1/locationUpdate";
      } else {
        url = "/admin/api/v1/locationAdd";
      }
      let res = await this.$fetch(url, data, "POST");
      if (res.code == 200) {
        this.$message.success('操作成功');
        this.back(true);
      }
    },
    back(needFresh) {
      this.$emit("back",needFresh);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.add-place {
  .title {
    width: 100%;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .form {
    width: 640px;
  }
  .box-num {
    width: 100px;
    display: inline-block;
  }
  .el-form-item__label {
    font-weight: bold;
  }
}
</style>
