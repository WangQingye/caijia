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
            class="nav-li nav-main"
            @click="backToMain"
          >
            回到首页
          </li>
          <li
            :class="['nav-li', index === hoverIndex ? 'nav-active' : '', index == nowIndex ? 'nav-big-font' : '']"
            v-for="(nav, index) in navs"
            :key="index"
            @click="clickNav(index)"
            @mouseover="onMouseOver(index)"
            @mouseout="onMouseOut(index)"
          >
            <div
              class="nav-border"
              v-show=" index == nowIndex"
            ></div>
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
        { name: "表单查询", url: "/query" },
        { name: "资金条线查询", url: "/fund" },
        { name: "发放对象查询", url: "/target" },
        { name: "定向支付查询", url: "/payment" },
        { name: "报警查询", url: "/warning" }
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
<style scoped>
.header {
  /* width: 1920px; */
  width: 100%;
  height: 60px;
  background: #3c3c9f;
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
  background: #503faf;
  height: 60px;
  width: 60px;
}
.logo-img {
  width: 30px;
  height: 30px;
  margin-left: 050px;
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
  color: #ceceff;
  cursor: pointer;
  /* transition:rgba(255, 255, 255, 0.1) 0.3s linear; */
  position: relative;
}
/* .nav-li:hover { */
/* background: rgba(134, 130, 130, 0.1); */
/* } */
.nav-active {
  color: #ffffff;
  background: #503faf;
}
.nav-big-font {
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
.solution-list {
  position: absolute;
  left: 180px;
  width: 90px;
  /* min-width: 290px; */
  height: 80px;
  background: #503faf;
}
.solution-ul {
  width: 100%;
  box-sizing: border-box;
}
.solution-li {
  display: inline-block;
  height: 60px;
  width: 40px;
  padding-top: 050px;
  box-sizing: border-box;
  cursor: pointer;
  color: #d4ccff;
  /* display: flex; */
  justify-content: space-around;
}
.solution-li:hover {
  color: white;
}
.solution-img {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-left: 050px;
}
.solution-text {
  display: inline-block;
  margin-left: 050px;
  line-height: 30px;
  font-size: 040px;
  text-align: left;
  width: 90px;
  vertical-align: top;
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
