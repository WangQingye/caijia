<template>
  <div>
    <div
      v-show="!showDetails"
      class="codeMana"
    >
      <el-row class="mana-buttons">
        <p class="text">企业名称</p>
        <el-input
          class="search-input"
          v-model="searchCode"
          placeholder="请输入要搜索的企业名称"
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="getCodeList(1,true)"
        >搜索</el-button>
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
          :width="item.width || 200"
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="item.prop == 'usable'">
              {{scope.row.usable ?
              '启用中' : scope.row.state == '1' ?
              '未启用' : ''}}
            </p>
            <p v-else-if="item.prop == 'state'">
              {{scope.row.state ? scope.row.state == '-1' ? '待审核' : '审核通过' : '未通过'}}
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
              @click="showDetail(scope.row)"
              type="text"
              size="small"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="dataTotalLength"
        @page-change="pageChange"
      ></pagination>
    </div>
    <div
      v-if="detailData"
      v-show="showDetails"
      class="details"
    >
      <p class="title">企业详情</p>
      <el-form
        ref="detailForm"
        label-width="130px"
        label-position="left"
        class="addCodeForm"
      >
        <el-form-item label="企业名称">
          <p>{{detailData.name}}</p>
        </el-form-item>
        <el-form-item label="统一社会信用代码">
          <p>{{detailData.ucode}}</p>
        </el-form-item>
        <el-form-item label="企业类型">
          <p>{{detailData.companyTypeName}}</p>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-card :body-style="{ padding: '0px'}">
            <img
              :style="'width:100%;margin-top:15px'"
              src="http://www.33lc.com/article/UploadPic/2012-7/201272713562117180.jpg"
              @click="window.open('http://www.33lc.com/article/UploadPic/2012-7/201272713562117180.jpg')"
            >
          </el-card>
          <el-card :body-style="{ padding: '0px' }">
            <img
              :style="'width:100%;margin-top:15px'"
              src="http://www.33lc.com/article/UploadPic/2012-7/201272713562117180.jpg"
              @click="window.open('http://www.33lc.com/article/UploadPic/2012-7/201272713562117180.jpg')"
            >
          </el-card>
        </el-form-item>
        <el-form-item label="联系人">
          <p>{{detailData.contacts}}</p>
        </el-form-item>
        <el-form-item label="联系电话">
          <p>{{detailData.phone}}</p>
        </el-form-item>
        <el-form-item label="企业账号">
          <p>{{detailData.account}}</p>
        </el-form-item>
        <el-form-item label="审核状态">
          <p>{{detailData.state ? detailData.state == '-1' ? '待审核' : '审核通过' : '未通过'}}</p>
        </el-form-item>
        <el-form-item
          label="审核时间"
          v-if="detailData.state == '1'"
        >
          <p>{{detailData.auditTime}}</p>
        </el-form-item>
        <el-form-item
          label="审核人员"
          v-if="detailData.state == '1'"
        >
          <p>admin</p>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="detailData.state == '-1'"
            type="primary"
            @click="manaAccout(1)"
          >审核通过</el-button>
          <el-button
            v-if="detailData.state == '-1'"
            type="danger"
            @click="manaAccout(0)"
          >审核不通过</el-button>
          <el-button @click="showDetails=false">返回列表</el-button>
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
      codeData: [],
      labels: [
        {
          name: "企业名称",
          prop: "name",
          width: "auto"
        },
        {
          name: "企业类型",
          prop: "companyTypeName"
        },
        {
          name: "审核状态",
          prop: "state"
        }
      ],
      showDetails: false,
      detailData: null,
      window: window
    };
  },
  mounted() {
    this.getCodeList(1);
  },
  methods: {
    /* 获取批次号列表 */
    async getCodeList(page, fromSearch) {
      if (fromSearch) page = 1;
      let res = await this.$fetch(
        "/company/getCompanyInfo",
        {
          limit: this.pageLimit,
          page: page,
          name: this.searchCode
        },
        "GET",
        "user"
      );
      if (res.code == 0) {
        this.codeData = res.data.companyVOList;
        this.dataTotalLength = res.data.totalCount;
      }
    },
    /* 展示详情页面 */
    showDetail(data) {
      this.showDetails = true;
      this.detailData = data;
    },
    async manaAccout(flag) {
      let url = flag
        ? "/company/auditCompanyPassSuccess"
        : "/company/auditCompanyPassFailure";
      let res = await this.$fetch(
        url,
        {
          id: this.detailData.id
        },
        "POST",
        "user"
      );
      if (res.code == 0) {
        this.$message.success("审核完成");
        this.showDetails = false;
        this.getCodeList(1);
      }
    },
    async enableAccount(data) {
      let res = await this.$fetch(
        "/company/disableOrEnableCompany",
        {
          id: data.id,
          usable: !data.usable
        },
        "POST",
        "user"
      );
      if (res.code == 0) {
        this.$message.success("操作成功");
        this.getCodeList(1);
      }
    },
    /**
     *  值，对应的标签，要查找的标签
     */
    findKindName(value, tag, find, arrName) {
      let a;
      this[arrName].forEach(item => {
        if (item[tag] == value) {
          a = item[find];
        }
      });
      return a;
    }
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
  margin: 0 0 20px 0;
}
.addCodeForm {
  width: 740px;
  margin: 20px auto;
  line-height: 40px;
  text-align: left;
  .el-card {
    display: inline-block;
    margin: 0 20px;
  }
  p {
    padding-left: 50px;
  }
}
.title {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>


