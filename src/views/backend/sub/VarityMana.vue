<template>
  <div class="place-mana">
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
            placeholder="品种"
            v-model="searchText"
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
        :data="kindData"
        style="width: 100%; margin-top:40px"
        border
        class="my-table"
      >
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
            <p v-if="item.prop == 'price'">
              {{`${scope.row.minPrice}~${scope.row.maxPrice}`}}
            </p>
            <p v-else-if="item.prop == 'step'">{{calStatus(scope.row.step)}}</p>
            <p v-else-if="!scope.row[item.prop]">无</p>
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
              @click="goEdit(scope.row)"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              @click="deleteKind(scope.row)"
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
    <add-type
      v-if="showFlag == 2"
      @back="addBack"
      :rowData="clickData"
    ></add-type>
  </div>
</template>
<script>
import AddType from "@/components/AddType.vue";
import Pagination from "@/components/Pagination.vue";
import PageMixin from "@/assets/js/pageMixin";
export default {
  mixins: [PageMixin],
  data: () => {
    return {
      labels: [
        {
          name: "序号",
          prop: "id"
        },
        {
          name: "采集大类",
          prop: "largeKindName"
        },
        {
          name: "采集品种",
          prop: "name"
        },
        {
          name: "价格范围(元/斤)",
          prop: "price"
        }
      ],
      kindData: [],
      showFlag: 1,
      searchText: "",
      clickData: null
    };
  },
  mounted() {
    this.getCodeList(1);
  },
  methods: {
    async getCodeList(page, isFromSearch) {
      if (isFromSearch) page = 1;
      let res = await this.$fetch(
        "/admin/api/v1/kindSearch",
        {
          pageNo: page,
          pageSize: this.pageLimit,
          search: this.searchText
        },
        "POST"
      );
      if (res.code == 200) {
        this.kindData = res.data.list;
        this.currentPage = page;
        this.dataTotalLength = res.data.count;
      }
    },
    async deleteKind(data) {
      let res = await this.$fetch(
        "/admin/api/v1/kindDel",
        {
          id: data.id
        },
        "POST"
      );
      if (res.code == 200) {
        this.$message.success("操作成功");
        this.getCodeList(this.currentPage);
      }
    },
    goAdd() {
      this.$store.commit("setPaths", this.$store.state.paths.concat(["添加"]));
      this.clickData = null;
      this.showFlag = 2;
    },
    goEdit(data) {
      this.$store.commit("setPaths", this.$store.state.paths.concat(["编辑"]));
      this.clickData = data;
      this.showFlag = 2;
    },
    addBack(needFresh) {
      this.$store.commit("setPaths", this.$store.state.paths.slice(0, -1));
      if (needFresh) {
        this.getCodeList(this.currentPage);
      }
      this.showFlag = 1;
    }
  },
  components: {
    Pagination,
    AddType
  }
};
</script>
<style lang="scss">
.place-mana {
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

