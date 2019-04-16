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
              v-for="(com,index) in companyTypes"
              :key="index"
              :label="com.name"
              :value="com.typeCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="营业执照正/副页"
          prop="certificate"
        >
          <el-upload
            class="upload-demo"
            :action="userUrl + '/company/fileUpload'"
            :on-success="handleFileChange"
            :before-upload="beforeUpload"
            :file-list="fileList"
            accept="image/png, image/jpeg"
            list-type="picture"
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
     <el-dialog
      title="绑定二级密码"
      :visible.sync="dialogVisible"
      width="30%">
      <p :style="'margin-bottom:20px'">此密码用于账户安全，仅输入一次，请务必牢记</p>
      <el-input
        v-model="privateKey"
        placeholder="请输入二级密码"
        type="password"
      ></el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="applyPk"
        >确 定</el-button>
      </span>
    </el-dialog>
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
        filePath: "",
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
        phone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { max: 13, message: "联系电话过长", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入企业账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入账号密码", trigger: "blur" }
        ],
        repassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ]
      },
      fileList: [],
      companyTypes: [],
      userUrl: window.userUrl,
      privateKey:'',
      dialogVisible:false
    };
  },
  mounted() {
    this.getOrgTypes();
  },
  props: {},
  methods: {
    async getOrgTypes() {
      let res = await this.$fetch(
        "/companyType/getAllCompanyTypes",
        {},
        "GET",
        "user"
      );
      if (res.code == 0) {
        this.companyTypes = res.data.companyTypes;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.applyForm.password !== this.applyForm.repassword) {
            this.$message.error("两次密码不一致");
            return;
          } else if (this.fileList.length < 2) {
            this.$message.error("请上传营业执照正、副两页");
            return;
          }
          this.addCompany();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.imgUpload.clearFiles();
    },
    handleFileChange(res, file, fileList) {
      if (res.code == 0) {
        if (this.applyForm.filePath) {
          this.applyForm.filePath += ",";
        }
        this.applyForm.filePath += res.data;

      }
      this.fileList = fileList;
    },
    beforeUpload(file) {
      if (file.size > 51200) {
        this.$message.error("图片过大");
        return false;
      }
    },
    async addCompany() {
      let data = {
        name: this.applyForm.name,
        ucode: this.applyForm.code,
        typeCode: this.applyForm.type,
        licPic: this.applyForm.filePath,
        contacts: this.applyForm.person,
        phone: this.applyForm.phone,
        account: this.applyForm.account,
        password: this.applyForm.password,
        confirmPassword: this.applyForm.repassword
      };
      console.log(this.applyForm)
      let res = await this.$fetch("/company/addCompany", data, "POST", "user");
      if (res.code === 0) {
        this.$store.commit("saveUserInfo", res.data);
        if (this.privateKey) {
          this.$store.commit(
            "savePrivateKey",
            api.apiDecESk(this.privateKey, res.data.esk)
          );
        }
        this.$alert("提交成功，审核通过后将通过电话联系您。", "提交成功", {
          confirmButtonText: "确定",
          callback: action => {
            this.$router.push({ path: "/main" });
          }
        });
      }else if(res.code == 301){
        this.dialogVisible =true;
      }
    },
    async applyPk() {
      let key = api.apiKeyGen(this.privateKey);
      let sign = api.apiSign(this.loginForm.account, key.sk);
      let data = {
        account: this.loginForm.account,
        esk: key.esk,
        password: this.loginForm.password,
        pk: api.apiGetTransPk(key.pk),
        sign: api.apiGetTransSign(sign)
      };
      console.log(data)
      let res = await this.$fetch("/user/signAccount", data, "POST", "user");
      if (res.code == 0) {
        this.addCompany();
      }
    }
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
