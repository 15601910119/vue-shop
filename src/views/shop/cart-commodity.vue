<template>
  <div class="flex-center flex-row">
    <div class="info">
      <i
        @click="onDeleteCommodity(data)"
        class="el-icon-close"
      ></i>
      <div class="image flex-center">
        <img :src="data.image">
      </div>
      <div>
        <h6>{{data.name}}</h6>
        <h6>库存：{{data.inventory}}kg</h6>
      </div>
    </div>

    <div class="count">
      <el-input-number
        :max="data.inventory"
        :min="1"
        :value="data.count"
        @change="onInput(data, $event)"
      ></el-input-number>
    </div>
    <price :value="data.price"></price>
    <price :value="data.price * data.count"></price>
  </div>
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
  methods: {
    onDeleteCommodity(data) {
      this.$store.dispatch(`delete-cart`, data);
    },
    onInput(data, value) {
      data.count = value;
      clearTimeout(this.timer);
      console.log(value);

      this.timer = setTimeout(() => {
        this.$store.dispatch(`add-to-cart-database`, {
          id: data.id,
          count: data.count
        });
      }, 2000)
    }
  }
};
</script>
<style lang="less">
.flex-row {
  margin-bottom: 40px;
  & > div {
    overflow: hidden;
    flex: 0 0 100px;
    text-align: center;
  }
  .info {
    flex: 1 1 0;
    text-align: left;
    display: flex;
    position: relative;
    h6 {
      margin-bottom: 10px;
    }
    i {
      font-size: 20px;
      color: #8e8e8e;
      line-height: 80px;
      cursor: pointer;
    }
    .image {
      width: 80px;
      height: 80px;
      border: 1px solid #f3f3f3;
      border-radius: 5px;
      box-sizing: border-box;
      margin: 0 15px;
      img {
        width: 100%;
      }
    }
  }
  .count {
    .el-input-number {
      width: 100px;
      span {
        width: 25px;
        border: none;
        background-color: transparent;
      }
      input {
        padding: 0;
        border: none;
      }
    }
  }
}
</style>
