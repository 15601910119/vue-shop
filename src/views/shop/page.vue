<template>
  <div class="page">
    <h1>操作成功</h1>
    <div class="success">
      <i class="el-icon-circle-check"></i>
    </div>

    <el-button type="primary">返回首页</el-button>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.page {
  text-align: center;
  margin: 120px auto;
  .success {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
  }
  h1,
  i {
    font-size: 30px;
    font-weight: 600;
  }
  i {
    color: #3dca79;
    margin: 10px 0;
  }
}
</style>
