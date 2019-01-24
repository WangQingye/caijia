<template>
  <div :class="['header', bgColorType === 1 ? 'header-1' : '']">
    <div class="content-wrapper">
      <div class="logo-wrapper">
        <img
          class="logo-img"
          src="@/assets/imgs/logo.png"
          alt=""
        >
      </div>
      <div class="nav-wrapper">
        <ul class="nav-ul">
          <li
            :class="['nav-li', index === hoverIndex ? 'nav-active' : '', index == nowIndex ? 'nav-big-font' : '']"
            v-for="(nav, index) in navs"
            :key="index"
            @click="clickNav(index)"
            @mouseover="onMouseOver(index)"
            @mouseout="onMouseOut(index)"
          >
            <!-- <div
              class="nav-border"
              v-show=" index == nowIndex"
            ></div> -->
            {{navs[index]['name']}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      navs: [
        { name: "首页", url: "/main" },
        { name: "新闻中心", url: "/news" },
        { name: "申请入驻", url: "/apply" },
        { name: "后台登陆", url: "/login" }
      ],
      hoverIndex: null,
      hoverOnList: false
    };
  },
  props: {
    nowIndex: {
      default: 0,
      type: Number
    },
    bgColorType: {
      default: 0,
      type: Number
    }
  },
  methods: {
    backToMain() {
      console.log(1);
    },
    clickNav(index) {
      this.$emit("click-nav", index);
      this.$router.push(this.navs[index]['url'])
    },
    onMouseOver(index) {
      this.hoverIndex = index;
    },
    onMouseOut() {
      this.hoverIndex = null;
    }
  },
  watch: {
    nowIndex(val) {
      if (val !== 1) {
        this.hoverOnList = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$background:white;
$hover-background:#39AC5F;
$text-color:#757575;
$hover-text-color:white;
.header {
  /* width: 1920px; */
  width: 1920px;
  height: 60px;
  background: $background;
  z-index: 99;
  box-shadow: 1px 1px 5px #ddd;

}
.content-wrapper {
  width: 100%;
  height: 60px;
  min-height: 60px;
  min-width: 1200px;

}
.logo-wrapper {
  display: inline-block;
  /* margin-left: 360px; */
  /* padding: 15px; */
  margin-right: 22%;
  height: 60px;
  width: 60px;
}
.logo-img {
  width: 160px;
  height: 40px;
  margin-left: 50px;
  margin-top: 10px;
}
.nav-wrapper {
  display: inline-block;
  /* margin-left: 30%; */
  height: 60px;
  width: 540px;
  min-width: 740px;
  vertical-align: top;
  position: relative;
}
.nav-li {
  font-size: 14px;
  display: inline-block;
  height: 60px;
  max-width: 180px;
  min-width: 120px;
  text-align: center;
  line-height: 60px;
  color: $text-color;
  cursor: pointer;
  /* transition:rgba(255, 255, 255, 0.1) 0.3s linear; */
  position: relative;
}
.nav-active {
  color: $hover-text-color;
  background: $hover-background;
}
.nav-big-font {
  background: $hover-background;
  color: #ffffff;
}
.nav-border {
  position: absolute;
  width: 20px;
  top: 56px;
  left: 50px;
  border-bottom: 4px solid #00dec1;
}
.nav-main {
  color: #1bf1fe;
  text-decoration: underline;
}
.header-1 {
  background: #ffffff;
}
.header-1 .nav-li {
  color: #9595c4;
}
.header-1 .nav-active {
  color: white;
}
</style>
