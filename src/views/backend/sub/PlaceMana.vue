<template>
  <div class="data-detail">
    <div v-if="showFlag == 1">
      <el-row
        :gutter="0"
        class="search"
      >
        <el-col :span="1">
          <p class="search-text">搜索</p>
        </el-col>
        <el-col :span="4">
          <el-input
            class="search-input"
            v-model="searchText"
            placeholder="采价点"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button
            class="search-button"
            type="primary"
            size="small"
            @click="getCodeList(1,true)"
          >查找</el-button>
        </el-col>
      </el-row>
      <el-button
        class="add-button"
        type="primary"
        size="small"
        @click="goAdd"
      >添加</el-button>
      <el-table
        ref="codeTable"
        :data="placeData"
        style="width: 100%; margin-top:40px"
        border
        class="my-table"
      >
        <el-table-column
          fixed
          label="序号"
          width="100"
          align="center"
        >
          <template scope="scope"><span>{{scope.$index+(currentPage - 1) * pageLimit + 1}} </span></template>
        </el-table-column>
        <el-table-column
          v-for="(item,index) in labels"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          show-overflow-tooltip
          :width="item.width||'260'"
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="item.prop == 'area'">
              {{`${scope.row.province} ${scope.row.city}`}}
            </p>
            <p v-else>{{scope.row[item.prop]}}</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="editPlace(scope.row)"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              @click="deletePlace(scope.row.id)"
              type="text"
              size="small"
              style="color:#f75959;margin-left:20px"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="dataTotalLength"
        @page-change="pageChange"
        @size-change="sizeChange"
      ></pagination>
    </div>
    <add-place
      @back="addBack"
      v-if="showFlag == 2"
      :rowData="clickData"
    ></add-place>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination.vue";
import AddPlace from "@/components/AddPlace.vue";
import PageMixin from "@/assets/js/pageMixin";
export default {
  mixins: [PageMixin],
  data: () => {
    return {
      labels: [
        {
          name: "所属地区",
          prop: "area"
        },
        {
          name: "采价点",
          prop: "point"
        }
      ],
      placeData: [
        { index: 1, area: "白菜", place: "温江" },
        { index: 1, area: "白菜", place: "温江" },
        { index: 1, area: "白菜", place: "温江" },
        { index: 1, area: "白菜", place: "温江" },
        { index: 1, area: "白菜", place: "温江" }
      ],
      showFlag: 1,
      searchText: ""
    };
  },
  mounted() {
    this.getCodeList(1);
  },
  methods: {
    async getCodeList(page, isFromSearch) {
      if (isFromSearch) page = 1;
      let res = await this.$fetch(
        "/admin/api/v1/locationSearch",
        {
          pageNo: page,
          pageSize: this.pageLimit,
          search: this.searchText
        },
        "POST"
      );
      if (res.code == 200) {
        this.placeData = res.data.list;
        this.currentPage = page;
        this.dataTotalLength = res.data.count;
      }
    },
    async deletePlace(id) {
      let res = await this.$fetch(
        "/admin/api/v1/locationDel",
        {
          id
        },
        "POST"
      );
      if (res.code == 200) {
        this.$message.success("操作成功");
        this.getCodeList(this.currentPage);
      }
    },
    async editPlace(data) {
      this.clickData = data;
      this.$store.commit("setPaths", this.$store.state.paths.concat(["编辑"]));
      this.showFlag = 2;
    },
    goAdd() {
      this.clickData = null;
      this.$store.commit("setPaths", this.$store.state.paths.concat(["添加"]));
      this.showFlag = 2;
    },
    addBack(flag) {
      this.$store.commit("setPaths", this.$store.state.paths.slice(0, -1));
      this.showFlag = 1;
      if (flag) {
        this.getCodeList(this.currentPage);
      }
    }
  },
  components: {
    Pagination,
    AddPlace
  }
};
</script>
<style lang="scss">
.data-detail {
  text-align: left;
  .search {
    background: #f9f9f9;
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    .search-text {
      text-align: center;
    }
    .search-button {
      margin-left: 20px;
    }
  }
  .add-button {
    margin-top: 20px;
  }
}
.my-table {
  thead {
    td,
    th,
    tr {
      background-color: #f9f9f9 !important;
    }
  }
}
</style>

