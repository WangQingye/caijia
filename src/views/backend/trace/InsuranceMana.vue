<template>
  <div class="insurancemana">
    <div v-show="!insuranceForm">
      <el-row class="insurance">
        <p class="text">保单号</p>
        <el-input
          class="search-input"
          v-model="searchCode"
          placeholder="请输入要搜索的保单号"
        ></el-input>
        <p class="text">保险状态</p>
        <el-select
          class="insurance-state-change"
          v-model="insuranceStateCode"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="getCodeList(1,true)"
        >查找</el-button>
      </el-row>
      <el-table
        :data="codeData"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
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
            <!-- <p v-if="item.prop == 'step'">
              {{scope.row.step == 5 ? ''}}
            </p> -->
            <p v-if="item.prop == 'policyStatus'">
              {{scope.row.policyStatus == 0 ? '未承保' : (scope.row.policyStatus == 1 ? '已承保':(scope.row.policyStatus == 2 ? '已失效':(scope.row.policyStatus == 3 ? '已出险' :'已赔付')))}}
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
          <!-- policyStatus:{
                        0：未承保
                        1：已承保
                        2：已失效
                        3：已出险
                        4：已赔付
                } -->
          <template slot-scope="scope">
            <el-button
              @click="underwrite(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.policyStatus == 0"
            >承保</el-button>
            <el-button
              @click="operation(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.policyStatus == 1 || scope.row.policyStatus == 3"
            >操作</el-button>
            <el-button
              @click="showDetail(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.policyStatus == 1 || scope.row.policyStatus == 2||scope.row.policyStatus == 3 || scope.row.policyStatus == 4"
            >查看消费者信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="dataTotalLength"
        @page-change="pageChange"
      ></pagination>
    </div>
    <div
      v-show="showDetails"
      v-if="detailData">
      <el-form
        ref="detailForm"
        label-width="130px"
        label-position="left"
        class="underwrite-form"
      >
        <p class="title">添加承保信息</p>
        <el-form-item label="农企">
          <p>{{detailData.companyName}}</p>
        </el-form-item>
        <el-form-item label="批次号">
          <p>{{detailData.batch}}</p>
        </el-form-item>
        <el-form-item label="产品种类">
          <p>{{detailData.varietyName}}</p>
        </el-form-item>
        <el-form-item label="采摘时间">
          <p>{{detailData.sStoreTime}}</p>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="detailData.desc"
          ></el-input>
        </el-form-item>
        <el-form-item label="保单号">
          <el-input v-model="detailData.policyNum"></el-input>
        </el-form-item>
        <el-form-item label="文件">
          <el-upload
            class="upload-demo"
            :action="productUrl + '/list/upload'"
            :on-success="handleFileChange"
            :file-list="fileList"
            list-type="text"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品等级">
          <el-input v-model="detailData.proLevel"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="detailData.underwriteTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="责任人">
          <p>{{this.$store.state.userInfo.companyName}}</p>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >确定</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div
      v-show="showOperation"
      v-if="detailData">
      <el-form
        ref="detailData"
        label-width="130px"
        label-position="left"
        class="underwrite-form"
      >
        <p class="title">承保信息</p>
        <el-form-item label="农企">
          <p>{{detailData.companyTypeName}}</p>
        </el-form-item>
        <el-form-item label="批次号">
          <p>{{detailData.batchCode}}</p>
        </el-form-item>
        <el-form-item label="产品种类">
          <p>{{detailData.varietyName}}</p>
        </el-form-item>
        <el-form-item label="采摘时间">
          <p>{{detailData.sStoreTime}}</p>
        </el-form-item>
        <el-form-item label="描述">
          <p>{{detailData.desc}}</p>
        </el-form-item>
        <el-form-item label="保单号">
          <p>{{detailData.policyNumber}}</p>
        </el-form-item>
        <el-form-item label="文件">
          <p>保单01</p>
          <p>保单02</p>
        </el-form-item>
        <el-form-item label="产品等级">
          <p>{{detailData.proLevel}}</p>
        </el-form-item>
        <el-form-item label="承保时间">
          <p>{{detailData.underwriteTime}}</p>
        </el-form-item>
        <el-form-item label="保险状态">
          <p>{{detailData.state}}</p>
        </el-form-item>
        <el-form-item label="保险状态变更">
          <el-select
            v-model="detailData.state"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="detailData.desc1"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >确定</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div
      v-show="showInformation"
      v-if="detailData">
      <el-form
        :inline="true"
        ref="detailData"
        label-width="130px"
        label-position="left"
        class="underwrite-form"
      >
        <p class="title">承保信息</p>
        <el-form-item
          class="inputMsg"
          label="农企"
        >
          <p>{{detailData.companyTypeName}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="批次号"
        >
          <p>{{detailData.batchCode}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="产品种类"
        >
          <p>{{detailData.varietyName}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="采摘时间"
        >
          <p>{{detailData.sStoreTime}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="描述"
        >
          <p>{{detailData.desc}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="保单号"
        >
          <p>{{detailData.policyNumber}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="文件"
        >
          <p>保单1</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="产品等级"
        >
          <p>{{detailData.proLevel}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="承保时间"
        >
          <p>{{detailData.underwriteTime}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="保险状态"
        >
          <p>{{detailData.state}}</p>
        </el-form-item>
      </el-form>
      <el-table
        :data="consumerData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          v-for="(item,index) in label2"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          show-overflow-tooltip
          :width="item.width || 200"
          align="center"
        >
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
          <el-button
            type="primary"
            @click="back"
          >确定</el-button>
          <el-button>导出</el-button>
        </el-col>
      </el-row>

    </div>
    <el-dialog
      title="审核操作"
      :visible.sync="dialogVisible"
      width="30%">
      <span>是否要给此产品承保？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="auditApply(0)">不承保</el-button>
        <el-button
          type="primary"
          @click="auditApply(1)"
        >承保</el-button>
      </span>
    </el-dialog>
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
      insuranceStateCode: "",
      showDetails: false,
      insuranceForm: false,
      showOperation: false,
      showInformation: false,
      dialogVisible:false,
      insuranceState: "",
      codeData: [],
      labels: [
        {
          name: "批次号",
          prop: "batch",
          width: "auto"
        },
        {
          name: "农企",
          prop: "companyName"
        },
        {
          name: "数量 / 吨",
          prop: "num"
        },
        {
          name: "农产品种类",
          prop: "varietyName"
        },
        {
          name: "溯源状态",
          prop: "step"
        },
        {
          name: "保单号",
          prop: "policyNum"
        },
        {
          name: "保险状态",
          prop: "policyStatus"
        }
      ],
      consumerData: [
        {
          boxNum: "0001",
          consumerName: "小王",
          cardType: "工行",
          cardNum: "123456798",
          openingBank: "工行成都分支",
          location: "四川成都"
        },
        {
          boxNum: "0002",
          consumerName: "小李",
          cardType: "农行",
          cardNum: "1236984656",
          openingBank: "农行成都分支",
          location: "四川乐山"
        },
        {
          boxNum: "0003",
          consumerName: "小刘",
          cardType: "农行",
          cardNum: "23684326952",
          openingBank: "农行成都分支",
          location: "四川自贡"
        }
      ],
      label2: [
        {
          name: "箱码",
          prop: "boxNum",
          width: "auto"
        },
        {
          name: "姓名",
          prop: "consumerName",
          width: "auto"
        },
        {
          name: "卡类型",
          prop: "cardType",
          width: "auto"
        },
        {
          name: "银行卡号",
          prop: "cardNum",
          width: "auto"
        },
        {
          name: "开户行",
          prop: "openingBank",
          width: "auto"
        },
        {
          name: "位置",
          prop: "location",
          width: "auto"
        }
      ],
      detailData: {
        companyTypeName: "",
        batchCode: "",
        varietyName: "",
        sStoreTime: "2019.3.5",
        desc: "",
        policyNumber: "",
        batchCode: "",
        policyDate: "",
        state: "1",
        filePath:'',
        name: this.$store.state.userInfo.companyTypeName,
        productLevel: "特级"
      },
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "未承保"
        },
        {
          value: "1",
          label: "已承保"
        },
        {
          value: "2",
          label: "已出险"
        },
        {
          value: "3",
          label: "已赔付"
        },
        {
          value: "4",
          label: "已失效"
        }
      ],
      fileList: [],
      productUrl: window.productUrl
    };
  },
  mounted(){
    this.getCodeList(1)
  },
  methods: {
    async getCodeList(page, isFromSearch) {
      if (isFromSearch) page = 1;
      let res = await this.$fetch(
        "/policy/queryPolicyPage",
        {
          currentUserCompanyCode: this.$store.state.userInfo.companyCode,
          limit: this.pageLimit,
          page:page,
          policyNum:this.searchCode ,
          policyStatus:this.insuranceStateCode
        },
        "POST"
      );
      if (res.code == 0) {
        this.codeData = res.data.data;
        this.dataTotalLength = res.data.countSize;
        console.log(res.data)

      }
    },
    underwrite(data) {
      this.showDetails = true;
      this.insuranceForm = true;
      this.detailData = data;
      console.log(data);
    },
    operation(data) {
      this.showOperation = true;
      this.insuranceForm = true;
      this.detailData = data;
      console.log(data);
    },
    showDetail(data) {
      this.showInformation = true;
      this.insuranceForm = true;
    },
    async onSubmit() {
      let res = await this.$fetch(
        "/policy/acceptInsuranceBatch",
        {
          fileList:this.detailData.filePath,
          flowId:0,
          loginUserCompany:this.$store.state.userInfo.companyCode,
          loginUserId:this.$store.state.userInfo.companyCode,
          policyDate:this.detailData.underwriteTime,
          policyNum:this.detailData.policyNum,
          policyRe:this.detailData.desc,
          policyRemark:1,
          policyStatus:0,
          productLevel:this.detailData.proLevel,
          sign:13465,
        },
        "POST"
      )
      if (res.code == 0) {
        console.log(res.data)
      }
      //console.log(res.data)
    },
    back() {
      this.showDetails = false;
      this.showOperation = false;
      this.showInformation = false;
      this.insuranceForm = false;

    },
    handleFileChange(res, file, fileList) {
      if (res.code == 0) {
        if (this.detailData.filePath) {
          this.detailData.filePath += ",";
        }
        console.log(res.data)
        this.detailData.filePath += res.data;
        console.log(this.detailData.filePath)
      }
      this.fileList = fileList;
    },

  },
  components: {
    Pagination
  }
};
</script>


<style lang="scss" scoped>
.insurancemana {
  text-align: left;
  .insurance {
    margin: 0 0 20px 0;
    .text {
      font-size: 16px;
      display: 16px;
      display: inline-block;
    }
    .search-input {
      width: 300px;
      margin: 0 37px;
    }
  }
  .title {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .underwrite-form {
    width: 800px;
    margin: 0 auto;
  }
  .inputMsg {
    width: 46%;
  }
  .el-row-btn {
    margin-top: 40px;
  }
  .insurance-state-change {
    margin: 0 20px;
  }
}
</style>

