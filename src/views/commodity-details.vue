<template>
  <div class="commodity-details">
    <details-breadcrumb
      :routes="routes"
      title="商品详情"
    ></details-breadcrumb>
    <div class="common-container">
      <el-row
        :gutter="30"
        class="container"
      >
        <el-col :span="12">
          <div class="commodity-image">
            <div class="img-big">
              <div
                :style="`background-image: url(${data.pictures[activeIndex]})`"
                class="img-container"
              ></div>
            </div>
            <ul class="img-min">
              <li
                @click="onView(index)"
                v-for="(picture, index) in data.pictures"
              >
                <div
                  :style="`background-image: url(${picture})`"
                  class="img-container"
                ></div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="commodity-info">
            <h3>{{data.name}}</h3>
            <div class="review">
              <el-rate
                :colors="colors"
                style="margin-bottom: 5px"
                v-model="value"
              ></el-rate>
              <span v-if="data.reviews > 0 ">{{data.reviews}}条评论</span>
              <span v-else>暂无评论</span>
            </div>
            <div class="row-info">
              <p>{{data.description}}</p>
            </div>

            <div class="row-info">
              <h6>状态</h6>
              <span>{{data.status}}</span>
            </div>
            <div class="row-info">
              <h6>库存</h6>
              <span>{{data.inventory}}</span>
            </div>
            <div class="row-info">
              <h6>价格</h6>
              <price :value="data.price"></price>
            </div>
            <div class="add-cart">

              <el-button
                @click="onAddToCart(data)"
                type="primary"
              >添加购物车</el-button>
              <i
                :class="['el-icon-star-off', {active: isActive}]"
                @click="$store.commit('add-to-collect', data)"
              ></i>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import apis from '@/store/network/apis';
import Price from '@/components/price'
import detailsBreadcrumb from '@/components/breadcrumb';
export default {
  components: {
    'details-breadcrumb': detailsBreadcrumb,
    price: Price
  },
  data() {
    return {
      value: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      activeIndex: 0,
      data: {
        pictures: []
      },
      num: 1,
      routes: [
        {
          path: '/',
          name: '首页'
        },
        {
          name: '商品详情'
        }
      ]
    };
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
    onView(index) {
      this.activeIndex = index;
    },
   onAddToCart(data) {
     this.$store.dispatch(`add-to-cart-store`, data).then(resp => {
       this.$message.success('添加成功');
     })
   }
  },
  mounted() {
    apis.queryCommodityDetail({ id: this.$route.params.id }).then(resp => {
      this.data = resp.data;
    });
  }
};
</script>
<style lang="less">
.commodity-details {
  .common-container {
    .container {
      .commodity-image {
        .img-big {
          padding: 50px;
          border: 1px solid #f3f3f3;
        }

        .img-min {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          li {
            cursor: pointer;
            border: 1px solid #f3f3f3;
            width: 120px;
            height: 120px;
          }
        }

        .img-container {
          width: 100%;
          padding-top: 100%;
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
      .commodity-info {
        color: #8e8e8e;
        font-size: 16px;
        padding: 50px;
        border: 1px solid #f3f3f3;
        h3 {
          margin-bottom: 25px;
          font-size: 40px;
          color: #292633;
          font-weight: 600;
        }
        .row-info {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          margin-top: 30px;
          h6 {
            font-size: 16px;
            font-weight: 600;
            color: black;
            margin-right: 15px;
          }
        }
        .add-cart {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;

          .el-icon-star-off {
            font-size: 20px;
            height: 40px;
            width: 40px;
            line-height: 40px;
            background: #f3f3f3;
            text-align: center;
            border-radius: 50%;
            cursor: pointer;
          }
          .active {
            background: #3dca79;
            color: white;
          }
          .el-button {
            background: #3dca79;
            border: 1px solid #3dca79;
          }
        }
      }
    }
  }
}
</style>
