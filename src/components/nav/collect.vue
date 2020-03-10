<template>
  <side-drawer :badge-value="collects.length">
    <i
      class="el-icon-star-off"
      slot="icon"
    ></i>
    <commodity
      :data="collect"
      :key="collect.name"
      @delete="handleDeleteCollect($event)"
      v-for="collect in collects"
    ></commodity>
    <div class="action-group">
      <span class="empty" v-if="collects.length === 0">暂无商品</span>
      <el-button
        @click="$store.commit('handle-add-to-cart')"
        type="success"
        v-else
      >加入购物车</el-button>
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
    collects() {
      return this.$store.state.collects;
    },
  }

};
</script>