<template>
  <div class="contanier">
    <el-row class="header">
      <img
        src="../../src/assets/imgs/logo.png"
        alt=""
        class="header-img"
      >
      <p class="header-text">登录</p>
    </el-row>
    <section class="login-bg">
      <p class="title">农产品价格采集系统</p>
      <p class="main">为打造农业保险领域业界领先的蔬菜价格指数保险产品，对成都市各类农产品离地价格进行采集。</p>
      <i class="el-icon-phone logo"></i>
      <p class="phone">028-85314649</p>
    </section>
    <el-card
      class="login"
      v-if=isLogin
    >

      <div slot="header">
        <span class="title">后台登录</span>
      </div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-position="left"
        class="loginForm"
      >
        <el-form-item prop="account">
          <el-input
            v-model="loginForm.account"
            autocomplete="off"
            placeholder="企业账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            placeholder="登录密码"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item prop="verifyCode">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            placeholder="输入手机验证码"
          >
            <template slot="append">
              <el-button style="color: #39AC5F;background:white;width:112px;" v-if="!getVerifyTime" @click="getVerify">获取验证码</el-button>
              <el-button style="color: #39AC5F;background:white;width:112px;" v-else :disabled="true">{{getVerifyTime}} s</el-button>
            </template>
          </el-input>
        </el-form-item> -->
        <!-- <p
          class="forget-pass"
          style="text-align:right;margin-top:-10px;cursor:pointer"
        >忘记密码？</p> -->
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            :style="'width:342px;margin-top:30px'"
          >立即登录</el-button>
          <!-- <router-link to="/main">
            <p
              style="cursor:pointer;width:130px;margin:20px auto;"
              class="account-apply"
            >还没账号？去申请</p>
          </router-link> -->
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <section class="bottom">
      <img
        class="bottom-slogan"
        src="@/assets/imgs/slogan_gray.png"
        alt=""
      >
      <p class="bottom-text">Copyright © 2019 XINLIAN TECHNOLOGY OF CETC, All Rights Reserved. 蜀ICP备18030395号
      </p>
      <p>
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002001977"
          style="display:inline-block;text-decoration:underline;height:20px;line-height:30px;color:#757575"
        >川公网安备 51019002001977号
          <img
            src="@/assets/imgs/record-number.png"
            style="margin-left:5px;display:inline-block;height:16px;vertical-align: middle;margin-top:-5px;"
          /></a>
      </p>

    </section> -->
    <el-dialog
      title="绑定二级密码"
      :visible.sync="dialogVisible"
      width="30%"
    >
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
      },
      getVerifyTime: 0
    };
  },
  mounted() {
    // this.checkLogin();
  },
  methods: {
    async login() {
      let data = {
        userName: this.loginForm.account,
        password: this.loginForm.password
      };
      let res = await fetch("/admin/api/v1/login", data, "POST");
      if (res.code == 200) {
        this.$message.success({
          message: "登录成功",
          type: "success"
        });
        this.$store.commit("saveUserInfo", { userName: "admin", userId: 1 });
        this.$router.push({ path: "/datadetail" });
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
      console.log(data);
      let res = await this.$fetch("/user/signAccount", data, "POST", "user");
      if (res.code == 0) {
        this.login();
      }
    },
    getVerify() {
      this.getVerifyTime = 60;
      let interval = setInterval(() => {
        this.getVerifyTime--;
        if (!this.getVerifyTime) clearInterval(interval);
      }, 1000);
    }
  },
  watch: {},
  components: {}
};
</script>

<style lang="scss">
.contanier {
  width: 100%;
  min-width: 1200px;
  height: 660px;
  background: white;
  background: url("../../src/assets/imgs/bj-dengluweb.png");
  background-repeat: no-repeat;
  background-size: 1920px 660px;
  background-position: 0 60px;
  box-sizing: border-box;

  .el-card__header {
    border: none;
    padding: 10px 0;
  }
  .el-card__body {
    padding: 0px;
  }
  .login-bg {
    position: absolute;
    width: 760px;
    height: 280px;
    background: rgba(18, 147, 61, 0.6);
    margin-left: 20.4%;
    color: white;
    top: 215px;
    .title {
      font-size: 40px;
      font-weight: bold;
      margin-top: 50px;
    }
    .main {
      font-size: 16px;
      width: 570px;
      margin: 0 auto;
      margin-top: 24px;
    }
    .logo {
      margin-top:40px;
    }
    .phone {
      font-size: 18px;
      margin-top:5px;
    }
  }
}
.login {
  width: 442px;
  height: 360px;
  margin: 0 auto;
  margin-left: 60%;
  position: relative;
}
.title {
  font-size: 20px;
  display: inline-block;
  line-height: 50px;
  height: 50px;
}
.loginForm {
  width: 342px;
  margin: 0 auto;
  margin-top: 15px;
  .account-apply:hover {
    text-decoration: underline;
  }
  .forget-pass:hover {
    text-decoration: underline;
  }
}
.header {
  margin-bottom: 6%;
  width: 100%;
  height: 60px;
  text-align: left;
  padding-left: 20%;
  .header-img {
    display: inline-block;
    height: 40px;
    margin-top: 10px;
  }
  .header-text {
    display: inline-block;
    border-left: 1px solid #757575;
    font-size: 18px;
    line-height: 20px;
    color: #000;
    vertical-align: top;
    margin-top: 20px;
    padding-left: 30px;
    margin-left: 30px;
    font-weight: bold;
  }
}
.bottom {
  position: absolute;
  top: 800px;
  width: 100%;
  text-align: center;
  min-width: 500px;
  .bottom-slogan {
    width: 270px;
    margin-bottom: 10px;
  }
  .bottom-text {
    color: #757575;
    font-size: 14px;
  }
}
@media screen and (max-width: 1400px) {
  .contanier {
    background-size: 1366px 470px;
    height: 660px;
  }
  .header {
    margin-bottom: 4%;
  }
  .bottom {
    position: absolute;
    top: 600px;
  }
}
</style>
