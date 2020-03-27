<template>
  <scale-box
    class="breadcrumb breadcrumb-container"
    image="http://assets.xvivx.online/static/banner.png"
    scale="5:1"
  >
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :key="route.path"
        :to="route.path && { path: route.path }"
        v-for="route in routes"
        >{{ route.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </scale-box>
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
.breadcrumb.breadcrumb-container {
  color: white;
  background-size: cover;
  .box-content {
    display: flex;
    justify-content: center;
    align-items: center;
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
