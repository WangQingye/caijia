<template>
  <div class="contanier">
    <el-card
      class="login"
      v-if=isLogin
    >
      <div slot="header">
        <span class="title">信链臻品 - 后台登陆</span>
      </div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="80px"
        label-position="left"
        class="loginForm"
      >
        <el-form-item
          label="账号"
          prop="account"
        >
          <el-input
            v-model="loginForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            :style="'width:200px;margin-left:-50px'"
          >登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      title="绑定二级密码"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <p :style="'margin-bottom:20px'">此密码用于账户安全，仅输入一次，请务必牢记</p>
      <el-input
        v-model="privateKey"
        placeholder="请输入二级密码"
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
// import menu1 from '@/assets/menu1.png';
// import List from '@/components/List.vue';
import fetch from "@/assets/js/fetch";
export default {
  name: "login",
  data() {
    return {
      isLogin: true,
      loginUser: null,
      dialogVisible: false,
      privateKey: "",
      loginForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    // this.checkLogin();
  },
  methods: {
    async login() {
      let data = {
        account: this.loginForm.account,
        password: this.loginForm.password
      };
      let res = await fetch("/user/login", data, "POST", "user");
      if (res.code == 0){
        this.$message.success({
          message: "登陆成功",
          type: "success"
        });
        this.$store.commit("saveUserInfo", res.data);
        console.log(this.privateKey);
        if (this.privateKey) {
          this.$store.commit("savePrivateKey", api.apiDecESk(this.privateKey,res.data.esk));
        }
        this.$router.push({ path: "/backend" });
      } else if (res.code == 301) {
        this.dialogVisible = true;
      }
    },
    async checkLogin() {
      let res = await fetch("/checkIsLogin");
      console.log(res);
      if (res.code == 200) {
        this.$router.push({ path: "/main" });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
      let res = await this.$fetch("/user/signAccount", data, "POST", "user");
      if (res.code == 0) {
        this.login();
      }
    }
  },
  watch: {},
  components: {}
};
</script>

<style scoped>
.contanier {
  width: 100%;
  height: 100vh;
  background: white;
  background: url('../../src/assets/imgs/bj1.jpg');
  background-repeat: no-repeat;
  background-size: 100% auto;
  padding-top: 15%;
  box-sizing: border-box;
}
.login {
  width: 500px;
  height: 300px;
  margin: 0 auto;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.loginForm {
  width: 400px;
  margin: 0 auto;
  margin-top: 15px;
}
</style>
