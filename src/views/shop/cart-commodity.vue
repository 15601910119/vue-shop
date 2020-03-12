<template>
  <div class="flex-center flex-row">
    <div class="info">
      <!-- <i
        @click="onDeleteCommodity(data)"
        class="el-icon-close"
      ></i> -->
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
.flex-row {
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
            <div class="content title">
              <el-checkbox
                :indeterminate="isIndeterminate"
                :value="checkedAll"
                @change="onCheckedAllChange"
              ></el-checkbox>
              <div class="flex-row flex-center">
                <div class="info name">商品</div>
                <div class="count">数量</div>
                <div class="price">单价</div>
                <div class="total">总价</div>
              </div>
              <el-button type="text">删除</el-button>
            </div>
            <div
              class="content"
              v-for="commodity in $store.state.carts"
            >
              <el-checkbox
                :key="commodity.id"
                :value="getCommodityStatus(commodity)"
                @change="onCheckboxChange(commodity)"
              ></el-checkbox>
              <cart-commodity
                :data="commodity"
                :key="commodity.id"
              ></cart-commodity>
              <el-button
                @click="onDeleteCommodity(commodity)"
                type="text"
              >删除</el-button>
            </div>

            <div class="title">
              <router-link to="/shop">
                <el-button type="primary">继续购物</el-button>
              </router-link>
              <el-button
                @click="onClearCart"
                type="info"
              >清空购物车</el-button>
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
                <span>{{checkeds.length}}</span>
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
                <el-button
                  @click="onSubimt"
                  type="primary"
                >收银台</el-button>
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
import apis from '@/store/network/apis';
export default {
  components: {
    'cart-breadcrumb': Breadcrumb,
    'cart-commodity': CartCommodity
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
  methods: {
    onCheckboxChange(commodity) {
      var found = this.checkeds.find(item => item.id === commodity.id);
      if (found) {
        this.checkeds = this.checkeds.filter(item => item.id !== commodity.id);
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
      var checked = this.checkeds.find(item => item.id === data.id)
        ? true
        : false;
      return checked;
    },
    async onDeleteCommodity(data) {
      await this.$store.dispatch(`delete-cart`, data);
      this.checkeds = this.checkeds.filter(item => item.id !== data.id);
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
      .content {
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .flex-row {
          flex: 1 1 0;
        }
      }
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

