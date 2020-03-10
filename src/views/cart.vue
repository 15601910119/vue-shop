<template>
  <div class="cart-page">
    <cart-breadcrumb
      :routes="routes"
      title="我的购物车"
    ></cart-breadcrumb>
    <div class="common-container">
      <el-row>
        <el-col
          :span="16"
          :xs="24"
        >
          <div class="cart-content">
            <h4>购物车</h4>
            <div class="flex-center flex-row title">
              <div class="info name">商品</div>
              <div class="count">数量</div>
              <div class="price">单价</div>
              <div class="total">总价</div>
            </div>
            <cart-commodity
              :data="commodity"
              :key="commodity.id"
              v-for="commodity in $store.state.carts"
            ></cart-commodity>
            <div class="title">
             <router-link to="/shop">
               <el-button type="primary">继续购物</el-button>
             </router-link>
              <el-button type="info" @click="onClearCart">清空购物车</el-button>
            </div>
          </div>
        </el-col>
        <el-col
          :span="8"
          :xs="24"
        >
          <div class="indent">
            <h4>订单信息</h4>
            <div class="indent-total">
              <div class="total-item">
                <span>总订单</span>
                <span>{{$store.state.carts.length}}</span>
              </div>
              <div class="total-item">
                <span>总数量</span>
                <span>{{allNumber}}</span>
              </div>

              <div class="total-item">
                <span>优惠码</span>
              </div>
              <div class="total-item">
                <el-input placeholder="请输入优惠码"></el-input>
              </div>

              <div class="total-item">
                <el-button type="primary">立即使用</el-button>
              </div>
              <div class="total-item">
                <span>折扣金额</span>
                <span>¥{{discount}}</span>
              </div>
              <div class="total-item">
                <span>总金额</span>
                <span>¥{{allMoney}}</span>
              </div>
              <div class="total-item">
                <el-button type="primary" @click="$router.push({name: 'to-money'})">收银台</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/breadcrumb';
import CartCommodity from '@/views/shop/cart-commodity';
import apis from '@/store/network/apis'
export default {
  components: {
    'cart-breadcrumb': Breadcrumb,
    'cart-commodity': CartCommodity
  },
  data() {
    return {
      num: 1,
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
  methods: {
    onClearCart() {
     this.$store.dispatch(`clear-cart`).then(() => {
       this.$message.success('操作成功');
     })
    }
  },
  computed: {
    allNumber() {
      var carts = this.$store.state.carts;
      var num = 0;
      for (var i = 0; i < carts.length; i++) {
        num += carts[i].count;
      }
      return num;
    },
    discount() {
      var total = 0;
      var carts = this.$store.state.carts;
      for (var i = 0; i < carts.length; i++) {
        if (carts[i].actual) {
          total += (carts[i].actual - carts[i].price) * carts[i].count;
        }
      }
      return total.toFixed(2);
    },
    allMoney() {
      var carts = this.$store.state.carts;
      var money = 0;
      for (var i = 0; i < carts.length; i++) {
        money += carts[i].price * carts[i].count;
      }
      return money.toFixed(2);
    }
  }
};
</script>
<style lang="less">
.cart-page {
  .common-container {
    h4 {
      border-bottom: 1px solid #f3f3f3;
      padding-bottom: 25px;
      margin-bottom: 25px;
      font-size: 25px;
      font-weight: 600;
      color: #292633;
    }
    margin: 120px auto;
    .cart-content {
      border: 1px solid #f3f3f3;
      border-radius: 5px;
      padding: 50px;
      flex: 1 1 0;
      .price {
        justify-content: center;
        margin-right: 0;
      }

      .title {
        display: flex;
        justify-content: space-between;
        div {
          color: #8e8e8e;
          font-weight: 500;
          font-size: 18px;
        }
      }
    }
    .indent {
      border: 1px solid #f3f3f3;
      border-radius: 5px;
      padding: 50px;
      margin-left: 50px;
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
        }
      }
    }
  }
}
</style>
