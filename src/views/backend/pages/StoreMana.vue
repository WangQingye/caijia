<template>
  <div class="codeMana">
    <div v-if="!showAddCode">
      <p class="text">批次号</p>
      <el-input
        class="search-input"
        v-model="searchCode"
        placeholder="请输入要搜索的批次号"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
      >搜索</el-button>
      <el-table
        ref="codeTable"
        :data="codeData"
        style="width: 100%;margin-top:40px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          v-for="(item,index) in labels"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          show-overflow-tooltip
          :width="'160' || item.width"
          align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope" v-if="scope.row.state == '审核中'">
            <el-button
              @click="manuCode(scope.row)"
              type="text"
              size="small"
            >审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="codeData.length"
        :page-change="pageChange"
      ></pagination>
    </div>
  </div>
</template>

<script>
// import fetch from "@/assets/js/Fetch.js";
import Pagination from "@/components/Pagination.vue";
export default {
  data() {
    return {
      searchCode: "",
      showAddCode: false,
      codeData: [
        {
          code: "001",
          store: "顺丰",
          storeNum: "A01",
          type: "红心猕猴桃",
          desc: "非常好都江堰猕猴桃企业都江堰猕猴桃企业都江堰猕猴桃企业",
          num: "100吨",
          company: "都江堰猕猴桃企业",
          state: "审核中"
        },
        {
          code: "002",
          store: "顺丰",
          storeNum: "A01",
          type: "红心猕猴桃",
          desc: "非常好都江堰猕猴桃企业都江堰猕猴桃企业都江堰猕猴桃企业",
          num: "100吨",
          company: "都江堰猕猴桃企业",
          state: "已入库"
        },
        {
          code: "003",
          store: "顺丰",
          storeNum: "A01",
          type: "红心猕猴桃",
          desc: "非常好都江堰猕猴桃企业都江堰猕猴桃企业都江堰猕猴桃企业",
          num: "100吨",
          company: "都江堰猕猴桃企业",
          state: "已出库"
        }
      ],
      labels: [
        {
          name: "批次号",
          prop: "code"
        },
        {
          name: "仓储机构",
          prop: "store"
        },
        {
          name: "仓库编号",
          prop: "storeNum"
        },
        {
          name: "农产品种类",
          prop: "type"
        },
        {
          name: "描述",
          prop: "desc"
        },
        {
          name: "数量",
          prop: "num"
        },
        {
          name: "所属企业",
          prop: "company"
        },
        {
          name: "状态",
          prop: "state"
        }
      ],
      addTagForm: {
        code: "",
        goodType: "红心猕猴桃",
        boxNum: "",
        singleNum: "",
        getType: "自行打印",
        address: "",
        contact: "",
        phone: ""
      },
      codes: ["001", "002"],
      getTypes: ["快递", "自行打印"]
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
.addTagForm {
  width: 400px;
  margin: 20px auto;
}
</style>
