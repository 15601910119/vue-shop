<template>
  <div class="nav-h5">
    <div class="nav-group">
      <menu-icon :active="active" @change="setActive"></menu-icon>
      <img
        class="logo"
        src="http://assets.xvivx.online/static/logo.png"
        alt="LOGO"
      />
      <el-avatar
        @click.native="onGotoProfile"
        v-if="userInfo.username"
        :src="userInfo.avatar"
        icon="el-icon-user-solid"
      ></el-avatar>
      <router-link class="login-href" v-else :to="{ name: `login` }"
        >登录</router-link
      >
    </div>
    <transition name="el-zoom-in-top">
      <div v-show="active" class="transition-route">
        <div class="navs">
          <li @click="onGotoRoute(`home`)">首页</li>
          <el-divider></el-divider>
          <li @click="onGotoRoute(`shop`)">主会场</li>
          <el-divider></el-divider>
          <li @click="onGotoRoute(`contact`)">联系我</li>
          <el-divider></el-divider>
          <li @click="onGotoRoute(`profile-info`)">个人中心</li>
          <el-divider></el-divider>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import MenuIcon from './menu-icon';
export default {
  components: {
    'menu-icon': MenuIcon
  },
  data() {
    return {
      active: false
    };
  },

  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },

  methods: {
    onGotoProfile() {
      if (this.name !== `profile-info`) {
        this.$router.push({
          name: `profile-info`
        });
      }
    },
    onGotoRoute(name) {
      this.setActive();
      if (this.$route.name !== name) {
        this.$router.push({ name });
      }
    },
    setActive() {
      this.active = !this.active;
      if (this.active) {
        document.body.style.overflow = `hidden`;
      } else {
        document.body.style.removeProperty(`overflow`);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.nav-h5 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  .nav-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: #0089ff;
    padding-left: 15px;
    padding-right: 15px;
    overflow: hidden;
    .logo {
      height: 40px;
      overflow: hidden;
    }
    .login-href {
      color: #fff;
    }
  }
  .transition-route {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;
    background-image: linear-gradient(to bottom, #0089ff, #48a7ef);
    .navs {
      color: #fff;
      font-size: 16px;
      padding: 15px;
    }
  }
}
</style>
