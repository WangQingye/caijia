<template>
  <div class="codeMana">
    <div v-if="!showAddCode">
      <p class="text">批次号</p>
      <el-select
        v-model="searchCode"
        placeholder="请选择要搜索的批次号"
        style="margin:0 20px;"
      >
        <el-option
          v-for="(code,index) in codes"
          :key="index"
          :label="code"
          :value="code"
        ></el-option>
      </el-select>
      <p class="text">箱码</p>
      <el-input
        class="search-input"
        v-model="searchBoxNum"
        placeholder="请输入要搜索的箱码"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
      >搜索</el-button>
      <el-row class="mana-buttons">
        <el-button
          type="primary"
          @click="showAddCode=true"
        >填报信息</el-button>
      </el-row>
      <el-table
        ref="codeTable"
        :data="codeData"
        style="width: 100%"
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
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="manuCode(scope.row)"
              type="text"
              size="small"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="codeData.length"
        :page-change="pageChange"
      ></pagination>
    </div>
    <div v-if="showAddCode">
      <add-logistics v-if="userType == 1" @back="showAddCode=false"></add-logistics>
      <add-stock-out v-if="userType == 2" @back="showAddCode=false"></add-stock-out>
      <add-verify v-if="userType == 3" @back="showAddCode=false"></add-verify>
    </div>
  </div>
</template>

<script>
// import fetch from "@/assets/js/Fetch.js";
import Pagination from "@/components/Pagination.vue";
import AddLogistics from "@/components/AddLogistics.vue";
import AddStockOut from "@/components/AddStockOut.vue";
import AddVerify from "@/components/AddVerify.vue";
export default {
  data() {
    return {
      searchCode: "",
      searchBoxNum: "",
      userType: 3,
      showAddCode: false,
      codeData: [
        {
          company: "都江堰猕猴桃企业",
          code: "1",
          boxNum: "",
          type: "入库",
          desc: "猕猴桃采摘时间",
          report: "无",
          date: "2018-12-26",
          person: "小张"
        },
        {
          company: "都江堰猕猴桃企业",
          code: "1",
          boxNum: "",
          type: "检测",
          desc: "欧陆分析农产品检测，检测结果：合格",
          report: "无",
          date: "2018-12-26",
          person: "小张"
        },
        {
          company: "都江堰猕猴桃企业",
          code: "1",
          boxNum: "0001-0002",
          type: "出库",
          desc: "物流企业:物流企业1",
          report: "无",
          date: "2018-12-26",
          person: "小张"
        },
        {
          company: "都江堰猕猴桃企业",
          code: "1",
          boxNum: "0001-0002",
          type: "物流",
          desc: "始发地:成都 目的地:北京",
          report: "无",
          date: "2018-12-26",
          person: "小张"
        },
      ],
      labels: [
        {
          name: "农企",
          prop: "company"
        },
        {
          name: "批次号",
          prop: "code"
        },
        {
          name: "箱码",
          prop: "boxNum"
        },
        {
          name: "溯源类别",
          prop: "type"
        },
        {
          name: "描述",
          prop: "desc",
          width:"auto"
        },
        {
          name: "报告",
          prop: "report"
        },
        {
          name: "时间",
          prop: "date"
        },
        {
          name: "责任人",
          prop: "person"
        }
      ],
      codes: ['001','002']
    };
  },
  mounted() {
    // this.getTem();
  },
  methods: {
    handleSelectionChange() {
      console.log(1);
    },
    manuCode() {
      console.log(1);
    },
    pageChange(page) {
      console.log(page);
    },
    onAddSubmit() {}
  },
  components: {
    Pagination,
    AddLogistics,
    AddStockOut,
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
