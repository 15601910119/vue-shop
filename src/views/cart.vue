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

            <el-table :data="$store.state.carts">
              <el-table-column type="selection" >
              </el-table-column>
              <el-table-column label="名称" width="200px">
                <template slot-scope="scope">
                  <div class="flex-center" >
                    <span>{{scope.row.name}}</span>
                    <img :src="scope.row.image" alt="">
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="数量" prop="count">

              </el-table-column>
               <el-table-column label="价格" prop="price">

              </el-table-column>
                <el-table-column label="总价" prop="price">

              </el-table-column>
              <el-table-column label="操作" >
                <template  slot-scope="scope">
                  <el-button type="text">删除</el-button>
                </template>
              </el-table-column>
            </el-table>


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
  mounted() {
    this.tableCommodity = this.$store.state.carts;
    console.log(this.tableCommodity);
  },
  data() {
    return {
      tableCommodity: [],
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
      .flex-center {
        justify-content: flex-start;
      }
      img {
        width: 80px;
        height: 80px;
        margin-left: 10px;
      }
      .el-table th>.cell {
        label {
          padding-left: 4px;
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
