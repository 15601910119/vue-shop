<template>
  <div class="made-for-product">
    <div class="section-title">
      <h2>在售商品</h2>
      <p>江南、江南、江南商品厂倒闭、倒闭了，以前100元、200元，现在统统、统统超低价、低价出售，大力折扣进行中...</p>
    </div>
    <el-row>
      <el-col
        :key="food.id"
        :lg="6"
        :md="8"
        :sm="12"
        :xl="4"
        :xs="24"
        class="shop-bg-container"
        v-for="food in list"
      >
        <common-commodity :data="food"></common-commodity>
      </el-col>
    </el-row>
    <div class="product-btn">
        <el-button type="success" @click="$message.success(`功能开发中`)">加载更多</el-button>
    </div>
  </div>
</template>

<script>
import Commodity from '@/components/commodity';
import apis from '@/store/network/apis';

export default {
  components: {
    'common-commodity': Commodity
  },
  computed: {
    list() {
      return this.$store.state.commodities;
    }
  },
  mounted() {
    apis.queryRecmmends({pageStart: 0, pageSize: 9}).then(resp => {
      this.$store.commit('set-commodities', resp.data);
    });
  }
};
</script>

<style lang="less">
.made-for-product {
  .shop-bg-container {
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
  }
}
</style>