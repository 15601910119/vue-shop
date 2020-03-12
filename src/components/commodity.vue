<template>
  <el-card class="commodity-container">
    <div class="product-img-wrap">
      <img
        :src="data.image"
        class="product-img"
      >
      <span
        @click="onGotoDetail(data)"
        class="quick-view"
      >商品详情</span>
    </div>
    <div class="product-content-wrap">
      <div class="product-text">
        <p class="product-name">{{data.name}}</p>
        <p class="product-info">库存：{{data.inventory}}个</p>
      </div>

      <div class="product-action">
        <div class="add-btn">
          <i class="el-icon-shopping-cart-full"></i>
          <a
            @click="onAddToCart(data)"
            class="add-to-cart"
            javascript="void(0);"
          >加入购物车</a>
          <price :value="data.discounted || data.price"></price>
        </div>
        <div class="add-wishlist">
          <i
            :class="['el-icon-star-off', {active: isActive}]"
            @click="$store.commit('add-to-collect', data)"
          ></i>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import Price from '@/components/price';
export default {
  components: {
    price: Price
  },
  props: {
    data: Object
  },

  computed: {
    isActive() {
      for (var i = 0; i < this.$store.state.collects.length; i++) {
        if (this.data.id === this.$store.state.collects[i].id) {
          return true;
        }
      }
    }
  },
  methods: {
    onAddToCart(data) {
      this.$store.dispatch(`add-to-cart-store`, data).then(resp => {
        this.$message.success(`添加成功`);
      });
    },
    onGotoDetail(data) {
      this.$router.push({
        path: '/view/commodity/' + data.id,
      });
    }
  }
};
</script>

<style lang="less">
.commodity-container {
  &:hover {
    .product-img-wrap {
      .product-img {
        transform: scale(1.25) rotate(20deg);
      }
      .quick-view {
        opacity: 1;
      }
    }
    .product-action {
      .add-btn {
        .add-to-cart {
          padding-left: 25px;
          width: 110px;
        }
      }
      .add-wishlist {
        i {
          opacity: 1;
        }
      }
    }
  }
}
.product-img-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 235px;
  overflow: hidden;

  .product-img {
    width: 100%;
    transition: 0.4s ease-in-out;
  }
  .quick-view {
    position: absolute;
    left: -20px;
    right: -20px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    opacity: 0;
    transition: 0.4s ease-in-out;
    text-align: center;
    color: #3dca79;
    background: rgba(255, 255, 255, 0.82);
    line-height: 40px;
    font-weight: 600;
    cursor: pointer;
  }
}
.product-content-wrap {
  overflow: hidden;
  .product-text {
    line-height: 1.5;
    margin-bottom: 15px;
    .product-name,
    .product-info {
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
.product-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .add-btn {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    i {
      position: relative;
      z-index: 20;
      width: 28px;
      height: 28px;
      line-height: 26px;
      border-radius: 50%;
      border: 1px solid #3dca79;
      color: #3dca79;
      text-align: center;
      box-sizing: border-box;
      background-color: #fff;
      font-size: 18px;
    }
    .price {
      font-weight: 700;
      margin-left: 12px;
    }
    .add-to-cart {
      position: absolute;
      left: 14px;
      width: 0;
      overflow: hidden;
      white-space: nowrap;
      line-height: 28px;
      background-color: #3dca79;
      color: white;
      border-top-right-radius: 14px;
      border-bottom-right-radius: 14px;
      z-index: 10;
      transition: 0.4s ease-in-out;
      padding-right: 11px;
      line-height: 28px;
      font-size: 14px;
      &:active {
        opacity: 0.8;
      }
    }
  }
  .add-wishlist {
    i {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
      text-align: center;
      opacity: 0;
      transition: 0.4s ease-in-out;
      cursor: pointer;
    }
    .active {
      color: white;
      background: #3dca79;
    }
  }
}
.product-btn {
  text-align: center;
  margin-top: 15px;
}
</style>
