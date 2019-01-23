<template>
  <el-pagination
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="10"
    layout="prev, pager, next, jumper"
    :total="total"
    class="pagination"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
        currentPage:1
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
      this.$emit('page-change', page)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.pagination {
    text-align: center;
    margin: 20px 0
}
</style>
