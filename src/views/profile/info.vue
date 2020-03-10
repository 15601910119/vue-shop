
<template>
  <div class="user-info-default">
    <el-card>
      <div class="user">
        <label>姓名</label>
        <span>{{userInfo.cname}}</span>
      </div>
      <div class="user">
        <label>昵称</label>
        <span>{{userInfo.nick}}</span>
      </div>
      <div class="user">
        <label>手机号</label>
        <span>{{userInfo.phone}}</span>
      </div>
      <div class="user">
        <label>性别</label>
        <span>{{userInfo.sex}}</span>
      </div>
      <div class="user">
        <label>年龄</label>
        <span>{{userInfo.age}}</span>
      </div>
      <div class="user">
        <label>邮箱</label>
        <span>{{userInfo.email}}</span>
      </div>
        <div class="user">
        <label>人生格言</label>
        <span>{{userInfo.motto}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo() {
      try {
        return this.$store.state.userInfo || {};
      } catch (e) {
        return {};
      }
    }
  }
};
</script>

<style lang="less">
.user-info-default {
  .el-card__body {
    .user {
      margin-bottom: 30px;
      label {
        font-size: 16px;
        font-weight: 500;
        margin-right: 15px;
      }
    }
  }
}
</style>

