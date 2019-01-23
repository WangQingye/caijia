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
        <el-button
          type="primary"
          @click="showAddCode=true"
        >申请</el-button>
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
        <p class="title">溯源标签申请</p>
      <el-form
        ref="addTagForm"
        :model="addTagForm"
        label-width="80px"
        class="addTagForm"
      >
        <el-form-item label="批次号">
          <el-select
            v-model="addTagForm.code"
            placeholder="请选择批次号"
          >
            <el-option
              v-for="(code,index) in codes"
              :key="index"
              :label="code"
              :value="code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="农产种类">
            {{addTagForm.goodType}}
        </el-form-item>
        <el-form-item label="箱码数量">
          <el-input
            type="number"
            v-model="addTagForm.boxNum"
          ></el-input>
        </el-form-item>
        <el-form-item label="果码数量">
          <el-input
            type="number"
            v-model="addTagForm.singleNum"
          ></el-input>
        </el-form-item>
        <el-form-item label="取码方式">
          <el-select
            v-model="addTagForm.getType"
            placeholder="请选择取码方式"
          >
            <el-option
              v-for="(type,index) in getTypes"
              :key="index"
              :label="type"
              :value="type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="addTagForm.getType == '快递'" label="收货地址">
          <el-input
            placeholder="请输入收货地址"
            v-model="addTagForm.address"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="addTagForm.getType == '快递'" label="联系人">
          <el-input
            placeholder="请输入联系人"
            v-model="addTagForm.contact"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="addTagForm.getType == '快递'" label="电话号码">
          <el-input
            placeholder="请输入电话号码"
            v-model="addTagForm.phone"
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
          code: "001",
          boxNum: 64,
          singleNum: 10000,
          goodType: "红心猕猴桃",
          tagNum: 640000,
          state: "审核中",
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
.title {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
