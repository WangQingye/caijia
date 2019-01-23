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
      <el-row class="mana-buttons">
        <el-button type="primary" @click="showAddCode=true">添加</el-button>
        <el-button type="danger">删除</el-button>
      </el-row>
      <el-table
        ref="codeTable"
        :data="codeData"
        style="width: 100%"
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
          width="160"
          align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="auto"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="manuCode(scope.row)"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="codeData.length"
        :page-change="pageChange"
      ></pagination>
    </div>
    <div v-if="showAddCode">
      <p class="title">批次号申请</p>
      <el-form
        ref="addCodeForm"
        :model="addCodeForm"
        label-width="80px"
        class="addCodeForm"
      >
        <el-form-item label="仓储机构">
          <el-select
            v-model="addCodeForm.storeOrg"
            placeholder="请选择仓储机构"
          >
            <el-option
              v-for="(org,index) in storeOrgs"
              :key="index"
              :label="org"
              :value="org"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库编号">
          <el-input v-model="addCodeForm.storeNum"></el-input>
        </el-form-item>
        <el-form-item label="农产种类">
          <el-select
            v-model="addCodeForm.goodBigType"
            placeholder="请选择农产种类"
          >
            <el-option
              v-for="(type,index) in goodBigTypes"
              :key="index"
              :label="type"
              :value="type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="农产品种">
          <el-select
            v-model="addCodeForm.goodType"
            placeholder="请选择农产品种"
          >
            <el-option
              v-for="(type,index) in goodTypes"
              :key="index"
              :label="type"
              :value="type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量">
          <el-input
            type="number"
            v-model="addCodeForm.num"
            :style="'display:inline-block;width:200px'"
          ></el-input><span> 吨</span>
        </el-form-item>
        <el-form-item label="产地">
          <el-input
            placeholder="请输入产品产地"
            v-model="addCodeForm.sourcePlace"
          ></el-input>
        </el-form-item>
        <el-form-item label="产摘时间">
          <el-date-picker
            v-model="addCodeForm.pickTime"
            type="date"
            placeholder="请选择产摘时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="addCodeForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onAddSubmit"
          >提交申请</el-button>
          <el-button @click="showAddCode=false">返回列表</el-button>
        </el-form-item>
      </el-form>
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
          code: "1",
          store: "顺丰",
          storeNum: "A01",
          type: "红心猕猴桃",
          desc: "非常好都江堰猕猴桃企业都江堰猕猴桃企业都江堰猕猴桃企业",
          num: "100吨",
          company: "都江堰猕猴桃企业",
          state: "审核中"
        },
        {
          code: "1",
          store: "顺丰",
          storeNum: "A01",
          type: "红心猕猴桃",
          desc: "非常好",
          num: "100吨",
          company: "都江堰猕猴桃企业",
          state: "审核中"
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
      addCodeForm: {
        storeOrg: "",
        storeNum: "",
        goodBigType: "",
        goodType: "",
        num: "",
        sourcePlace: "",
        pickTime: "",
        desc: "",
        company: "都江堰水果公司"
      },
      storeOrgs: ["仓储公司1", "仓储公司2"],
      goodBigTypes: ["浆果类", "干果类"],
      goodTypes: ["苹果", "橘子"]
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
    onAddSubmit(){

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
