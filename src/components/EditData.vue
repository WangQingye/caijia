<template>
  <div class="edit-data">
    <el-form
      ref="dataForm"
      :model="dataForm"
      label-width="80px"
      label-align="right"
      class="form"
    >
      <el-form-item label="采集品种">
        <el-select
          v-model="dataForm.largeKindId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in varityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span style="margin: 0 10px"> — </span>
        <el-select
          v-model="dataForm.kindName"
          placeholder="请选择"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采价时间">
        <el-date-picker
          v-model="dataForm.gatherTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="采价点">
        <el-input
          placeholder="产品来源"
          v-model="rowData.point"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="离地价格"
        prop="startPlace"
      >
        <el-input
          placeholder="离地价格"
          v-model="dataForm.price"
          style="width:200px"
        ></el-input>
        <span> 元/斤</span>
      </el-form-item>
      <el-form-item
        label="产品来源"
        prop="endPlace"
      >
        <el-select
          v-model="dataForm.origin"
          placeholder="请选择"
        >
          <el-option
            v-for="item in originOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="交易规模"
        prop="date"
      >
        <el-input
          placeholder="交易规模"
          v-model="dataForm.gatherNum"
          style="width:200px"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="照片(选填)"
        label-position="top"
      >
        <el-upload
          v-if="showUpload"
          list-type="picture-card"
          :file-list="fileList"
          :action="productUrl + '/admin/api/v1/uploadImg'"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          style="margin-left:-80px;width:140px"
          @click="back"
        >取消</el-button>
        <el-button
          style="width:140px"
          type="primary"
          @click="update"
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
        largeKindName: "",
        largeKindId: "",
        kindName: "",
        origin: 1,
        gatherNum: "2019-09-08T08:57:24.000+0000",
        price: 111,
        gatherTime: ""
      },
      varityOptions: [],
      typeOptions: [],
      originOptions: [
        { value: "露地蔬菜", label: "露地蔬菜" },
        { value: "大棚蔬菜", label: "大棚蔬菜" }
      ],
      scaleOptions: [{ value: 1, label: "10斤" }, { value: 2, label: "20斤" }],
      fileList: [],
      productUrl,
      showUpload: false
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
    this.setData();
  },
  methods: {
    async update() {
      if (!this.testForm()) return;
      let res = await this.$fetch(
        "/admin/api/v1/gatherUpdate",
        {
          abnormal: 0,
          gatherNum: this.dataForm.gatherNum,
          gatherTime: this.dataForm.gatherTime,
          id: this.rowData.id,
          kindName: this.dataForm.kindName,
          origin: this.dataForm.largeKindName,
          pic1: this.fileList[0] && this.fileList[0].name || '',
          pic2: this.fileList[1] && this.fileList[1].name || '',
          pic3: this.fileList[2] && this.fileList[2].name || '',
          price: this.dataForm.price
        },
        "POST"
      );
      if (res.code == 200) {
        this.$message.success("操作成功");
        this.back(true);
      }
    },
    async getLargeKind() {
      let res = await this.$fetch("/admin/api/v1/largeKindList", {}, "POST");
      if (res.code == 200) {
        this.varityOptions = [];
        res.data.forEach(item => {
          if (item.name  == this.dataForm.largeKindName) {
            this.dataForm.largeKindId = item.id;
          }
          this.varityOptions.push({
            value: item.id,
            label: item.name
          });
        });
        this.getKind();
      }
    },
    async getKind() {
      let res = await this.$fetch(
        "/admin/api/v1/kindGet",
        {
          id: this.dataForm.largeKindId
        },
        "POST"
      );
      if (res.code == 200) {
        console.log(res);
        res.data.list.forEach(item => {
          this.typeOptions.push({
            value: item.name,
            label: item.name,
            min: item.minPrice,
            max: item.maxPrice
          });
        });
      }
    },
    testForm() {
      let min, max;
      this.typeOptions.forEach(item => {
        if (item.value == this.dataForm.kindName) {
          min = item.min;
          max = item.max;
        }
      });
      return true;
    },
    setData() {
      this.dataForm.largeKindName = this.rowData.largeKindName;
      this.dataForm.kindName = this.rowData.kindName;
      this.dataForm.origin = this.rowData.origin;
      this.dataForm.gatherNum = this.rowData.gatherNum;
      this.dataForm.price = this.rowData.price;
      this.dataForm.gatherTime = this.rowData.gatherTime
        .split(".")[0]
        .replace("T", " ");
      if (this.rowData.pic1) {
        this.fileList[0] = {
          name: this.rowData.pic1,
          url: this.productUrl + "/admin/api/v1/img/" + this.rowData.pic1
        };
        if (this.rowData.pic2) {
          this.fileList[1] = {
            name: this.rowData.pic2,
            url: this.productUrl + "/admin/api/v1/img/" + this.rowData.pic2
          };
          if (this.rowData.pic3) {
            this.fileList[2] = {
              name: this.rowData.pic3,
              url: this.productUrl + "/admin/api/v1/img/" + this.rowData.pic3
            };
          }
        }
        this.showUpload = true;
      } else {
        this.showUpload = true;
      }
      this.getLargeKind();
    },
    handleRemove(file) {
      console.log(file);
      console.log(this.fileList);
      this.fileList.splice(this.fileList.indexOf(file),1);
      console.log(this.fileList);
    },
    handleAvatarSuccess(res) {
      this.fileList.push({
        name: res.data,
        url: this.productUrl + "/admin/api/v1/img/" + res.data
      });
    },
    beforeUpload() {
      if (this.fileList.length > 2) {
        this.$message.error("最多上传3张图片");
        return false;
      }
      return true;
    },
    back(needFresh) {
      this.$emit("back", needFresh);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.edit-data {
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
