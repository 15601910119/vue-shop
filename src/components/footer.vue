<template>
  <div class="footer">
    <div class="common-container">
      <div class="link">
        <router-link
          exact
          to="/"
        >首页</router-link>
        <el-divider direction="vertical"></el-divider>
        <router-link to="/view/shop">主会场</router-link>

        <el-divider direction="vertical"></el-divider>
        <router-link to="/view/contact">联系我</router-link>
        <el-divider direction="vertical"></el-divider>

        <router-link to="/manage">后台管理</router-link>
      </div>

      <div class="line">
        <p>Copyright © 2020.Company name All rights reserved.</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.footer {
  background: #292633;
  color: #c1c1c1;
  padding: 50px;
  .common-container {
    a {
      color: #c1c1c1;
    }
    text-align: center;
  }

  .line {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #c1c1c1;
    p {
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
