<template>
  <div class="data-detail">
    <div v-if="showFlag == 1">
      <el-row
        :gutter="0"
        class="search"
      >
        <el-col :span="2">
          <p class="search-text">采价点</p>
        </el-col>
        <el-col :span="3">
          <el-select
            v-model="placeValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in placeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <p class="search-text">产品来源</p>
        </el-col>
        <el-col :span="3">
          <el-select
            v-model="originValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in originOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <p class="search-text">采价品种</p>
        </el-col>
        <el-col :span="3">
          <el-select
            v-model="kindValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in kindOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <p class="search-text">采集时间</p>
        </el-col>
        <el-col
          :span="9"
          :xl="6"
        >
          <el-date-picker
            v-model="timeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <p class="search-text">搜索</p>
        </el-col>
        <el-col
          :span="3"
          :xl="4"
        >
          <el-input
            class="search-input"
            placeholder="采价人"
            v-model="searchText"
          ></el-input>
        </el-col>
        <el-col
          :span="2"
          :xl="8"
        >
          <el-button
            class="search-button"
            type="primary"
            size="small"
            @click="getCodeList(1,true)"
          >查找</el-button>
        </el-col>
      </el-row>
      <!-- <el-button
        class="add-button"
        type="danger"
        size="small"
      >删除</el-button> -->
      <el-button
        class="add-button"
        size="small"
        @click="downloadExcel"
      >导出</el-button>
      <el-table
        ref="codeTable"
        :data="codeData"
        style="width: 100%; margin-top:40px"
        class="my-table"
        border
      >

        <el-table-column
          fixed
          label="序号"
          width="100"
          align="center"
        >
          <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) * pageLimit + 1}} </span></template>
        </el-table-column>
        <!-- <el-table-column
          type="selection"
          width="90"
          align="center"
        >
          <template slot="header">
            <p>全选</p>
          </template>
        </el-table-column> -->
        <el-table-column
          v-for="(item,index) in labels"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          show-overflow-tooltip
          :width="item.width||'120'"
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="item.prop == 'gatherTime'">
              {{scope.row[item.prop] && fixTime(scope.row[item.prop])}}
            </p>
            <p v-else-if="item.prop == 'price'">
              <span
                v-if="scope.row.abnormal == 1"
                style="color:red"
              >采价异常</span>
              <span v-else>{{scope.row[item.prop]}}</span>
            </p>
            <p v-else-if="item.prop == 'status'">
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
              @click="checkType(scope.row)"
              type="text"
              size="small"
            >查看</el-button>
            <el-button
              @click="editType(scope.row)"
              type="text"
              size="small"
              :disabled="scope.row.abnormal == 1"
            >编辑</el-button>
            <el-button
              @click="deleteData(scope.row)"
              type="text"
              style="color:red"
              size="small"
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
    <edit-data
      v-if="showFlag == 2"
      :rowData="editData"
      @back="editBack"
    ></edit-data>
    <check-data
      v-if="showFlag == 3"
      :rowData="checkData"
      @back="editBack"
    ></check-data>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination.vue";
