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
            >查看报告</el-button>
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
    <div v-if="showAddCode">
      <add-verify
        v-if="userType == 3"
        @back="onFillBack"
        :rowData="nowRow"
      ></add-verify>
    </div>
    <img-viewer ref="imgViewer" :showFlag="showImgList" :imgList="reportList"></img-viewer>
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
      codeData: [],
      labels: [
        {
          name: "农企",
          prop: "companyName"
        },
        {
          name: "批次号",
          prop: "batchCode"
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
          name: "描述",
          prop: "remark",
          width: "auto"
        },
        {
          name: "报告",
          prop: "report"
        },
        {
          name: "时间",
          prop: "storeTime"
        },
        {
          name: "责任人",
          prop: "userName"
        }
      ],
      codes: ["001", "002"],
      nowRow: null,
      showImgList: false,
      reportList: []
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
        "/check/noCheckList",
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
      if (res.code == 0) {
        this.codeData = res.data.data;
        this.dataTotalLength = res.data.countSize;
      }
    },
    showSourceFill(row) {
      this.showAddCode = true;
      this.nowRow = row;
    },
    handleSelectionChange() {
      console.log(1);
    },
    showReport(data) {
      this.$refs.imgViewer.show();
      this.reportList = data.picList.split(',').map(item=>{
        return window.productUrl.replace('/zp_product_manager', '') + item;
      });
    },
    onFillBack(flag) {
      this.showAddCode = false;
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
</style>
