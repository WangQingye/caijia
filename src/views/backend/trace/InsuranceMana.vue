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
          placeholder="请选择保险状态"
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
             <p v-if="item.prop == 'step'">
                {{scope.row.step ==1 ? '入库' :(scope.row.step == 2 ? '检测' : (scope.row.step == 3 ? '申请' : (scope.row.step == 4 ? '出库' :'物流')))}}
            </p>
            <p v-else-if="item.prop == 'policyStatus'">
              {{scope.row.policyStatus == 0 ? '未承保' : (scope.row.policyStatus == 1 ? '已承保':(scope.row.policyStatus == 2 ? '已出险':(scope.row.policyStatus == 3 ? '已赔付' :'已失效')))}}
            </p>
            <p v-else-if="!scope.row[item.prop]">无</p>
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
                        2：已出险
                        3：已赔付
                        4：已失效
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
              v-if="scope.row.policyStatus == 1 || scope.row.policyStatus == 2"
            >操作</el-button>
            <el-button
              @click="consumerInfos(scope.row)"
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
        @size-change="sizeChange"
      ></pagination>
    </div>
    <div
      v-show="showDetails"
      v-if="rowFrom">
      <add-policy @cancelBtn="cancelBtn" :rowFrom="rowFrom"></add-policy>
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
        <p class="title">保险机构 - 更改承保状态</p>
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
          <p>{{renderTime(detailData.storeTime)}}</p>
        </el-form-item>
        <el-form-item label="描述">
          <p>{{detailData.policyRemark}}</p>
        </el-form-item>
        <el-form-item label="保单号">
          <p>{{detailData.policyNum}}</p>
        </el-form-item>
        <el-form-item label="文件">
          <!-- <p>{{detailData.fileList}}</p> -->
          <ul>
            <li v-for="(item,index) in fileArry" :key="index"><a :href="productUrl+item">{{item}}.txt</a></li>
          </ul>
        </el-form-item>
        <el-form-item label="产品等级">
          <p>{{detailData.productLevel}}</p>
        </el-form-item>
        <el-form-item label="承保时间">
          <p>{{renderTime(detailData.policyDate)}}</p>
        </el-form-item>
        <el-form-item label="保险状态">
          <p>{{detailData.policyStatus == 1 ? '已承保' :'已出险'}}</p>
        </el-form-item>
        <el-form-item label="保险状态变更">
          <el-select
            v-model="policyStatus"
             v-if="detailData.policyStatus == 1"
            placeholder="请选择保险状态"
          >
            <el-option
              v-for="item in policyStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="policyStatus"
             v-if="detailData.policyStatus == 2"
            placeholder="请选择保险状态"
          >
            <el-option
              v-for="item in policyStatusOptions2"
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
            v-model="detailData.policyRemark"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="changeStatus"
          >确定</el-button>
          <el-button @click="goBack">取消</el-button>
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
        <p class="title">保险机构 - 消费者信息</p>
        <el-form-item
          class="inputMsg"
          label="农企"
        >
          <p>{{detailData.companyName}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="批次号"
        >
          <p>{{detailData.batch}}</p>
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
          <p>{{renderTime(detailData.storeTime)}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="描述"
        >
          <p>{{detailData.policyRemark}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="保单号"
        >
          <p>{{detailData.policyNum}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="文件"
        >
          <ul>
            <li v-for="(item,index) in fileArry" :key="index">保单{{index+1}}.txt</li>
          </ul>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="产品等级"
        >
          <p>{{detailData.productLevel}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="承保时间"
        >
          <p>{{renderTime(detailData.policyDate)}}</p>
        </el-form-item>
        <el-form-item
          class="inputMsg"
          label="保险状态"
        >
          <p>{{detailData.policyStatus == 1 ? '已承保' :(detailData.policyStatus == 2 ? '已出险' : (detailData.policyStatus == 3 ? '已赔付' : '已失效'))}}</p>
        </el-form-item>
      </el-form>
      <el-table
        :data="consumerData"
        border
        style="width: 100%"
        id="consumer"
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
      <pagination
        :total="dataTotalLength"
                @page-change="pageChange"
        @size-change="sizeChange"
      ></pagination>
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
            @click="comeBack"
          >确定</el-button>
          <el-button @click="exportList">导出</el-button>
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
import AddPolicy from '@/components/AddPolicy'
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  mixins: [PageMixin],
  data() {
    return {
      searchCode: "",
      policyStatus:'',
      insuranceStateCode: "",
      showDetails: false,
      insuranceForm: false,
      showOperation: false,
      showInformation: false,
      dialogVisible:false,
      policyStatusChange:false,
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
      rowFrom:null,
      consumerData: [],
      detailData:{},
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
      policyStatusOptions:[
        {
          value: "1",
          label: "已承保",
        },
        {
          value: "2",
          label: "已出险",
        },
        {
          value: "4",
          label: "已失效",
        },
      ],
      policyStatusOptions2:[
         {
          value: "2",
          label: "已出险",
        },
        {
          value: "3",
          label: "已赔付",
        },
      ],
      fileList: [],
      productUrl: window.productUrl,
      fileArry:[]
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
    underwrite(data) {//承保
      this.showDetails = true;
      this.insuranceForm = true;
      this.rowFrom = data;
      console.log(data);
    },
    operation(data) {//操作
      this.showOperation = true;
      this.insuranceForm = true;
      this.detailData = data;
      console.log(this.detailData);
      this.fileArry=this.getFileList(this.detailData.fileList)

    },
    consumerInfos(data) {//查看消费者信息
      this.showInformation = true;
      this.insuranceForm = true;
      this.detailData = data;
      this.allUserPolicy();
      this.fileArry=this.getFileList(this.detailData.fileList)
      console.log(data)
    },
    async allUserPolicy(page){
      page=1
      let res = await this.$fetch(
        "/policy/queryAllUserOfPolicy",
        {
          flowId:this.detailData.id,
          limit:this.pageLimit,
          page:page,
        },
        "POST"
      )
      if (res.code == 0) {
        this.consumerData = res.data.data;
        this.dataTotalLength = res.data.countSize;
        console.log(res.data)
      }
    },
    async changeStatus() {
      let data ={
        flowId: this.detailData.flowId,
        id: this.detailData.id,
        policyRemark: this.detailData.policyRemark,
        policyStatus:  this.policyStatus,
        fileList: this.detailData.fileList,
        loginUserCompany: this.$store.state.userInfo.companyCode,
        loginUserId: this.$store.state.userInfo.id,
        policyDate: this.detailData.policyDate,
        policyNum:  this.detailData.policyNum,
        policyRe:  this.detailData.policyRe,
        productLevel:  this.detailData.productLevel,
      }
       this.$checkSign(data, async signData => {
         if (!signData) {
            signData = this.$signData(data, 4);
         }
         let res = await this.$fetch( "/policy/updatePolicyStatus",signData, "POST" );
          if (res.code == 0) {
            this.$message({
                message: '产品保险状态已改变！！',
                type: 'success'
            });
            this.$refs.detailData.resetFields();
            this.comeBack();
          }else if(res.code == 500){
             this.$message({
                message: '服务连接异常！！',
                type: 'error'
            });
          }
       })

    },
    async exportList(){
      console.log(this.detailData)
      let res = await this.$fetch("/policy/export",{ flowId:this.detailData.flowId})
      if (!res) return;
      console.log(res)
      var a = document.createElement("a");
      var url = window.URL.createObjectURL(res);
      a.href = url;
      a.download = `消费者信息${this.detailData.flowId}.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    getFileList(data){
       return data.split(",")
    },
    cancelBtn(flag){
      this.showDetails = false;
      this.insuranceForm=false;
      this.showOperation = false;
      this.showInformation = false;
      if (flag) {
        this.getCodeList(1);
      }
    },
    goBack(){
      this.showDetails = false;
      this.showOperation = false;
      this.showInformation = false;
      this.insuranceForm = false;
      this.getCodeList(1)
      this.$refs.detailData.resetFields();
    },
    comeBack() {
      this.showDetails = false;
      this.showOperation = false;
      this.showInformation = false;
      this.insuranceForm = false;
      this.getCodeList(1)

    },
    //定义导出Excel表格事件
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#consumer"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
      });
      try {
          FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "sheetjs.xlsx"
          );
      } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }

  },
  components: {
    Pagination,
    AddPolicy
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

