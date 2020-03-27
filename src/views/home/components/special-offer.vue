<template>
  <div class="special-offer">
    <div class="section-title offer">
      <h2>折扣商品</h2>
      <p>
        江南、江南、江南商品厂倒闭、倒闭了，以前100元、200元，现在统统、统统超低价、低价出售，大力折扣进行中...
      </p>
    </div>
    <!-- 商品图片轮播 -->
    <div class="special-offer-slider">
      <slide-commodity
        :data="special"
        :key="special.id"
        :in-slick="true"
        v-for="special in specials"
      ></slide-commodity>
    </div>
  </div>
</template>

<script>
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import $ from 'jquery';
import SlideCommodity from '@/components/slide-commodity';
import slick from './slick';
import apis from '@/store/network/apis';

export default {
  components: {
    'slide-commodity': SlideCommodity
  },
  computed: {
    specials() {
      return this.$store.state.specials;
    }
  },
  mounted() {
    apis.querySpecials().then((resp) => {
      this.$store.commit(`set-specials`, resp.data);

      this.$nextTick(() => {
        slick(`.special-offer-slider`);
      });
    });
  }
};
</script>

<style lang="less">
.special-offer {
  .special-offer-slider {
    position: relative;
    padding: 0 15px;
    min-height: 300px;
    margin: 0 auto;
    white-space: nowrap;
    & > .el-card {
      display: none;
    }

    .slick-arrow {
      position: absolute;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      width: 40px;
      height: 40px;
      background-color: #3dca79;
      border-radius: 50%;
      font-size: 30px;
      text-align: center;
      color: white;
      font-weight: 800;
      line-height: 40px;
      cursor: pointer;
      &.el-icon-arrow-left {
        left: -65px;
      }
      &.el-icon-arrow-right {
        right: -65px;
      }
    }
    .slick-slide.slick-cloned {
      &:focus {
        outline: none;
      }
    }
    .slick-slide {
      padding: 10px;
    }
    .el-card {
      width: 265px;
    }
  }
}
</style>
