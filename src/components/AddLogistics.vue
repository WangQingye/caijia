<template>
  <div class="add-logistics">
    <p class="title">物流企业 - 物流信息填报</p>
    <el-form
      ref="logisticsForm"
      :model="logisticsForm"
      label-width="80px"
      class="form"
    >
      <el-form-item label="批次号">
        <!-- <el-select
          v-model="logisticsForm.code"
          placeholder="请选择批次号"
        >
          <el-option
            v-for="(code,index) in codes"
            :key="index"
            :label="code"
            :value="code"
          ></el-option>
        </el-select> -->
        <p>{{rowData.batchCode}}</p>
      </el-form-item>
      <el-form-item label="箱码">
        <!-- <el-input
          type="number"
          v-model="logisticsForm.boxNumStart"
          class="box-num"
        ></el-input> -->
        <p class="box-num" :style="'width:20px'">{{logisticsForm.boxNumStart}}</p>
        <span> ~ </span>
        <el-input
          type="number"
          v-model="logisticsForm.boxNumEnd"
          class="box-num"
        ></el-input>
      </el-form-item>
      <el-form-item label="溯源类别">
        <p>物流</p>
      </el-form-item>
      <el-form-item label="始发地" prop="startPlace">
        <el-input
          placeholder="请输入物流始发地"
          v-model="logisticsForm.startPlace"
        ></el-input>
      </el-form-item>
      <el-form-item label="目的地" prop="endPlace">
        <el-input
          placeholder="请输入物流目的地"
          v-model="logisticsForm.endPlace"
        ></el-input>
      </el-form-item>
      <el-form-item label="时间" prop="date">
        <el-date-picker
          v-model="logisticsForm.date"
          type="date"
          placeholder="请选择时间"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="责任人">
        <p>物流机构1</p>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="addTransInfo"
        >添加信息</el-button>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addLogistics",
  data() {
    return {
      logisticsForm: {
        code: "",
        boxNumStart: "",
        boxNumEnd: "",
        startPlace: "",
        endPlace: "",
        date: ""
      },
      codes: ["001", "002"]
    };
  },
  props: {
    rowData: {
      default: () => {
        return { batchCode: 0 };
      },
      type: Object
    }
  },
  methods: {
    onAddSubmit() {},
    back() {
      this.$emit("back");
    },
    async getBoxNum() {
      let res = await this.$fetch("/transfer/boxCountByCode", {
        actionId: this.rowData.id
      });
      this.logisticsForm.boxNumStart = res.data.curBoxNum || 0;
      this.logisticsForm.boxNumEnd = res.data.endBoxNum;
    },
    async addTransInfo() {
      let data = {
        batchCode: this.rowData.batchCode,
        startBoxNum: this.logisticsForm.boxNumStart,
        endBoxNum: this.logisticsForm.boxNumEnd,
        action: "物流信息",
        srcAddr: this.logisticsForm.startPlace,
        destAddr: this.logisticsForm.endPlace,
        transferTime: this.logisticsForm.date,
        actionId: this.rowData.id
      };
      this.$checkSign(data, async signData => {
        if (!signData) {
          signData = this.$signData(data, 7);
        }
        let res = await this.$fetch("/transfer/addTransfer", data, "POST");
        if (res.code == 0) {
          this.$message.success("添加成功");
          this.$refs.logisticsForm.resetFields();
          this.getBoxNum();
          this.$emit("back");
        }
      });
    }
  },
  watch: {
    "rowData.batchCode": {
      // immediate: true,
      handler: function(val) {
        this.getBoxNum();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.add-logistics {
}
.title {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.form {
  width: 400px;
  margin: 0 auto;
}
.box-num {
  width: 100px;
  display: inline-block;
}
</style>
