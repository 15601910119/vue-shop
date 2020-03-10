<template>
  <div class="manage-container">
    <el-container>
      <el-aside width="200px">
        <el-menu>
          <el-menu-item index="1-1">
            <router-link to="/manage/commodities">商品管理</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/manage/categories">品牌管理</router-link>
          </el-menu-item>
          <el-menu-item index="1-3">
            <router-link to="/manage/classify">分类管理</router-link>
          </el-menu-item>
           <el-menu-item index="1-4">
            <router-link to="/manage/banners">BANNER管理</router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {};
</script>


<style lang="less">
.manage-container {
  border: 1px solid #e6e6e6;
  height: calc(100vh - 80px);
  box-sizing: border-box;
  .el-container {
    height: 100%;
  }
  .el-aside {
    height: 100%;
    box-sizing: border-box;
    .el-menu {
      height: 100%;
    }
    a {
      color: black;
      display: block;
    }
    .router-link-active {
      color: #3dca79;
    }
  }
  .el-main {
    padding: 0;
  }
}
</style>


