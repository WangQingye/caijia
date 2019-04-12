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
      <el-table
        ref="codeTable"
        :data="codeData"
        style="width: 100%;margin-top:40px"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column> -->
        <el-table-column
          v-for="(item,index) in labels"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          show-overflow-tooltip
          :width="'160' || item.width"
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="item.prop == 'tagNum'">
              {{scope.row.boxNum * scope.row.perNum}}
            </p>
            <p v-else-if="item.prop == 'step'">
              {{scope.row.step == 4 ? '待审核' : '审核完成'}}
            </p>
            <p v-else>
              {{scope.row[item.prop]}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-if="scope.row.step == 4"
              @click="showAuditConfirm(scope.row,1)"
            >审核</el-button>
            <el-button
              @click="showAuditConfirm(scope.row,0)"
              type="text"
              size="small"
              v-else
              :disabled="false"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="dataTotalLength"
        @page-change="pageChange"
        :current-page="currentPage"
      ></pagination>
    </div>
    <div v-show="showAudit">
      <el-form
        ref="auditForm"
        :model="auditForm"
        label-width="130px"
        label-position="left"
        class="label-audit"
      >
        <p class="title">{{!confirmBtn? '溯源标签审核':'溯源标签查看'}}</p>
        <el-form-item label="农企">
          <p>{{auditForm.companyName}}</p>
        </el-form-item>
        <el-form-item label="批次号">
          <p>{{auditForm.batchCode}}</p>
        </el-form-item>
        <el-form-item label="箱码数量">
          <p>{{auditForm.boxNum}}</p>
        </el-form-item>
        <el-form-item label="果码数量">
          <p>{{auditForm.perNum}}</p>
        </el-form-item>
        <el-form-item label="收货地址">
          <p>{{auditForm.address}}</p>
        </el-form-item>
        <el-form-item label="联系人">
          <p>{{auditForm.contact}}</p>
        </el-form-item>
        <el-form-item label="电话号码">
          <p>{{auditForm.phone}}</p>
        </el-form-item>
        <div v-show="!confirmBtn">
          <el-form-item label="标签规格">
            <el-select
              v-model="auditForm.labelspec"
              placeholder="请选择标签规格"
              @change="changeSelect"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.labSpecification"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <p>支持最大果码数:{{maxFruitNum}}</p>
          </el-form-item>
          <el-form-item label="箱码标签数量">
            <el-input-number
              v-model="auditForm.boxLabelNum"
              @change="handleChange"
              :min="1"
              :max="100000000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="箱码标签范围">
            <el-row :gutter="20" class="boxRange">
              <el-input disabled  style="margin-left:10px;margin-right:15px" v-model="auditForm.rangStart" placeholder="最小箱码标签数"> </el-input>----
              <el-input disabled  style="margin-left:15px"  v-model="labelRangEnd" placeholder="最大箱码标签数"> </el-input>
            </el-row>

          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="verifyPass(1)">审核标签</el-button>
          </el-form-item>
        </div>
        <div v-show="confirmBtn">
          <el-form-item label="标签规格">
            <p>{{auditForm.labelspec}}</p>
          </el-form-item>
          <el-form-item label="箱码标签数量">
            <p>{{auditForm.labelNumber}}</p>
          </el-form-item>
          <el-form-item label="箱码标签范围">
            <p>{{auditForm.rangStart}}---{{auditForm.rangEnd}}</p>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="verifyPass(0)">确定</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <el-dialog
      title="审核操作"
      :visible.sync="dialogVisible"
      width="30%">
      <span>是否要通过此条溯源标签申请？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="auditApply(0)">不通过</el-button>
        <el-button
          type="primary"
          @click="auditApply(1)"
        >通 过</el-button>
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
      searchName: "",
      showAddCode: false,
      dialogVisible: false,
      showAudit: false,
      confirmBtn:false,
      auditForm: {
        companyName: "",
        batchCode: "",
        boxNum: "",
        perNum: "",
        address: "",
        contact: "",
        phone: "",
        labelspec: "",
        labelNumber: 100,
        rangStart: 1,
        rangEnd: 2
      },
      options: [],
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
          name: "箱码数量",
          prop: "boxNum"
        },
        {
          name: "果码数量",
          prop: "perNum"
        },
        {
          name: "农产种类",
          prop: "varietyName"
        },
        {
          name: "溯源码数量",
          prop: "tagNum"
        },
        {
          name: "状态",
          prop: "step"
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
      getTypes: ["快递", "自行打印"],
      nowRow: null,
      createTime:new Date(),
      maxFruitNum:'100'
    };
  },
  mounted() {
    this.getCodeList(1);
  },
  methods: {
    async getCodeList(page, isFromSearch) {
      if (isFromSearch) page = 1;
      let res = await this.$fetch(
        "/label/getAudit",
        {
          batchCode: this.searchCode,
          companyName: this.searchName,
          companyCode: this.$store.state.userInfo.companyCode,
          typeCode: this.$store.state.userInfo.typeCode,
          limit: this.pageLimit,
          page: page
        },
        "POST"
      );
      console.log(res);
      if (res.code == 0) {
        //console.log(res.data)
        this.codeData = res.data.data;
        this.dataTotalLength = res.data.countSize;
        //console.log(this.currentPage);
        this.currentPage = page;
        //console.log(this.currentPage);
      }
    },
    showAuditConfirm(row,num) {
      if(num !==1){
        this.confirmBtn=true
      }else{
        this.confirmBtn=false
        this.getSpecList();
      }
        this.showAudit = true;
        this.showAddCode = true;
        this.auditForm = row;
        //console.log(this.auditForm)
    },
    verifyPass(page){
      if(page == 1){
        this.dialogVisible = true;
        if(this.maxFruitNum < this.auditForm.boxNum ){
          this.$alert('申请的果码数已经超出该规格下支持的最大果码数', '提示', {
          confirmButtonText: '确定',
        });
        }
       console.log(this.auditForm)
      }else{
        this.showAudit=false;
        this.showAddCode=false;
        this.getCodeList(1)
        this.auditForm={
          companyName: "",
          batchCode: "",
          boxNum: "",
          perNum: "",
          address: "",
          contact: "",
          phone: "",
          labelspec: "",
          labelNumber: 1,
          labelrang: 1,
          rangEnd: 2
        }

      }

    },
    async auditApply(flag) {
      this.dialogVisible = false;
      let data = {
        account: this.$store.state.userInfo.account,
        action: "审核标签",
        actionId: this.auditForm.actionId,
        batchCode:this.auditForm.batchCode,
        companyCode: this.auditForm.companyCode,
        companyName:this.$store.state.userInfo.companyName,
        flowId: this.auditForm.flowId,
        labelCompanyCode: this.$store.state.userInfo.companyCode,
        labelCompanyName: this.$store.state.userInfo.companyName,
        labelReview:{
          actionId: this.auditForm.actionId,
          createTime:this.createTime,
          id:0,
          labelEnd:this.auditForm.rangEnd,
          labelStart:this.auditForm.rangStart,
          operUserId:this.$store.state.userInfo.id,
          reviewStatus:1,
          rm:13,
          specificationId:this.auditForm.labelspec,
        },
        labelUserId: this.$store.state.userInfo.id,
        labelTime:this.createTime,
        sign:'123',
        step:this.auditForm.step
      };
      this.$checkSign(data, async signData => {
        console.log(data);
        if (!signData) {
          signData = this.$signData(data, 4);
        }
        let res = await this.$fetch("/label/labelReview", signData, "POST");
        if (res.code == 0) {
          this.$message.success("操作成功！");
          this.getCodeList(1);
        }
      });
    },
    async getSpecList(){
      let res = await this.$fetch("/labelManager/findAllLabel","GET")
      if(res.code == 0){
        this.options =res.data
        //console.log(this.options)
      }
    },
    changeSelect(value){
       let obj ={};
       obj =this.options.find((item)=>{
         return item.id === value
       })
       this.maxFruitNum=obj.fruitNum
       this.auditForm.rangStart = (obj.rm)+1;
    },
    handleSelectionChange() {
      //console.log(1);
    },
    handleChange(value) {
     // console.log(value);
    },
    getZero(value){
      let pad ="00000000";
      value = pad.substring(0,pad.length - value.toString().length)+value;
      return value
    },
  },
  computed:{
    labelRangEnd(){
       this.auditForm.rangEnd = (this.auditForm.rangStart)+(this.auditForm.boxLabelNum);
       return  this.auditForm.rangEnd ? this.auditForm.rangEnd:'最小箱码标签数'
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
.addTagForm {
  width: 400px;
  margin: 20px auto;
}
.label-audit {
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
.boxRange{
  display: flex;
  .el-input{
    width:32%;
  }
}
</style>
