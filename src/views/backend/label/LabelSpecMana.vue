<template>
    <div class="label-mana">
        <div v-show="!showDetails" class="spec-mana">
            <el-row class="label-spec">
                <el-button type="primary" @click="showDetails=true">新增</el-button>
            </el-row>
            <el-table
                ref="codeTable"
                :data="specData"
                style="width: 100%"
                v-if="specData"
                class="spec-table">
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
                width="200"
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

                </template>
                </el-table-column>
            </el-table>
            <pagination
                :total="dataTotalLength"
                        @page-change="pageChange"
        @size-change="sizeChange">
            </pagination>
        </div>
        <div v-show="showDetails">
            <el-form
            ref="addSpecForm"
            :model="addSpecForm"
            status-icon
            :rules="rules2"
            label-width="80px"
            class="spec-Form">
                <p class="title">新增标签规格</p>
                <el-form-item label="标签规格" prop="labSpecification">
                    <el-input
                        v-model="addSpecForm.labSpecification"
                        placeholder="两位的16进制数"
                    ></el-input>
                </el-form-item>
                <el-form-item label="箱码数量">
                    <p>{{addSpecForm.boxNum}}</p>
                </el-form-item>
                <el-form-item label="果码数量" prop="fruitNum">
                    <el-input-number v-model="addSpecForm.fruitNum" @change="handleChange" :min="1" :max="1000000" label="果码数量可为0"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button
                    type="primary"
                    @click="submitForm('addSpecForm')"
                    >确定</el-button>
                    <el-button @click="resetForm('addSpecForm')">取消</el-button>
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
    data (){
        var checkAge =(rule,value,callback) =>{
            if(!value){
                return callback(new Error('标签规格不能为空'))
            }
            setTimeout(()=>{
                let reg=/^[0-9A-F]|[0-9A-F]$/;
                if(!reg.test(value)){
                    callback(new Error('请输入两位的16进制数'))
                }else{
                    callback();
                }
            },100)


        };
        var validatePass = (rule, value, callback) => {
            if(!value){
                 return callback(new Error('箱码数量不能为空'))
            }else{
                if(!Number.isInteger(value) ){
                    callback(new Error('请输入数字值'));
                }else{
                    callback();
                }
            }

        };
        return {
            showDetails:false,
            specData:[],
            labels:[
                {
                    name: "标签规格",
                    prop: "labSpecification"
                },
                {
                    name: "箱码数量",
                    prop: "boxNum"
                },
                {
                    name: "果码数量",
                    prop: "fruitNum"
                },
            ],
            addSpecForm:{
                labSpecification:'',
                boxNum:1,
                fruitNum:''
            },
            rules2: {
                labSpecification: [
                    { validator: checkAge, trigger: 'blur' }
                ],
                fruitNum: [
                    { validator: validatePass, trigger: 'blur' }
                ],
            },
        }
    },
    mounted() {
        this.getCodeList(1);
    },
    methods :{
        async getCodeList(page, isFromSearch) {
            if (isFromSearch) page = 1;
            let res = await this.$fetch(
                "/labelManager/queryLabelSpecificationPage",
                {
                limit: this.pageLimit,
                page: page
                },
                "POST"
            );
            if (res.code == 0) {
                console.log(res)
                this.specData = res.data.data;
                this.dataTotalLength = res.data.countSize;
            }
        },
        addSpec(){
            this.showDetails=true;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addLabelSpec()
                } else {
                    return false;
                }
            });
        },
        async addLabelSpec(){
            let res = await this.$fetch(
                "/labelManager/addLabelSpecification",
                {
                    boxNum: this.addSpecForm.boxNum,
                    fruitNum: this.addSpecForm.fruitNum,
                    id: this.specData.id,
                    labSpecification: this.addSpecForm.labSpecification,
                    rm: this.specData.rm
                },
                "POST"
            )
            if(res.code == 0){
                 this.$message({
                    message: '新增标签规格成功！！',
                    type: 'success'
                });
                this.showDetails=false;
                 this.getCodeList(1);
                console.log(this.addSpecForm)
            }else{
                this.$message({
                    message: '溯源标签规格重复，请重新输入！！',
                    type: 'error'
                });
            }
        },
        handleChange(value) {
            //console.log(value);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.showDetails=false;
            this.$message({
                message: '放弃新增标签规格操作',
                type: 'warning'
            });
        }
    },
    components: {
        Pagination
    }
}
</script>

<style lang="scss" scoped>
.label-mana{
    text-align: left;
    .spec-Form{
        width:800px;
        margin: 0 auto;
        .title{
            width: 100%;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
        }
    }
}
</style>

