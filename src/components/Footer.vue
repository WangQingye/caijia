<template>
  <div class="footer">
    <img
      class="footer-bg"
      src="@/assets/imgs/footer-bg.png"
      alt=""
    >
    <img
      class="footer-logo"
      src="@/assets/imgs/foot-logo.png"
      alt=""
    >
    <section class="middle">
      <div class="middle-left">
        <ul class="middle-links">
          <li
            class="middle-link"
            v-for="(link, index) in  links"
            :key="index"
          >
            <router-link :to="link.path">
              {{link.name}}
            </router-link>
          </li>
        </ul>
        <div class="middle-border"></div>
        <ul class="middle-links">
          <li class="middle-link-bottom">友情链接：</li>
          <li
            class="middle-link middle-link-bottom"
            v-for="(link, index) in  friendsLinks"
            :key="index"
          >
            <a :href="link.path">{{link.name}}</a>
          </li>
        </ul>
      </div>
      <div class="middle-right">
        <!-- <p class="middle-right-phone">
          <i class="el-icon-phone"></i>
          400-999-1188
        </p> -->
        <div class="middle-right-qrcode">
          <img
            src="@/assets/imgs/qrcode.png"
            alt=""
          >
          <p>微信</p>
        </div>
        <!-- <div class="middle-right-qrcode">
          <img
            src="@/assets/imgs/qrcode.png"
            alt=""
          >
          <p>微博</p>
        </div> -->
      </div>
    </section>
    <section class="bottom">
      <img
        class="bottom-slogan"
        src="@/assets/imgs/slogan.png"
        alt=""
      >
      <p class="bottom-text">Copyright © 2019  XINLIAN TECHNOLOGY  OF CETC, All Rights Reserved.
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002001977" style="display:inline-block;text-decoration:underline;height:20px;line-height:30px;color:#fff">川公网安备 51019002001977号
        <img src="@/assets/imgs/record-number.png" style="margin-left:5px;display:inline-block;height:16px;vertical-align: middle;margin-top:-5px;"/></a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      links: [
        {
          name: "新闻中心",
          path: "/news"
        },
        // {
        //   name: "农产品投保",
        //   path: ""
        // },
        // {
        //   name: "理赔公示",
        //   path: ""
        // },
        {
          name: "联系我们",
          path: ""
        }
      ],
      friendsLinks: [
        {
          name: "信链官网",
          path: "https://www.cetcxl.com"
        },
        {
          name: "智能合约快速开发平台",
          path: "https://devplatform.cetcxl.com"
        }
      ]
    };
  },
  props: {},
  methods: {},
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.footer {
  z-index: 99;
  width: 100%;
  min-width: 1000px;
  position: relative;
  height: 300px;
  color: white;
  margin-top: 60px;
  .footer-bg {
    width: 100%;
    height: 300px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  }
  .footer-logo {
    width: 160px;
    height: 40px;
    margin: 0 auto;
    margin-top: 25px;
  }
}
.middle {
  width: 100%;
  min-width: 1000px;
  text-align: left;
  display: flex;
  justify-content: space-around;
  .middle-left {
    width: 568px;
    margin-top: 30px;
    .middle-links {
      .middle-link {
        display: inline-block;
        margin-right: 30px;
        font-size: 15px;
        line-height: 15px;
        border-right: 1px solid white;
        padding-right: 20px;
        a {
          color: white;
        }
      }
      .middle-link:last-child {
        border-right: none;
      }
      .middle-link:hover {
        text-decoration: underline;
      }
      .middle-link-bottom {
        display: inline-block;
        border: none;
        padding-right: 0px;
        margin-right: 20px;
      }
    }
    .middle-border {
      height: 1px;
      width: 568px;
      border-bottom: 1px solid white;
      margin: 30px 0;
    }
  }
  .middle-right {
    width: 240px;
    text-align: right;
    .middle-right-phone {
      font-size: 20px;
      font-weight: bold;
      text-align: right;
      margin-bottom: 10px;
    }
    .middle-right-qrcode {
      width: 100px;
      display: inline-block;
      margin-right: 20px;
      img {
        width: 100px;
      }
      p {
        text-align: center;
        font-size: 15px;
      }
    }
    .middle-right-qrcode:last-child {
      margin-right: 0px;
    }
  }
}
.bottom {
  .bottom-slogan {
    width: 270px;
    margin-bottom: 10px;
  }
  .bottom-text {
    font-size: 14px;
  }
}
</style>
