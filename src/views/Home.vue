<template>
  <div class="home">
    <my-header></my-header>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '@/components/Header.vue'
import MyFooter from '@/components/Footer.vue'
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
