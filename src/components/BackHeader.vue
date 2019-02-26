<template>
  <div class="back-header">
    <p class="logo">
      <img
        class="logo-img"
        src="@/assets/imgs/single-logo.png"
        alt=""
      >信链臻品管理系统</p>
    <div class="header-right">
      <router-link
        to="/"
        class="back-main"
      >
        <p><i class="el-icon-menu"></i> 回到首页</p>
      </router-link>
      <div class="user-info">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{this.$store.state.userInfo.account}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">修改密码</el-dropdown-item>
            <el-dropdown-item command="1">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <p class="user-company">{{this.$store.state.userInfo.companyName}}</p>
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="showChangePass"
      :before-close="closeChangeForm"
      width="500px"
    >
      <el-form
        label-width="100px"
        label-position="left"
        :style="'width:400px;margin:0 auto'"
        :model="changePassForm"
        ref="changeForm"
      >
        <el-form-item label="账号">
          <p :style="'text-align:left'">{{this.$store.state.userInfo.account}}</p>
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input
            type="password"
            v-model="changePassForm.oldPass"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            type="password"
            v-model="changePassForm.newPass"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input
            type="password"
            v-model="changePassForm.reNewPass"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="closeChangeForm">取 消</el-button>
        <el-button
          type="primary"
          @click="changePass"
        >确认修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "back-header",
  data() {
    return {
      showChangePass: false,
      changePassForm: {
        oldPass: "",
        newPass: "",
        reNewPass: ""
      }
    };
  },
  props: {},
  methods: {
    async logOut() {
      let res = await this.$fetch("/user/logout", {}, "POST", "user");
      if (res.code == 0) {
        this.$message.success("退出登陆成功");
        this.$store.commit("clearUserInfo");
        this.$router.push({ path: "/login" });
      }
    },
    handleCommand(c) {
      if (c == 1) {
        this.logOut();
      } else if (c == 0) {
        this.showChangePass = true;
      }
    },
    closeChangeForm() {
      this.changePassForm = {
        oldPass: "",
        newPass: "",
        reNewPass: ""
      };
      this.showChangePass = false;
    },
    async changePass() {
      if (this.changePassForm.newPass !== this.changePassForm.reNewPass) {
        this.$message.error("两次输入的新密码不一致");
      } else {
        let res = await this.$fetch('/user/resetPassword', {
          account: this.$store.state.userInfo.account,
          passwordNew: this.changePassForm.newPass,
          passwordOld: this.changePassForm.oldPass
        }, 'POST', 'user');
        this.$message.success('修改成功');
        this.closeChangeForm();
      }
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.back-header {
  // background: red;
  min-width: 1000px;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 8px;
}
.logo {
  padding-top: 15px;
  font-size: 20px;
  font-weight: bold;
  .logo-img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-right: 10px;
  }
}
.header-right {
  display: flex;
  padding-top: 10px;
}
.back-main {
  padding-top: 10px;
  font-size: 14px;
  margin-right: 50px;
}
.user-info {
  .el-dropdown-link {
    cursor: pointer;
    font-size: 16px;
  }
  .user-company {
    color: #777;
    font-size: 12px;
    text-align: left;
  }
}
</style>
