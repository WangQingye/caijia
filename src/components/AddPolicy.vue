<template>
    <div>
      <el-form
        ref="addPolicyFrom"
        :model="addPolicyFrom"
        :rules="rules"
         status-icon
        label-width="130px"
        label-position="left"
        class="underwrite-form">
        <p class="title">保险机构 - 添加承保信息</p>
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
          <p>{{renderTime(rowFrom.storeTime)}}</p>
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
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="责任人">
          <p>{{this.$store.state.userInfo.companyName}}</p>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onAddSubmit('addPolicyFrom')"
          >确定</el-button>
          <el-button @click="back('addPolicyFrom')">取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        title="审核操作"
        :visible.sync="dialogVisible"
        width="30%">
        <span>是否要给此产品承保？</span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="acceptInsurance(0)">不承保</el-button>
          <el-button
            type="primary"
            @click="acceptInsurance(1)"
          >承保</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
      var checkNum = (rule,value,callback) => {
        if(!value){
          return callback(new Error('保单号不能为空！！'))
        }
        let timer = setInterval(()=>{
          let reg = /^(0|[0-9]\d*)\b/gm;
          if(!reg.test(value)){
            callback(new Error('请输入数字值！'))
          }else{
            callback()
          }
        },1000)
      }
      return {
        timer:null,
        addPolicyFrom:{
            filePath:'',
            policyDate:'',
            policyNum:'',
            policyRemark:'',
            productLevel:'',
        },
        rules:{
          policyNum: [
            { required: true,validator: checkNum, trigger: 'blur' }
          ],
          productLevel:[
            { required: true, message: '请输入产品等级', trigger: 'blur' },
            { min: 2, max: 7, message: '长度在 2 到 7 个字', trigger: 'blur' }
          ],
          policyDate:[
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        },
        fileList: [],
        productUrl: window.productUrl,
        dialogVisible:false,
         pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
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
        onAddSubmit(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.dialogVisible= true;
            } else {
              return false;
            }
          });

        },
        async acceptInsurance(){
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
            }
             console.log(data);
            this.$checkSign(data, async signData => {
              if (!signData) {
                signData = this.$signData(data, 10);
              }
               let res = await this.$fetch("/policy/acceptInsuranceBatch",signData, "POST")
                if (res.code == 0) {
                    this.$message({
                        message: '此批产品已被承保！！',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    this.back();
                }else if(res.code == 500){
                  this.$message({
                      message: '服务连接异常！！',
                      type: 'error'
                  });
                }
            });

        },
        back(formName) {
            this.$refs[formName].resetFields();
            this.cancelBtn();
        },
        cancelBtn(){
          this.$emit('cancelBtn',true)
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
    },
    destroyed(){
      clearInterval(this.timer)
      this.timer=null
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


