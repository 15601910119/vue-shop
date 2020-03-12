<template>
  <el-card class="app-nav">
    <div class="common-container">
      <a href="/">
        <img
          class="logo"
          src="http://assets.xvivx.online/static/logo.png"
        >
      </a>
      <div class="navs">
        <router-link
          exact
          to="/"
        >首页</router-link>
        <router-link to="/view/shop">主会场</router-link>
        <router-link to="/view/contact">联系我</router-link>
        <router-link to="/manage">后台管理</router-link>
      </div>
      <div class="icon-group">
        <!-- 收藏图标开始 -->
        <top-collect></top-collect>
        <!-- 购物车图标 -->
        <top-cart></top-cart>
        <!-- 用户图标 -->
        <div class="icon-container">
          <router-link to="/view/sign-up">注册</router-link>
        </div>
        <el-dropdown @command="handleCommand">
          <el-avatar
            :src="userInfo.avatar"
            icon="el-icon-user-solid"
          ></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="c">登录</el-dropdown-item>
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-card>
</template>

<script>
import Cart from './cart';
import Collect from './collect';
import '@/style/media.less';
import apis from '@/store/network/apis';
export default {
  components: {
    'top-cart': Cart,
    'top-collect': Collect
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    logout() {
      this.$store.commit('set-user-info', {});
    },
    handleCommand(command) {
      if (command === 'a') {
        if (this.$route.name === 'profile-info') {
          return;
        } else {
          this.$router.push({ name: 'profile-info' });
        }
      } else if (command === 'b') {
        this.$store.dispatch('logout');
      } else if (command === 'c') {
        if (this.$route.name === 'login') {
          return;
        } else {
          this.$router.push({ name: 'login' });
        }
      }
    }
  },
  data() {
    return {
      user: false
    };
  }
};
</script>
<style lang="less">
.app-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  &.el-card {
    border-radius: 0;
  }

  & > .el-card__body {
    padding: 0;
  }

  .logo {
    height: 60px;
  }
  .common-container {
    height: 80px;
    display: flex;
    align-items: center;
    .navs {
      flex: 1 1 0;
      border: none;
      a {
        font-size: 18px;
        font-weight: 700;
        margin-left: 30px;
        color: #606266;
      }
      .router-link-active {
        color: #3dca79;
      }
    }
  }
  .icon-group {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .icon-container {
      margin-left: 15px;
    }
    .el-dropdown {
      font-size: 0;
      margin-left: 10px;
    }
    .el-avatar {
      cursor: pointer;
      img {
        width: 100%;
      }
    }
    .action-group {
      text-align: center;
      padding: 10px 0;
      span {
        a {
          color: white;
        }
      }
      .empty {
        line-height: 100px;
        color: #666;
      }
    }
  }
}
</style>>