<template>
  <div class="member-mana">
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
          placeholder="姓名/手机号"
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
    <el-table
      ref="codeTable"
      :data="userData"
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
        :width="item.width||'200'"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="item.prop == 'state'">
            <span
              style="width:5px;height:5px;background:#39ac5f;border-radius:50%;display:inline-block;vertical-align:middle;margin-right:5px"
              :style="'background:' + (scope.row[item.prop] == 0 ? '#39ac5f' : scope.row[item.prop] == 1 ? '#18b5e8' : '#f75959')"
            ></span>
            {{scope.row[item.prop] == 0 ? '审核中' : scope.row[item.prop] == 1 ? '启用' : '停用'}}
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
            @click="editType(scope.row)"
            type="text"
            size="small"
            v-if="scope.row['state'] !== 0"
          >{{scope.row['state'] == 1 ? '停用' : '启用'}}</el-button>
          <el-button
            @click="editType(scope.row, 1)"
            type="text"
            size="small"
            v-if="scope.row['state'] == 0"
          >通过</el-button>
          <el-button
            @click="editType(scope.row, 3)"
            type="text"
            size="small"
            v-if="scope.row['state'] == 0"
            style="color:rgb(245,108,108)"
          >拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="dataTotalLength"
      @page-change="pageChange"
      @size-change="sizeChange"
    ></pagination>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination.vue";
import PageMixin from "@/assets/js/pageMixin";
export default {
  mixins: [PageMixin],
  data: () => {
    return {
      labels: [
        {
          name: "微信号",
          prop: "openId"
        },
        {
          name: "姓名",
          prop: "name"
        },
        {
          name: "手机号",
          prop: "mobile"
        },
        {
          name: "身份证号",
          prop: "idNo",
          width: 300
        },
        {
          name: "采价点",
          prop: "point"
        },
        {
          name: "状态",
          prop: "state"
        }
      ],
      userData: [
        // {
        //   index: 1,
        //   wechat: "wangqingye003",
        //   phone: "13313331333",
        //   id: "510902193302279152",
        //   place: "温江",
        //   status: 0
        // },
        // {
        //   index: 1,
        //   wechat: "wangqingye003",
        //   phone: "13313331333",
        //   id: "510902193302279152",
        //   place: "温江",
        //   status: 1
        // },
        // {
        //   index: 1,
        //   wechat: "wangqingye003",
        //   phone: "13313331333",
        //   id: "510902193302279152",
        //   place: "温江",
        //   status: 2
        // },
        // {
        //   index: 1,
        //   wechat: "wangqingye003",
        //   phone: "13313331333",
        //   id: "510902193302279152",
        //   place: "温江",
        //   status: 0
        // },
        // {
        //   index: 1,
        //   wechat: "wangqingye003",
        //   phone: "13313331333",
        //   id: "510902193302279152",
        //   place: "温江",
        //   status: 0
        // }
      ],
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
        "/admin/api/v1/userSearch",
        {
          pageNo: page,
          pageSize: this.pageLimit,
          search: this.searchText
        },
        "POST"
      );
      if (res.code == 200) {
        this.userData = res.data.list;
        this.currentPage = page;
        this.dataTotalLength = res.data.count;
      }
    },
    async editType(data, status) {
      if (status === undefined) {
        status = data.state == 1 ? 2 : 1;
      }
      let res = await this.$fetch(
        "/admin/api/v1/userStatusChange",
        {
          id: data.id,
          status
        },
        "POST"
      );
      if (res.code == 200) {
        this.$message.success("操作成功");
        this.getCodeList(this.currentPage);
      }
    }
  },
  components: {
    Pagination
  }
};
</script>
<style lang="scss">
.member-mana {
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

