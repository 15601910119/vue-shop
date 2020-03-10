<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/nav/main';
import Footer from '@/components/footer'
export default {
  components: {
    'app-nav': Nav,
    'app-footer': Footer
  },
  mounted() {
    this.$store.dispatch(`query-user-info`);
    this.$store.dispatch(`get-cart-info`);
  }
}
</script>
<style>
html, body, ul, ol, li, p, h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
}
ul,li {
  list-style: none;
}
body {
  font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  padding-top: 80px;
}
.el-button:active, .el-button:focus {
  outline: none;
}

</style>
