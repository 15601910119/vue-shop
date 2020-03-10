<template>
  <div class="payment common-container">
    <template v-if="status === ''">
      <div class="flex-center info">
        <span>您将支付</span>
        <price :value="price"></price>
      </div>
      <div class="flex-center info">
        <span>共计优惠</span>
        <price :value="discount"></price>
      </div>
      <el-button type="primary" @click="onPayment">确认支付</el-button>
    </template>
    <div class="result">
      <div
        class="fail"
        v-if="status === `fail`"
      >
        <div class="flex-center status">
          <i class="el-icon-error"></i>
          <span>支付失败</span>
        </div>
        <div class="navs">
          <router-link to="/shop">继续购物</router-link>
          <router-link to="/profile/indent">查看订单</router-link>
        </div>
      </div>
      <div
        class="success"
        v-if="status === `success`"
      >
        <div class="flex-center status">
          <i class="el-icon-success"></i>
          <span>支付成功</span>
        </div>
        <div class="navs">
          <router-link to="/shop">继续购物</router-link>
          <router-link to="/profile/indent">查看订单</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Price from '@/components/price';
import apis from '@/store/network/apis'
export default {
  components: {
    price: Price
  },
  data() {
    return {
      status: ``,
      price: 0,
      discount: 0
    };
  },
  mounted() {
    var data = this.$route.params.data;

    if (!data) {
      this.status = `fail`;
      return;
    }

    this.orders = data;

    data.forEach(item => {
      this.price += item.price;
      this.discount += item.discount;
    });
    console.log(this.orders.map(item => item.id))
  },
  methods: {
    onPayment() {
      var id = this.orders.map(item => item.id).join(',');
      apis.payment({id: id}).then(resp => {
        this.status = 'success';
      })
    }
  }
};
</script>
<style lang="less">
.payment {
  padding-top: 100px;
  padding-bottom: 100px;
  text-align: center;
  .info {
    font-size: 16px;
    margin-bottom: 25px;
    .price {
      margin: 0;
    }
  }
  .status {
    font-size: 20px;
    line-height: 100px;
  }

  .el-icon-error {
    color: red;
    font-size: 40px;
    margin-right: 15px;
  }

  .el-icon-success {
    color: #67c23a;
    font-size: 40px;

    margin-right: 15px;
  }
  a {
    margin: 0 10px;
  }
}
</style>
