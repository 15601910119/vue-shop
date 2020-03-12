<template>
  <div class="cart-page">
    <!-- <cart-breadcrumb :routes="routes" title="我的购物车"></cart-breadcrumb> -->
    <div class="common-container">
      <el-row :gutter="30">
        <el-col :sm="24" :md="14" :xs="24">
          <el-card class="cart-side">
            <template slot="header">
              <h3 class="flex-center">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  @change="onCheckedAllChange()"
                  :value="checkedAll"
                ></el-checkbox>
                <span>购物车</span>
              </h3>
              <el-button type="text">清空购物车</el-button>
            </template>
            <template v-for="commodity in carts">
              <div class="commodity-row">
                <el-checkbox
                  @change="onCheckboxChange(commodity)"
                  :value="getCommodityStatus(commodity)"
                ></el-checkbox>
                <cart-commodity
                  :data="commodity"
                  @change="onCommodityCountChange"
                ></cart-commodity>
                <el-button
                  type="text"
                  class="danger"
                  @click="onDeleteCommodity(commodity)"
                  >删除</el-button
                >
              </div>
              <el-divider></el-divider>
            </template>
          </el-card>
        </el-col>
        <el-col :sm="24" :md="10" :xs="24">
          <el-card class="order-side">
            <h3 slot="header">订单信息</h3>
            <div class="indent-total">
              <div class="total-item">
                <span>总订单</span>
                <span>{{ checkeds.length }}</span>
              </div>
              <div class="total-item">
                <span>总数量</span>
                <span>{{ allNumber }}</span>
              </div>
              <div class="total-item">
                <span>折扣金额</span>
                <price :value="discount"></price>
              </div>
              <div class="total-item">
                <span>总金额</span>
                <price :value="allMoney"></price>
              </div>
              <div class="total-item">
                <el-button @click="onSubimt" type="primary">收银台</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/breadcrumb';
import CartCommodity from './cart-commodity';
import Price from '@/components/price';

import apis from '@/store/network/apis';
export default {
  components: {
    'cart-breadcrumb': Breadcrumb,
    'cart-commodity': CartCommodity,
    price: Price
  },
  data() {
    return {
      checkeds: [],
      routes: [
        {
          path: '/',
          name: '首页'
        },
        {
          path: '',
          name: '购物车'
        }
      ]
    };
  },
  // TODO 选择购物车商品的逻辑可能还有优化空间
  methods: {
    onCheckboxChange(commodity) {
      var found = this.checkeds.find((item) => item.id === commodity.id);
      if (found) {
        this.checkeds = this.checkeds.filter(
          (item) => item.id !== commodity.id
        );
      } else {
        this.checkeds.push(commodity);
      }
    },
    onCheckedAllChange() {
      if (this.checkedAll) {
        this.checkeds = [];
      } else {
        this.checkeds = this.carts.slice(0);
      }
    },
    getCommodityStatus(data) {
      var checked = this.checkeds.find((item) => item.id === data.id)
        ? true
        : false;
      return checked;
    },
    async onDeleteCommodity(data) {
      await this.$store.dispatch(`delete-cart`, data);
      this.checkeds = this.checkeds.filter((item) => item.id !== data.id);
    },
    onClearCart() {
      this.checkeds = [];
      this.$store.dispatch(`clear-cart`).then(() => {
        this.$message.success('操作成功');
      });
    },
    onSubimt() {
      if (this.checkeds.length === 0) {
        this.$message.error('请选择商品');
        return;
      } else {
        this.$router.push({ name: 'to-money' });
      }
    }
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
    checkedAll() {
      if (this.checkeds.length && this.checkeds.length === this.carts.length) {
        return true;
      } else {
        return false;
      }
    },
    isIndeterminate() {
      return (
        this.checkeds.length > 0 && this.checkeds.length < this.carts.length
      );
    },
    allNumber() {
      var num = 0;
      for (var i = 0; i < this.checkeds.length; i++) {
        num += this.checkeds[i].count;
      }
      return num;
    },
    discount() {
      var total = 0;
      for (var i = 0; i < this.checkeds.length; i++) {
        if (this.checkeds[i].discounted) {
          total +=
            (this.checkeds[i].price - this.checkeds[i].discounted) *
            this.checkeds[i].count;
        }
      }
      return total.toFixed(2);
    },
    allMoney() {
      var money = 0;
      for (var i = 0; i < this.checkeds.length; i++) {
        money += this.checkeds[i].price * this.checkeds[i].count;
      }
      return money.toFixed(2);
    }
  }
};
</script>
<style lang="less">
.cart-page {
  padding-top: 30px;
  margin-bottom: 15px;

  @media only screen and (max-width: 600px) {
    .common-container {
      padding: 0;
      overflow: hidden;
    }
    .el-card {
      border: none;
    }
    .commodity-row {
      position: relative;
      .danger {
        position: absolute;
        right: -100px;
        background-color: red;
        top: 0;
        border-radius: 0;
        color: #fff;
        height: 100px;
        width: 100px;
        margin-left: 0;
      }
      .el-input-number {
        align-self: center;
        width: 120px;
        border: none;
        input {
          padding: 0 20px;
        }
      }
    }
  }

  .el-checkbox {
    margin-right: 15px;
    font-size: 0;
  }
  .commodity-row {
    display: flex;
    overflow: hidden;
    align-items: center;
    margin-bottom: 15px;
    & > .el-button {
      flex-shrink: 0;
    }
  }

  .cart-side {
    .el-card__header {
      display: flex;
      justify-content: space-between;
    }
    .el-divider {
      &:last-child {
        display: none;
      }
    }
  }

  .order-side {
    .indent-total {
      .total-item {
        margin-bottom: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #292633;
        font-weight: 600;

        .el-button--primary {
          width: 100%;
          span {
            color: white;
          }
        }
        .price {
          margin: 0;
          justify-content: flex-end;
        }
      }
    }
  }

  .el-card__header {
    .flex-center {
      justify-content: flex-start;
    }
    h3 {
      font-size: 20px;
      font-weight: 700;
    }
  }
}
</style>
