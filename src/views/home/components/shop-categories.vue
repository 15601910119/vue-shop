<template>
  <div class="shop-categories">
    <div class="section-title">
      <h2>在线品牌</h2>
      <p>江南、江南、江南商品厂倒闭、倒闭了，以前100元、200元，现在统统、统统超低价、低价出售，大力折扣进行中...</p>
    </div>
    <el-row>
      <el-col
        :key="shop.id"
        :lg="6"
        :md="6"
        :sm="8"
        :xl="4"
        :xs="12"
        class="shop-bg-container"
        v-for="shop in shops"
      >
        <el-card>
          <div class="img-wrapper">
            <img :src="shop.image">
          </div>
          <div class="shop-name">
            <span>{{shop.name}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import apis from '@/store/network/apis';

export default {
  data() {
    return {
      shops: []
    };
  },
  mounted() {
    apis.queryCategoreis().then(resp => {
      this.shops = resp.data;
    });
  }
};
</script>

<style lang="less">
// 响应式品牌列表样式
.shop-categories {
  .shop-bg-container {
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
    .img-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 197px;
      overflow: hidden;
      margin-bottom: 30px;
    }
    img {
      width: 100%;
    }
    .shop-name {
      text-align: center;
      span {
        transition: 0.4s;
      }
      span:hover {
        color: #3dca79;
      }
    }
  }
}
</style>

