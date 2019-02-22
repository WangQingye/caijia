<template>
  <div class="add-stock-out">
    <p class="title">{{ editId ? '编辑资讯' : '新增资讯'}}</p>
    <el-form
      ref="infoForm"
      :model="infoForm"
      label-width="120px"
      label-position="left"
      class="form"
    >
      <el-form-item label="标题">
        <el-input
          v-model="infoForm.title"
          placeholder="标题内容在1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="资讯类型">
        <el-select
          v-model="infoForm.type"
          placeholder="请选择资讯类型"
        >
          <el-option
            v-for="item in infoTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容来源">
        <p>{{infoForm.remote}}</p>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio
          v-model="infoForm.status"
          label="1"
        >启用</el-radio>
        <el-radio
          v-model="infoForm.status"
          label="2"
        >停用</el-radio>
      </el-form-item>
      <!-- <el-form-item label="发布时间">
        <el-date-picker
          v-model="infoForm.publishDate"
          type="datetime"
          placeholder="选择发布时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="资讯内容">
        <quill-editor
          v-model="infoForm.content"
          ref="myQuillEditor"
        >
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="addInfo"
        >确认发布</el-button>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "add-stock-out",
  data() {
    return {
      infoForm: {
        title: "",
        type: "",
        remote: "至臻信链",
        status: "",
        content: "",
        publishDate: ""
      },
      codes: ["001", "002"],
      logisticsCompanys: [],
      infoTypes: [
        {
          label: "新闻动态",
          value: "1"
        },
        {
          label: "信链资讯",
          value: "2"
        },
        {
          label: "媒体视角",
          value: "3"
        }
      ]
    };
  },
  props: {
    editId: {
      default: null
    }
  },
  mounted() {
    if (this.editId) this.getNewsById(this.editId);
  },
  methods: {
    back(needRefresh) {
      this.$emit("back", needRefresh);
    },
    async addInfo() {
      let data = {
        newRm: this.infoForm.remote,
        newsContent: this.infoForm.content,
        newsStatus: this.infoForm.status,
        newsTitle: this.infoForm.title,
        newsType: this.infoForm.type
        // publishTime: this.infoForm.publishDate
      };
      let url;
      if (this.editId) {
        data.id = this.editId;
        url = "/newsController/editNews";
      } else {
        url = "/newsController/addNews";
      }
      let res = await this.$fetch(url, data, "POST");
      this.$message.success("操作成功");
      this.back(true);
    },
    async getNewsById(id) {
      let res = await this.$fetch("/newsController/queryNewsById", { id });
      console.log(res);
      this.infoForm.title = res.data.newsTitle;
      this.infoForm.type = res.data.newsType;
      this.infoForm.remote = res.data.newRm;
      this.infoForm.status = res.data.newsStatus;
      this.infoForm.content = res.data.newsContent;
      this.infoForm.publishDate = res.data.publishTime;
    }
  },
  components: {
    quillEditor
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.title {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.form {
  width: 800px;
  margin: 0 auto;
}
.box-num {
  width: 100px;
  display: inline-block;
}
</style>
