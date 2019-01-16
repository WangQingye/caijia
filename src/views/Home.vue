<template>
  <div class="home">
    <my-header @click-nav="clickNav" :nowIndex="navIndex"></my-header>
    <router-view class="main-router"></router-view>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '@/components/Header.vue'
import MyFooter from '@/components/Footer.vue'
export default {
  data: () => {
    return {
      navIndex: 0
    }
  },
  methods: {
    clickNav(index) {
      console.log(index);
      this.navIndex = index;
    }
  },
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
<style lang="scss" scoped>
</style>

