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
          <template slot-scope="scope">
            <el-button
              @click="manuCode(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.state == '审核通过'"
            >查看</el-button>
            <el-button
              type="text"
              size="small"
              v-else
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
          boxNum: 64,
          singleNum: 10000,
          goodType: "红心猕猴桃",
          tagNum: 640000,
          state: "审核通过",
        },
        {
          code: "001",
          boxNum: 64,
          singleNum: 10000,
          goodType: "红心猕猴桃",
          tagNum: 160000,
          state: "审核中",
        }
      ],
      labels: [
        {
          name: "批次号",
          prop: "code"
        },
        {
          name: "箱码数量",
          prop: "boxNum"
        },
        {
          name: "果码数量",
          prop: "singleNum"
        },
        {
          name: "农产种类",
          prop: "goodType"
        },
        {
          name: "溯源码数量",
          prop: "tagNum"
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
