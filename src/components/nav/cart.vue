<template>
  <side-drawer ref="drawer" :badge-value="carts.length">
    <i
      class="el-icon-shopping-cart-full"
      slot="icon"
    ></i>
    <commodity
      :data="cart"
      :key="cart.id"
      v-for="cart in carts"
    ></commodity>
    <div class="action-group">
      <span class="empty" v-if="carts.length === 0">暂无商品</span>
      <div v-else>
        <el-button type="primary" @click="onGoToCart">查看购物车</router-link></el-button>
        <el-button type="success">立即购买</el-button>
      </div>
    </div>
  </side-drawer>
</template>

<script>
import Commodity from './commodity';
import Drawer from './drawer';

export default {
  components: {
    commodity: Commodity,
    'side-drawer': Drawer
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    }
  },
  methods: {
    onGoToCart() {
      this.$refs.drawer.show = false;
      this.$router.push({name: 'cart'});
    }
  }
};
</script>