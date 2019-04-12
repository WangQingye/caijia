<template>
  <div class="codeMana">
    <div v-if="!showAddCode">
      <p class="text">企业名称</p>
      <el-input
        class="search-input"
        v-model="searchName"
        placeholder="请输入要搜索的企业名称"
      ></el-input>
      <p class="text">批次号</p>
      <el-input
        class="search-input"
        v-model="searchCode"
        placeholder="请输入要搜索的批次号"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getCodeList(1,true)"
      >搜索</el-button>
      <!-- <el-row class="mana-buttons">
        <el-button
          type="primary"
          @click="showSourceFill"
        >填报信息</el-button>
      </el-row> -->
      <el-table
        ref="codeTable"
        :data="codeData"
        style="width: 100%;margin-top:40px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-for="(item,index) in labels"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          show-overflow-tooltip
          :width="item.width||'160'"
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="item.prop == 'step'">
              {{calStatus(scope.row.step)}}
            </p>
            <el-button
              v-else-if="item.prop == 'report'"
              @click="showReport(scope.row)"
              type="text"
              size="small"
            >查看</el-button>
            <p v-else-if="!scope.row[item.prop]">无</p>
            <p v-else>{{scope.row[item.prop]}}</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template
            slot-scope="scope"
            v-if="1< scope.row.step < 6"
          >
            <el-button
              @click="showSourceFill(scope.row)"
              type="text"
              size="small"
            >填报信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="dataTotalLength"
        @page-change="pageChange"
        :current-page="currentPage"
      ></pagination>
    </div>
    <div v-if="showAddInfo">
      <add-verify
        v-if="userType == 3"
        @back="onFillBack"
        :rowData="nowRow"
      ></add-verify>
    </div>
    <div
      v-show="showAddReport"
      v-if="showAddReport"
      class="add-report">
      <p class="title">检测机构 - 查看检测记录</p>
      <el-form
        class="form"
        :inline="true"
        :model="reportForm"
      >
        <el-form-item label="农企">
          <p>{{reportForm.companyName}}</p>
        </el-form-item>
        <el-form-item label="批次号">
          <p>{{reportForm.batch}}</p>
        </el-form-item>
        <el-form-item label="品类">
          <p>{{reportForm.varietyName}}</p>
        </el-form-item>
      </el-form>
      <el-table
        :data="reportData"
        border
        style="width:100%"
      >
        <el-table-column
          v-for="(item,index) in reportLabels"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          show-overflow-tooltip
          :width="item.width || 200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="report(scope.row)"
              type="text"
              size="small"
              v-if="item.prop == 'picList'"
            >{{scope.row.picList == '' ? '':'检测报告'}}</el-button>
            <p v-else-if="!scope.row[item.prop]">无</p>
            <p v-else>{{scope.row[item.prop]}}</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template
            slot-scope="scope"
            v-if=" scope.row.currentUserOperation  == 1"
          >
            <el-button @click="addTest(scope.row)">添加检测报告</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row
        class="el-row-btn"
        :gutter="20"
      >
        <el-col
          :span="12"
          :offset="10"
        >
          <el-button @click="onFillBack">返回列表</el-button>
        </el-col>
      </el-row>
    </div>
    <img-viewer
      ref="imgViewer"
      :showFlag="showImgList"
      :imgList="reportList"
    ></img-viewer>
    <el-dialog
      title="添加检测报告"
      :visible.sync="importDialog"
      width="30%">
      <el-form ref="importForm">
        <el-form-item>
          <el-upload
            ref="upload"
            drag
            :action="productUrl + '/list/upload'"
            :file-list="fileList"
            :on-success="addTestFile"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="importDialog = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitUpload"
          >确定上传</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import PageMixin from "@/assets/js/pageMixin";
