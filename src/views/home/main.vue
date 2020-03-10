<template>
  <div class="home">
    <!-- banner图结束 -->
    <app-banner :banners="banners"></app-banner>

    <!-- 促销商品 -->
    <specical-offer class="common-container"></specical-offer>

    <discount-commodity
      :data="hot1"
      :left-col="14"
      :right-col="10"
      class="common-container"
    ></discount-commodity>
    <!-- 优惠商品结束 -->
    <shop-categories class="common-container"></shop-categories>

    <discount-commodity
      :data="hot2"
      :left-col="12"
      :right-col="12"
      class="common-container"
    ></discount-commodity>
    <!-- Made For You开始 -->
    <made-for-you class="common-container"></made-for-you>

    <!-- 如何订单过程开始 -->
    <delivery-process class="common-container"></delivery-process>
  </div>
</template>

<script>
import '../../style/media.less';
import '../../style/common.less';

import Banner from './components/banner';
import SpecicalOffer from './components/special-offer';
import DiscountCommodity from './components/discount-commodity';
import ShopCategories from './components/shop-categories';
import apis from '@/store/network/apis';

import DeliveryProcess from './components/delivery-process';
import MadeForYou from './components/made-for-you';
import { setTimeout } from 'timers';

export default {
  components: {
    'app-banner': Banner,
    'specical-offer': SpecicalOffer,
    'delivery-process': DeliveryProcess,
    'made-for-you': MadeForYou,
    'discount-commodity': DiscountCommodity,
    'shop-categories': ShopCategories,
  },
  name: 'home',
  mounted() {
    apis.queryBnner().then(resp => {
      this.banners = resp.data;
    });
    // apis.queryHot1().then(resp => {
    //   this.hot1 = resp.data || [];
    // });
    // apis.queryHot2().then(resp => {
    //   this.hot2 = resp.data || [];
    // });
  },
  data() {
    return {
      banners: [],
      hot1: [],
      hot2: []
    };
  }
};


</script>
<style lang="less">
.home {
  .hot-commodities {
    display: flex;
    .el-col {
      background-clip: content-box;
      background-color: rgba(109, 152, 6, 0.08);
    }
  }
  .section-title {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding: 60px;
    &.offer {
      padding-bottom: 0;
    }
    h2 {
      font-size: 45px;
      font-weight: 600;
      margin-bottom: 15px;
      line-height: 1.4;
    }
    p {
      max-width: 550px;
      color: #8e8e8e;
      line-height: 1.8;
      margin: 0 auto;
    }
  }
}
</style>
