<template>
  <div id="app">
    <component :is="$store.state.isH5 ? `h5-nav` : `app-nav`"></component>
    <router-view />
  </div>
</template>

<script>
import Nav from '@/components/nav/main';
import H5Nav from '@/components/nav/nav-h5';
import Footer from '@/components/footer';
export default {
  components: {
    'app-nav': Nav,
    'app-footer': Footer,
    'h5-nav': H5Nav
  },
  mounted() {
    this.$store.dispatch(`query-user-info`);
    this.$store.dispatch(`get-cart-info`);
  }
};
</script>
<style lang="less">
html,
body,
ul,
ol,
li,
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
}
ul,
li {
  list-style: none;
}
body {
  font-family: Helvetica, Tahoma, Arial, 'PingFang SC', 'Hiragino Sans GB',
    'Heiti SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
}
.el-button:active,
.el-button:focus {
  outline: none;
}
#app {
  * {
    box-sizing: border-box;
  }
  padding-top: 80px;
  box-sizing: border-box;
  .el-dialog__body {
    max-height: 36vw;
    overflow-y: auto;
  }
  .route {
    & > :first-child {
      min-height: calc(100vh - 80px);
      padding-bottom: 166px;
    }
    .footer {
      margin-top: -166px;
      height: 166px;
    }
  }
}
.danger {
  color: #f56c6c;
  margin-left: 5px;
}
</style>