import AddVerify from "@/components/AddVerify.vue";
import ImgViewer from "@/components/ImgViewer.vue";
export default {
  mixins: [PageMixin],
  data() {
    return {
      searchCode: "",
      searchName: "",
      userType: 3,
      showAddCode: false,
      showAddInfo: false,
      showAddReport: false,
      importDialog: false,
      codeData: [],
      importForm: {},
      reportForm: {
        companyName: "农企09",
        batchCode: "009",
        varietyName: "黑莓"
      },
      reportData: [],
      labels: [
        {
          name: "农企",
          prop: "companyName"
        },
        {
          name: "批次号",
          prop: "batch"
        },
        {
          name: "品种",
          prop: "varietyName"
        },
        {
          name: "溯源状态",
          prop: "step"
        },
        {
          name: "检测记录",
          prop: "report"
        },
        {
          name: "时间",
          prop: "storeTime",
          width: 220
        }
      ],
      reportLabels: [
        {
          name: "检测机构",
          prop: "orgName"
        },
        {
          name: "检测时间",
          prop: "createTime",
          width: "auto"
        },
        {
          name: "描述",
          prop: "remark"
        },
        {
          name: "报告",
          prop: "picList"
        },
        {
          name: "责任人",
          prop: "handlerUser"
        }
      ],
      codes: ["001", "002"],
      nowRow: null,
      showImgList: false,
      reportList: [],
      fileList: [],
      productUrl: window.productUrl
    };
  },
  mounted() {
    // this.getTem();
    this.getCodeList(1);
  },
  methods: {
    async getCodeList(page, isFromSearch) {
      if (isFromSearch) page = 1;
      let res = await this.$fetch(
        "/check/queryCheckList",
        {
          page: page,
          limit: this.pageLimit,
          companyCode: this.$store.state.userInfo.companyCode,
          typeCode: this.$store.state.userInfo.typeCode,
          companyName: this.searchName,
          batchCode: this.searchCode
        },
        "POST"
      );
      console.log(res);
      if (res.code == 0) {
        this.codeData = res.data.data;
        this.dataTotalLength = res.data.countSize;
      }
    },
    showSourceFill(row) {
      this.showAddCode = true;
      this.showAddInfo = true;
      this.showAddReport = false;
      this.nowRow = row;
    },
    handleSelectionChange() {
      console.log(1);
    },
    showReport(data) {
      this.showAddCode = true;
      this.showAddReport = true;
      console.log(data);
      this.reportForm = data;
      this.queryCheckListForFlowId();
    },
    async queryCheckListForFlowId() {
      let res = await this.$fetch(
        "/check/queryCheckListForFlowId",
        {
          flowId: this.reportForm.flowId
        },
        "GET"
      );
      console.log(res);
      if (res.code == 0) {
        this.reportData = res.data;
      }
    },
    onFillBack(flag) {
      this.showAddCode = false;
      this.showAddInfo = false;
      this.showAddReport = false;
      if (flag) {
        this.getCodeList(1);
      }
    },
    calStatus(step) {
      let text;
      switch (step) {
        case 1:
          text = "入库待审核";
          break;
        case 2:
          text = "入库审核完成";
          break;
        case 3:
          text = "检测完成";
          break;
        case 4:
          text = "申请标签待审核";
          break;
        case 5:
          text = "标签审核完成";
          break;
        case 6:
          text = "出库中";
          break;
        case 7:
          text = "出库完成";
          break;
      }
      return text;
    },
    report(data) {
      console.log(data);
      this.$refs.imgViewer.show();
      this.reportList = data.picList.split(",").map(item => {
        return window.productUrl.replace("/zp_product_manager", "") + item;
      });
    },
    addTest(data) {
      console.log(data);
      this.importForm = data;
      this.importDialog = true;
    },
    async submitUpload() {
      console.log(this.importForm);
      let res = await this.$fetch(
        "/check/updateCheckPicAddr",
        {
          checkId: this.importForm.checkId,
          picList: this.importForm.picList
        },
        "GET"
      );
      if (res.code == 0) {
        console.log(res);
        this.importDialog = false;
        this.$refs.importForm.resetFields();
      }
    },
    addTestFile(res, file, fileList) {
      console.log(res);
      if (res.code == 0) {
        if (this.importForm.picList) {
          this.importForm.picList += ",";
        }
        this.importForm.picList += res.data;
        console.log(this.importForm.picList);
      }
      this.fileList = fileList;
      console.log(this.fileList);
    }
  },
  components: {
    Pagination,
    ImgViewer,
    AddVerify
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

.add-report {
  .title {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .form {
    width: 400px;
    margin: 0 auto;
  }
  .el-row-btn {
    margin-top: 20px;
  }
}
</style>
