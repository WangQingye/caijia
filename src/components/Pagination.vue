<template>
  <el-pagination
    background
    @current-change="handleCurrentChange"
    @size-change="sizeChange"
    :current-page.sync="currentPage"
    :page-size="pageLimit"
    :page-sizes="[5, 10, 20]"
    layout="sizes, next, pager, prev"
    :total="total"
    class="pagination"
  >
  </el-pagination>
</template>

<script>
import PageMixin from "@/assets/js/pageMixin";
export default {
  mixins: [PageMixin],
  name: "Header",
  data() {
    return {
      currentPage: 1,
      pageLimit: 10
    };
  },
  props: {
    total: {
      default: 20,
      type: Number
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit("page-change", page);
    },
    sizeChange(pageLimit) {
      this.$emit("size-change", pageLimit);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.pagination {
  text-align: center;
  margin: 20px 0;
  .el-pagination__sizes {
    float: left;
  }
  .btn-next {
    float: right;
  }
  .el-pager {
    float: right;
  }
  .btn-prev {
    float: right;
  }
}
</style>
