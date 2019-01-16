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
        name: this.loginUser,
        password: this.loginPass
      };
      this.loading = true;
      let res = await fetch("/loginInSystem", data, "POST");
      this.loading = false;
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: "登陆成功",
          type: "success"
        });
        this.$router.push({ path: "/main" });
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
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
          this.$router.push({path:'/backend'})
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  watch: {},
  components: {}
};
</script>

<style scoped>
.login {
  width: 500px;
  height: 300px;
  margin: 0 auto;
  margin-top: 200px;
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
