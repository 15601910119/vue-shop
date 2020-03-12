<template>
  <div class="personal-center">
    <div class="common-container">
      <el-row :gutter="30">
        <el-col :span="6" class="siderbar">
          <el-card class="head-portrait">
            <div class="title">
              <el-upload
                :http-request="onUpload"
                :show-file-list="false"
                action
              >
                <el-avatar
                  :size="100"
                  :src="userInfo.avatar"
                  icon="el-icon-user-solid"
                ></el-avatar>
              </el-upload>
            </div>
            <el-button @click="onGotoEditUserInfo" type="primary"
              >编辑资料</el-button
            >
            <el-button type="primary">退出登录</el-button>
          </el-card>
          <el-card class="sub-nav-list">
            <el-menu>
              <el-menu-item index="1-1">
                <router-link :to="{ name: `user-address` }"
                  >收货地址</router-link
                >
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/view/profile/indent">我的订单</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="/view/profile/message">我的留言</router-link>
              </el-menu-item>
            </el-menu>
          </el-card>
        </el-col>

        <el-col :span="18">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import apis from '@/store/network/user';

export default {
  methods: {
    async onUpload(data) {
      var formData = new FormData();

      formData.append(`file`, data.file);

      var reps = await apis.upload(formData);

      this.$store.dispatch(`query-user-info`);
    },
    onGotoEditUserInfo() {
      if (this.$route.name !== `edit-info`) {
        this.$router.push({ name: `edit-info` });
      }
    }
  },
  computed: {
    userInfo() {
      try {
        var userInfo = this.$store.state.userInfo || {};
        return userInfo;
      } catch (e) {
        return {};
      }
    }
  }
};
</script>

<style lang="less">
.personal-center {
  .router-link-exact-active {
    color: #3dca79;
  }
  .common-container {
    padding-top: 20px;
    .siderbar {
      .el-card {
        margin-bottom: 15px;
      }
      .el-menu {
        border: none;
      }
    }
    .head-portrait {
      .el-upload {
        color: #ccc;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        border-radius: 50%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .el-icon-user-solid {
          font-size: 50px;
          line-height: 100px;
        }
      }
      .el-button {
        margin: 0;
        width: 200px;
        margin-top: 16px;
      }
      .el-card__body {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      img {
        width: 100%;
      }
    }
    .sub-nav-list {
      a {
        display: block;
      }
    }
  }
}
</style>
