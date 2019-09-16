<template>
  <div class="add-place">
    <el-form
      ref="dataForm"
      :model="dataForm"
      label-width="80px"
      label-position="left"
      class="form"
    >

      <el-form-item
        label="新增采集大类"
        label-width="100px"
      >
        <el-switch
          v-model="addVarity"
          active-color="#13ce66"
          inactive-color="#ff4949"
          style="display:block;margin-top:10px;"
        >
        </el-switch>
        <div
          class="add-varity-wrapper"
          v-if="addVarity"
        >
          <p style="display:inline-block;width:70px;margin-left:20px;font-weight: bold">采集大类</p>
          <el-input
            placeholder="采集大类"
            v-model="dataForm.varity"
            style="display:inline-block;width:282px;margin-right:20px"
          ></el-input>
          <el-button
            size="small"
            type="primary"
            @click="addBigType"
          >确定</el-button>
        </div>
      </el-form-item>
      <el-form-item label="采集大类">
        <el-select
          v-model="dataForm.varityValue"
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
        <el-button
          type="danger"
          size="small"
          style="margin-left:20px"
          @click="deleteBigType"
        >删除</el-button>
      </el-form-item>
      <el-form-item label="采集子类">
        <el-input
          placeholder="采集子类"
          v-model="dataForm.kind"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格范围">
        <el-input
          placeholder="最小价格"
          v-model="dataForm.minPrice"
          style="display:inline-block;width:128px"
        ></el-input>
        <span style="margin: 0 10px"> — </span>
        <el-input
          placeholder="最大价格"
          v-model="dataForm.maxPrice"
          style="display:inline-block;width:128px"
        ></el-input>
        <span> 元/斤</span>
      </el-form-item>
      <el-form-item label="照片">
        <el-upload
          class="avatar-uploader"
          :action="productUrl + '/admin/api/v1/uploadImg'"
          :on-remove="handleRemove"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
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
          @click="addKind"
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
      addVarity: false,
      dataForm: {
        varityValue: "",
        minPrice: 0,
        maxPrice: 0,
        kind: ""
      },
      varityOptions: [],
      cityOptions: [],
      imageUrl: "",
      imgPath: "",
      productUrl
    };
  },
  props: {
    rowData: {
      default: () => {
        return null;
      },
      type: Object
    }
  },
  mounted() {
    if (this.rowData) {
      this.setData();
    }
    this.getLargeKind();
  },
  methods: {
    async addBigType() {
      let res = await this.$fetch(
        "/admin/api/v1/largeKindAdd",
        {
          name: this.dataForm.varity
        },
        "POST"
      );
      if (res.code == 200) {
        this.$message.success("添加成功");
        this.addVarity = false;
        this.getLargeKind();
      }
    },
    async getLargeKind() {
      let res = await this.$fetch("/admin/api/v1/largeKindList", {}, "POST");
      if (res.code == 200) {
        this.varityOptions = [];
        res.data.forEach(item => {
          this.varityOptions.push({
            value: item.id,
            label: item.name
          });
        });
      }
    },
    async addKind() {
      let data = {
        largeId: this.dataForm.varityValue,
        maxPrice: this.dataForm.maxPrice,
        minPrice: this.dataForm.minPrice,
        name: this.dataForm.kind,
        pic: this.imgPath
      };
      if (this.rowData) {
        data.id = this.rowData.id;
      }
      let res = await this.$fetch("/admin/api/v1/kindSave", data, "POST");
      if (res.code == 200) {
        this.$message.success("操作成功");
        this.back(true);
      }
    },
    async deleteBigType() {
      let res = await this.$fetch("/admin/api/v1/largeKindDel", {
        id: this.dataForm.varityValue
      }, "POST");
      if (res.code == 200) {
        this.$message.success("删除成功");
        this.dataForm.varityValue = '';
        this.getLargeKind();
      }
    },
    setData() {
      this.dataForm.varityValue = this.rowData.largeId;
      this.dataForm.kind = this.rowData.name;
      this.dataForm.minPrice = this.rowData.minPrice;
      this.dataForm.maxPrice = this.rowData.maxPrice;
      if (this.rowData.pic) {
        this.imgPath = this.rowData.pic;
        this.imageUrl =
          this.productUrl + "/admin/api/v1/img/" + this.rowData.pic;
      }
    },
    back(needFresh) {
      this.$emit("back", needFresh);
    },
    handleRemove(file) {},
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.imgPath = res.data;
        this.imageUrl = URL.createObjectURL(file.raw);
      }
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
    width: 840px;
    margin-left: 20px;
    .add-varity-wrapper {
      display: flex;
      width: 710px;
      height: 80px;
      background: #f9f9f9;
      align-items: center;
      margin-top: 20px;
      margin-left: -100px;
    }
  }
  .box-num {
    width: 100px;
    display: inline-block;
  }
  .el-form-item__label {
    font-weight: bold;
  }
  .avatar-uploader .el-upload {
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 14px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
