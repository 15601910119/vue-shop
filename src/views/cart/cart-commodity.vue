<template>
  <div class="commodity-wrapper">
    <div class="commodity-image">
      <scale-box>
        <img :src="data.image" :alt="data.name + '图片'" />
      </scale-box>
    </div>
    <div class="commodity-info">
      <div class="name-info">
        <div class="name">{{ data.name }}</div>
        <div class="info">{{ data.description }}</div>
      </div>

      <div class="flex-group">
        <div class="price-count">
          <price :value="data.price" type="line" v-if="data.discounted"></price>
          <price :value="data.discounted || data.price"></price>
        </div>
        <el-input-number
          :value="data.count"
          :min="1"
          :max="data.inventory"
          @input="onCommodityCountChange(data, $event)"
        ></el-input-number>
      </div>
    </div>
  </div>
</template>
<script>
import Price from '@/components/price';
import ScaleBox from '@/components/scale-box';

export default {
  components: {
    price: Price,
    'scale-box': ScaleBox
  },
  props: {
    data: Object
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    onCommodityCountChange(data, value) {
      data.count = value;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$store.dispatch(`add-to-cart-database`, {
          id: data.id,
          count: data.count
        });
      }, 2000);
    }
  }
};
</script>

<style lang="less">
.commodity-wrapper {
  display: flex;
  flex: 1 1 0;
  .commodity-image {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    margin-right: 15px;
    flex-shrink: 0;
    img {
      max-width: 100%;
    }
  }
  .commodity-info {
    flex: 1 1 0;
    display: flex;
    overflow: hidden;
    .name-info {
      flex: 1 1 0;
      overflow: hidden;
      margin-right: 15px;
    }
    .name {
      margin-bottom: 10px;
    }
    .info {
      color: #aaa;
    }
    .price-count {
      .price {
        margin: 0;
        justify-content: flex-end;
      }
    }
    .flex-group {
      align-self: center;
      display: flex;
      align-items: center;
      width: 200px;
      flex-shrink: 0;
      justify-content: space-between;
    }
    
    @media only screen and (min-width: 601px) {
      .el-input-number {
        align-self: center;
        width: 100px;
        border: none;
        input {
          padding: 0;
          border: none;
        }
        .el-input-number__decrease,
        .el-input-number__increase {
          background-color: transparent;
          border: none;
        }
      }
    }
    .price.line {
      color: #aaa;
    }
  }
  @media only screen and (max-width: 600px) {
    .commodity-info {
      display: block;
      .name-info {
        margin-right: 0;
        margin-bottom: 15px;
      }
      .flex-group {
        width: 100%;
      }
    }
  }
}
</style>
