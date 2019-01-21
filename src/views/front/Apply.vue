<template>
  <div class="apply">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span class="title">企业申请入驻</span>
      </div>
      <el-form
        :model="applyForm"
        :rules="rules"
        ref="applyForm"
        label-width="140px"
        label-position="left"
        class="form"
      >
        <el-form-item
          label="企业名称"
          prop="name"
        >
          <el-input v-model="applyForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="统一社会信用代码"
          prop="code"
        >
          <el-input v-model="applyForm.code"></el-input>
        </el-form-item>
        <el-form-item
          label="企业类型"
          prop="type"
        >
          <el-select
            v-model="applyForm.type"
            placeholder="企业类型"
          >
            <el-option
              label="农企"
              value="1"
            ></el-option>
            <el-option
              label="检测机构"
              value="2"
            ></el-option>
            <el-option
              label="物流机构"
              value="3"
            ></el-option>
            <el-option
              label="仓储机构"
              value="4"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="营业执照"
          prop="certificate"
        >
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
        <el-form-item
          label="联系人"
          prop="person"
        >
          <el-input v-model="applyForm.person"></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话"
          prop="phone"
        >
          <el-input v-model="applyForm.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="企业账号"
          prop="account"
        >
          <el-input v-model="applyForm.account"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model="applyForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="repassword"
        >
          <el-input
            type="password"
            v-model="applyForm.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('applyForm')"
          >提交</el-button>
          <el-button @click="resetForm('applyForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "applyPage",
  data() {
    return {
      applyForm: {
        name: "",
        code: "",
        type: "",
        person: "",
        phone: "",
        account: "",
        password: "",
        repassword: ""
      },
      rules: {
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        code: [{ required: true, message: "请统一信用码", trigger: "blur" }],
        type: [{ required: true, message: "请选择企业类型", trigger: "blur" }],
        person: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
        account: [
          { required: true, message: "请输入企业账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入账号密码", trigger: "blur" }
        ],
        repassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ],
        certificate: [
          { required: true, message: "请上传营业执照", trigger: "blur" }
        ]
      },
      fileList: []
    };
  },
  mounted() {
    this.getOrgTypes();
  },
  props: {},
  methods: {
    async getOrgTypes() {
      let data = {
        name: applyForm.name,
        ucode: applyForm.code,
        typeCode: applyForm.type,
        licPic: '',
        // contacts:
      };
      let res = await this.$fetch("/companyType/getAllCompanyTypes");

    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.applyForm.password !== this.applyForm.repassword) {
            this.$message.error("两次密码不一致");
            return;
          }
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleFileChange() {}
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.apply {
  padding-top: 50px;
  padding-bottom: 50px;
  box-sizing: border-box;
  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
.box-card {
  width: 1000px;
  margin: 0 auto;
  .form {
    width: 500px;
    margin: 0 auto;
    text-align: left;
  }
}
</style>