import PageMixin from "@/assets/js/pageMixin";
import EditData from "@/components/EditData.vue";
import CheckData from "@/components/CheckData.vue";
export default {
  mixins: [PageMixin],
  data: () => {
    return {
      labels: [
        {
          name: "采集时间",
          prop: "gatherTime",
          width: 160
        },
        {
          name: "采价点",
          prop: "point",
          width: 300
        },
        {
          name: "GPS定位",
          prop: "gpsLocation",
          width: 300
        },
        {
          name: "采价人",
          prop: "userName"
        },
        {
          name: "采集品种",
          prop: "kindName"
        },
        {
          name: "离地价格",
          prop: "price"
        },
        {
          name: "产品来源",
          prop: "origin"
        }
      ],
      codeData: [
        {
          gather_time: "2019.06.29 12:30",
          locationId: "温江",
          gpsLocation: "温江",
          userId: "小王",
          kindId: "大白菜11",
          price: "10",
          originId: "露地蔬菜",
          gather_num: 10
        },
        {
          gather_time: "2019.06.29 12:30",
          locationId: "温江",
          gpsLocation: "温江",
          userId: "小王",
          kindId: "大白菜",
          price: "10",
          originId: "露地蔬菜",
          gather_num: 10
        },
        {
          gather_time: "2019.06.29 12:30",
          locationId: "温江",
          gpsLocation: "温江",
          userId: "小王",
          kindId: "大白菜",
          price: "10",
          originId: "露地蔬菜",
          gather_num: 10
        },
        {
          gather_time: "2019.06.29 12:30",
          locationId: "温江",
          gpsLocation: "温江",
          userId: "小王",
          kindId: "大白菜",
          price: "10",
          originId: "露地蔬菜",
          gather_num: 10
        },
        {
          gather_time: "2019.06.29 12:30",
          locationId: "温江",
          gpsLocation: "温江",
          userId: "小王",
          kindId: "大白菜",
          price: "10",
          originId: "露地蔬菜",
          gather_num: 10
        }
      ],
      placeOptions: [{ value: "", label: "不限" }],
      originOptions: [
        { value: "", label: "不限" },
        { value: "露地蔬菜", label: "露地蔬菜" },
        { value: "大棚蔬菜", label: "大棚蔬菜" }
      ],
      kindOptions: [{ value: "", label: "不限" }],
      originValue: "",
      placeValue: "",
      kindValue: "",
      timeValue: [],
      editData: {},
      checkData: {},
      showFlag: 1,
      searchText: ""
    };
  },
  mounted() {
    this.getCodeList(1);
    this.getLocation();
    this.getKind();
  },
  methods: {
    async getCodeList(page, isFromSearch) {
      if (isFromSearch) page = 1;
      let res = await this.$fetch(
        "/admin/api/v1/gatherSearch",
        {
          gatherStartTime: this.timeValue[0] || "",
          getherEndTime: this.timeValue[1] || "",
          point: this.placeValue,
          origin: this.originValue,
          kind: this.kindValue,
          pageNo: page,
          pageSize: this.pageLimit,
          search: this.searchText
        },
        "POST"
      );
      if (res.code == 200) {
        this.codeData = res.data.list;
        this.currentPage = page;
        this.dataTotalLength = res.data.count;
      }
    },
    async downloadExcel() {
      let res = await this.$fetch(
        "/admin/api/v1/gatherExcel",
        {
          gatherStartTime: this.timeValue[0] || "",
          getherEndTime: this.timeValue[1] || "",
          point: this.placeValue,
          origin: this.originValue,
          kind: this.kindValue,
          search: this.searchText
        },
        "POST"
      );
      if (!res) return;
      var a = document.createElement("a");
      var url = window.URL.createObjectURL(res);
      a.href = url;
      a.download = `采集数据.xls`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    async getLocation() {
      let res = await this.$fetch(
        "/admin/api/v1/locationSearch",
        {
          page: 1,
          pageSize: 100
        },
        "POST"
      );
      if (res.code == 200) {
        res.data.list.forEach(item => {
          this.placeOptions.push({ value: item.point, label: item.point });
        });
      }
    },
    async getKind(page) {
      let res = await this.$fetch(
        "/admin/api/v1/kindSearch",
        {
          pageNo: 1,
          pageSize: 1000
        },
        "POST"
      );
      if (res.code == 200) {
        res.data.list.forEach(item => {
          this.kindOptions.push({ label: item.name, value: item.name });
        });
      }
    },
    editType(data) {
      this.$store.commit("setPaths", this.$store.state.paths.concat(["编辑"]));
      this.editData = data;
      this.showFlag = 2;
    },
    async deleteData(data) {
      let res = await this.$fetch(
        "/admin/api/v1/gatherDel",
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
    checkType(data) {
      this.$store.commit("setPaths", this.$store.state.paths.concat(["查看"]));
      this.checkData = data;
      this.showFlag = 3;
    },
    editBack(needFresh) {
      this.$store.commit("setPaths", this.$store.state.paths.slice(0, -1));
      this.showFlag = 1;
      if (needFresh) {
        this.getCodeList(this.currentPage);
      }
    },
    prefixZero(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
    fixTime(date) {
      let time = new Date(date);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let hour = time.getHours();
      let minute = time.getMinutes();
      let second = time.getSeconds();
      return (
        year +
        "-" +
        this.prefixZero(month, 2) +
        "-" +
        this.prefixZero(day, 2) +
        " " +
        this.prefixZero(hour, 2) +
        ":" +
        this.prefixZero(minute, 2) +
        ":" +
        this.prefixZero(second, 2)
      );
    }
  },
  components: {
    Pagination,
    EditData,
    CheckData
  }
};
</script>
<style lang="scss">
.data-detail {
  text-align: left;
  min-width: 1100px;
  .search {
    background: #f9f9f9;
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 0px;
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

