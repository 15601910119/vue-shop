<template>
  <div class="banner">
    <h2>{{ title }}</h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :key="route.path"
        :to="route.path && { path: route.path }"
        v-for="route in routes"
        >{{ route.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    routes: Array
  }
};
</script>
<style lang="less">
.banner {
  background-image: url('http://assets.xvivx.online/static/banner.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  h2 {
    margin-bottom: 15px;
    font-size: 45px;
    line-height: 1.4;
    margin-top: 0;
  }
  .el-breadcrumb__inner {
    font-size: 16px;
  }
  .el-breadcrumb__inner.is-link {
    color: white;
  }
  .el-breadcrumb__separator {
    color: #3dca79;
    font-size: 16px;
  }
}
</style>
