<template>
  <div class="shop">
    <breadcrumb
      :routes="routes"
      :title="title"
    ></breadcrumb>
    <el-row class="common-container">
      <el-col
        :lg="7"
        :md="9"
        :sm="24"
        :xl="6"
        class="left-side"
      >
        <article>
          <div class="title">
            <h5>
              <i class="el-icon-s-operation"></i>商品分类
            </h5>
          </div>

          <ul>
            <li @click="fetchCommodities(`fruit`)">水果类</li>
            <li @click="fetchCommodities(`vegetables`)">蔬菜类</li>
          </ul>
        </article>
        <div class="best">
          <h5>今天热销产品</h5>
          <el-row class="best-shop">
            <commodity
              :data="best"
              :key="best.id"
              class="best-commodity"
              v-for="best in hotCommodities"
            ></commodity>
          </el-row>
        </div>
      </el-col>
      <el-col
        :lg="17"
        :md="15"
        :sm="24"
        :xl="18"
        class="shop-info"
      >
        <el-card class="title">
          <h5>商品展示</h5>
          <div class="shop-sort">
            <h5>种类:</h5>

            <el-select
              @change="onClassifyChange"
              placeholder="请选择"
              v-model="classify"
            >
              <el-option
                :key="item.id"
                :label="item.name"
                :value="item.id"
                v-for="item in classifys"
              ></el-option>
            </el-select>
          </div>
        </el-card>

        <el-row
          :gutter="20"
          class="shop-content"
        >
          <el-col
            :key="commodity.id"
            :lg="8"
            :md="12"
            :sm="12"
            :xl="6"
            class="shop-bg-container"
            v-for="commodity in commodities"
          >
            <commodity :data="commodity"></commodity>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Breadcrumb from '@/components/breadcrumb';
import Commodity from '@/components/commodity';
import apis from '@/store/network/apis';
import api from '@/store/network/manage';
export default {
  components: {
    breadcrumb: Breadcrumb,
    commodity: Commodity
  },

  mounted() {
    apis.queryRecmmends().then(resp => {
      this.commodities = resp.data;
      for (var i = 0; i < this.commodities.length; i++) {
        if (this.commodities[i].hot1 || this.commodities[i].hot2) {
          this.hotCommodities.push(this.commodities[i]);
        }
      }
    });
    api.queryClassify().then(resp => {
      this.classifys = resp.data;
    });
  },
  methods: {
    fetchCommodities() {},
    onClassifyChange(value) {
      apis.queryRecmmends(value).then(resp => {
        this.commodities = resp.data;
      });
    }
  },
  data() {
    return {
      hotCommodities: [],
      commodities: [],
      classify: '',
      title: '商店',
      routes: [
        {
          path: '/',
          name: '首页'
        },
        {
          name: '商店'
        }
      ],
      classifys: []
    };
  }
};
</script>
<style lang="less">
.shop {
  .common-container {
    margin-top: 120px;
    margin-bottom: 120px;
    .left-side {
      padding-right: 50px;
      margin-bottom: 30px;
    }
    h5 {
      font-size: 18px;
      font-weight: 500;
    }
    article {
      border-radius: 10px;
      padding: 25px 30px;
      border: 1px solid #f3f3f3;
      margin-bottom: 30px;
      ul {
        list-style: none;
        li {
          margin: 10px 0;
          color: #686868;
          font-size: 16px;
          line-height: 1.8;
          cursor: pointer;
        }
        li:hover {
          color: #3dca79;
        }
      }
    }
    .best {
      border-radius: 10px;
      padding: 25px 30px;
      border: 1px solid #f3f3f3;
      .best-shop {
        .best-commodity {
          margin: 30px 0;
          box-shadow: none;
          border: none;
          &.commodity-container {
            &:hover .add-btn span {
              width: 74px;
            }
          }
        }
        .el-card__body {
          display: flex;
          padding: 0;
          padding-bottom: 3px;
          .product-img-wrap {
            width: 90px;
            flex-shrink: 0;
            height: 90px;
            margin-right: 20px;
            border: 1px solid #f3f3f3;
            box-sizing: border-box;
            span {
              display: none;
            }
          }
          .product-content-wrap {
            .add-wishlist {
              display: none;
            }
          }
        }
      }
    }
    .shop-info {
      .title {
        margin-bottom: 30px;
        .el-card__body {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .shop-sort {
          display: flex;
          align-items: center;
          h5 {
            padding-right: 15px;
          }
        }
      }
      .shop-bg-container {
        margin-bottom: 30px;
      }
    }
  }
}
</style>


