<template>
  <div class="label-mana">
    <div
      v-show="!showDetails"
      class="label-generation">
      <el-row class="new-table">
        <el-button
          type="primary"
          @click="addSpec"
        >生成标签</el-button>
      </el-row>
      <el-row class="history-list">
        <p class="title">历史生成记录</p>
      </el-row>
      <el-table
        ref="labelData"
        :data="labelData"
        style="width: 100%"
        v-if="labelData"
        class="label-table"
      >
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
          width="200"
          align="center"
        >
        <template slot-scope="scope">
            <p v-if="item.prop == 'range'">
              {{scope.row.labelStart }}~{{scope.row.labelEnd}}
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
              @click="download(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.status == 1"
            >下载</el-button>
            <p v-else>待生成</p>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="dataTotalLength"
        @page-change="pageChange"
      >
      </pagination>
    </div>
    <div v-show="showDetails">
      <el-form
        ref="addLabelForm"
        :model="addLabelForm"
        label-width="80px"
        class="spec-Form"
      >
        <p class="title">标签生成</p>
        <el-form-item
          label="标签规格"
          prop="labSpecification"
        >
          <el-select
            v-model="addLabelForm.labSpecification"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.labSpecification"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="数量"
          prop="num">
          <el-input-number v-model="addLabelForm.generateNum" @change="handleChange" :min="1" :max="1000000" label="大于1的正整数"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="submitForm('addLabelForm')">确定</el-button>
          <el-button @click="resetForm('addLabelForm')">取消</el-button>
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
      showDetails: false,
      labels: [
        {
          name: "标签规格",
          prop: "labSpecification"
        },
        {
          name: "数量",
          prop: "generateNum"
        },
        {
          name: "范围",
          prop: "range"
        },
        {
          name: "标签生成时间",
          prop: "createTime"
        }
      ],
      labelData: [
        {
          labSpecification: "0A",
          num: "100",
          range: "00000001~00000100",
          generationTime: "2019.3.4 12:00",
          status:'0'
        },
        {
          labSpecification: "0B",
          num: "100",
          range: "00000001~00000100",
          generationTime: "2019.2.24 16:00",
          status:'1'
        }
      ],
      addLabelForm: {
        labSpecification: "",
        num: ""
      },
      options: [
        {
          value: "1",
          label: "0A"
        },
        {
          value: "2",
          label: "0B"
        },

        {
          value: "3",
          label: "0C"
        },
        {
          value: "4",
          label: "0D"
        },
        {
          value: "5",
          label: "0E"
        }
      ],
      createTime:new Date()
    };
  },
  mounted() {
    this.getCodeList(1);
  },
  methods: {
    addSpec(){
      this.showDetails=true;
      this.getSpecList();
    },
    async getCodeList(page, isFromSearch) {
        if (isFromSearch) page = 1;
        let res = await this.$fetch(
            "/labelManager/queryLabelCreatePage",
            {
            limit: this.pageLimit,
            page: page
            },
            "POST"
        );
        if (res.code == 0) {
            console.log(res)
            this.labelData = res.data.data;
            this.dataTotalLength = res.data.countSize;
        }
    },
    async getSpecList(){
      let res = await this.$fetch("/labelManager/findAllLabel","GET")
      if(res.code == 0){
        this.options =res.data
        console.log(this.options)
      }
    },
    download(row) {
      console.log(row);
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              this.labelCreate();
            } else {
            return false;
            }
        });
    },
    async labelCreate(){
      let res = await this.$fetch(
        "/labelManager/labelCreate",
        {
          createTime: this.createTime,
          generateNum: this.addLabelForm.generateNum,
          labelSpecificationId: this.addLabelForm.labSpecification,
          rm: 1
        },
        "POST"
      )
      if(res.code == 0){
        this.showDetails=false;
        this.$message({
            message: '标签生成成功！！',
            type: 'success'
        });
        this.getCodeList(1);
        this.addLabelForm={
          generateNum:'',
          labSpecification:''
        }
        console.log(this.addLabelForm)
      }else{
         this.$message({
            message: '标签生成失败！！',
            type: 'error'
        });
      }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
        this.showDetails=false;
        this.$message({
            message: '放弃新增标签规格操作',
            type: 'warning'
        });
    },
    handleChange(value) {
      console.log(value);
    }
  },
  components: {
    Pagination
  }
};
</script>

<style lang="scss" scoped>
.label-mana {
  text-align: left;
    .history-list{
            width: 100%;
            text-align: left;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            margin-top:20px;
    }
    .spec-Form {
        width: 800px;
        margin: 0 auto;
        .title {
            width: 100%;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
        }
    }
}
</style>

