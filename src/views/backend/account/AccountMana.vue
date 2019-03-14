<template>
  <div class="codeMana">
    <div v-if="!showAddCode">
      <el-row class="mana-buttons">
        <el-button
          type="primary"
          @click="showCodeAdd"
        >添加新账号</el-button>
      </el-row>
      <el-table
        ref="codeTable"
        :data="codeData"
        style="width: 100%"
      >
        <el-table-column
          v-for="(item,index) in labels"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          show-overflow-tooltip
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="item.prop == 'usable'">
              {{scope.row.usable ? '启用中' : '停用'}}
            </p>
            <p v-else>
              {{scope.row[item.prop]}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="auto"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="manuAccount(scope.row)"
              type="text"
              size="small"
            >{{scope.row.usable ? '停用' : '启用'}}</el-button>
            <el-button
              type="text"
              size="small"
              @click="manuAccount(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="dataTotalLength"
        @page-change="pageChange"
      ></pagination>
    </div>
    <div v-if="showAddCode">
      <p class="title">子账号添加</p>
      <el-form
        :rules="rules"
        ref="addAccountForm"
        :model="addAccountForm"
        label-width="80px"
        class="addCodeForm"
      >
        <el-form-item
          label="账户名"
          prop="account"
        >
          <el-input
            v-model="addAccountForm.account"
            placeholder="请输入登录账号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="addAccountForm.password"
            type="password"
            placeholder="请输入账号密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="repassword"
        >
          <el-input
            v-model="addAccountForm.repassword"
            type="password"
            placeholder="请确认账号密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系人"
          prop="contact"
        >
          <el-input
            v-model="addAccountForm.contact"
            placeholder="请输入联系人"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话"
          prop="phone"
        >
          <el-input
            v-model="addAccountForm.phone"
            placeholder="请输入联系电话"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="addAccount"
          >提交申请</el-button>
          <el-button @click="showAddCode=false">返回列表</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import PageMixin from "@/assets/js/pageMixin";
export default {
  mixins: [PageMixin],
  data() {
    return {
      searchCode: "",
      showAddCode: false,
      codeData: [],
      labels: [
        {
          name: "账号名",
          prop: "account"
        },
        {
          name: "修改时间",
          prop: "createTime"
        },
        {
          name: "联系人",
          prop: "name"
        },
        {
          name: "联系电话",
          prop: "phone"
        },
        {
          name: "状态",
          prop: "usable"
        }
      ],
      addAccountForm: {
        account: "",
        password: "",
        repassword: "",
        contact: "",
        phone: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入账号密码", trigger: "blur" }
        ],
        repassword: [
          { required: true, message: "请确认账号密码", trigger: "blur" }
        ],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }]
      },
      storeOrgs: [],
      goodBigTypes: [],
      goodTypesBefore: [],
      goodTypes: []
    };
  },
  mounted() {
    this.getCodeList(1);
  },
  methods: {
    /* 获取批次号列表 */
    async getCodeList(page) {
      let res = await this.$fetch(
        "/user/getAllUsers",
        {
          limit: this.pageLimit,
          page: page
        },
        "GET",
        "user"
      );
      if (res.code == 0) {
        this.codeData = res.data.userPOList;
        this.dataTotalLength = res.data.totalCount;
      }
    },
    /* 添加批次号 */
    async addAccount() {
      this.$refs.addAccountForm.validate(async valid => {
        if (valid) {
          if (this.addAccountForm.password !== this.addAccountForm.repassword) {
            this.$message.error("两次输入的密码不一致");
            return;
          }
          let data = {
            account: this.addAccountForm.account,
            confirmPassword: this.addAccountForm.repassword,
            name: this.addAccountForm.contact,
            password: this.addAccountForm.password,
            phone: this.addAccountForm.phone
          };
          let res = await this.$fetch("/user/addUser", data, "POST", "user");
          if (res.code == 0) {
            this.$message.success("添加成功");
            this.showAddCode = false;
            this.getCodeList(1);
          }
        }
      });
    },
    async manuAccount(account) {
      let url, data;
      if (typeof account == "object") {
        url = "/user/disableOrEnableUser";
        data = {
          id: account.id,
          usable: !account.usable
        };
      } else {
        url = "/user/deleteUser";
        data = { id: account };
      }
      let res = await this.$fetch(url, data, "POST", "user");
      if (res.code == 0) {
        this.$message.success("操作成功");
        this.getCodeList(1);
      }
    },
    /* 展示批次号申请界面 */
    showCodeAdd() {
      this.showAddCode = true;
    },
    manaAccount() {}
  },
  components: {
    Pagination
  }
};
</script>
<style lang="scss" scoped>
.codeMana {
  text-align: left;
}
.text {
  font-size: 16px;
  display: inline-block;
}
.search-input {
  width: 200px;
  margin: 0 20px;
}
.mana-buttons {
  margin: 20px 0;
}
.addCodeForm {
  width: 400px;
  margin: 20px auto;
}
.title {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
