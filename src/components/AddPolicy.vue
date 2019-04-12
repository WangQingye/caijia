<template>
    <el-form
        ref="addPolicyFrom"
        :model="addPolicyFrom"
        label-width="130px"
        label-position="left"
        class="underwrite-form">
        <p class="title">添加承保信息</p>
        <el-form-item label="农企">
          <p>{{rowFrom.companyName}}</p>
        </el-form-item>
        <el-form-item label="批次号">
          <p>{{rowFrom.batch}}</p>
        </el-form-item>
        <el-form-item label="产品种类">
          <p>{{rowFrom.varietyName}}</p>
        </el-form-item>
        <el-form-item label="采摘时间">
          <p>{{rowFrom.storeTime}}</p>
        </el-form-item>
        <el-form-item label="描述" prop="policyRemark">
          <el-input
            type="textarea"
            v-model="addPolicyFrom.policyRemark"
          ></el-input>
        </el-form-item>
        <el-form-item label="保单号" prop="policyNum">
          <el-input v-model="addPolicyFrom.policyNum"></el-input>
        </el-form-item>
        <el-form-item label="文件">
          <el-upload
            class="upload-demo"
            :action="productUrl + '/list/upload'"
            :on-success="handleFileChange"
            :file-list="fileList"
            list-type="text"
            ref="imgUpload"
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
        <el-form-item label="产品等级" prop="productLevel">
          <el-input v-model="addPolicyFrom.productLevel"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="policyDate">
          <el-date-picker
            v-model="addPolicyFrom.policyDate"
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
            @click="onAddSubmit"
          >确定</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data(){
        return {
            addPolicyFrom:{
                filePath:'',
                policyDate:'',
                policyNum:'',
                policyRemark:'',
                productLevel:''
            },
            fileList: [],
            productUrl: window.productUrl
        }
    },
    props:{
        rowFrom:{
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    mounted(){

    },
    methods:{
        async onAddSubmit(){
            let data ={
                fileList:this.addPolicyFrom.filePath,
                flowId:this.rowFrom.flowId,
                loginUserCompany:this.$store.state.userInfo.companyCode,
                loginUserId:this.$store.state.userInfo.id,
                policyDate:this.addPolicyFrom.policyDate,
                policyNum:this.addPolicyFrom.policyNum,
                policyRe:1,
                policyRemark:this.addPolicyFrom.policyRemark,
                policyStatus:'1',
                productLevel:this.addPolicyFrom.productLevel,
                sign:13465,
            }
            let res = await this.$fetch("/policy/acceptInsuranceBatch",data, "POST")
            if (res.code == 0) {
                this.$message({
                    message: '此批产品已被承保！！',
                    type: 'success'
                });
                this.$refs.addPolicyFrom.resetFields();
                this.back();

            }
        },
        back() {
            this.$emit("back", true);
        },
        handleFileChange(res, file, fileList) {
            if (res.code == 0) {
                if (this.addPolicyFrom.filePath) {
                    this.addPolicyFrom.filePath += ",";
                    this.addPolicyFrom.filePath += res.data;
                    //console.log(this.addPolicyFrom.filePath)
                }else{
                    this.addPolicyFrom.filePath = res.data.join('');
                    //console.log(this.addPolicyFrom.filePath)
                }

            }
            this.fileList = fileList;
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>


