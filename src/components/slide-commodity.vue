<template>
  <el-card class="single-product" :data-id="data.id">
    <div class="product-img" @click="onDetails(data)">
      <img :src="data.image" />
    </div>

    <div class="off">
      <h5>{{ Math.round((data.discounted / data.price) * 100) }}</h5>
      <span>折</span>
    </div>
    <div class="product-content">
      <div class="offer-product-price">
        <price :value="data.discounted"></price>
        <price :value="data.price" type="line"></price>
      </div>
      <div class="product-name">
        <p>{{ data.name }}</p>
        <p>{{ data.info }}</p>
      </div>

      <div class="bottom-clearfix">
        <el-button @click="onAddCart(data)" class="button" type="success"
          >加入购物车</el-button
        >
        <i
          :class="['el-icon-star-off', { active: isInCollect }]"
          @click="onAddCollect(data)"
        ></i>
      </div>
    </div>
  </el-card>
</template>
<script>
import $ from 'jquery';
import Price from './price';
export default {
  components: {
    price: Price
  },
  props: {
    data: Object,
    inSlick: Boolean
  },
  methods: {
    onAddCollect(data) {
      this.$store.commit(`add-to-collect`, data);
    },
    onAddCart(data) {
      this.$store.dispatch(`add-to-cart-store`, data).then((resp) => {
        this.$message.success(`添加成功`);
      });
    },
    onDetails(data) {
      this.$router.push({
        path: '/view/commodity/' + data.id
      });
    },
    setIconStatus(isInCollect) {
      setTimeout(() => {
        if (isInCollect) {
          this.clonedIcon && this.clonedIcon.addClass(`active`);
        } else {
          this.clonedIcon && this.clonedIcon.removeClass(`active`);
        }
      }, 100);
    }
  },
  computed: {
    isInCollect() {
      var isInCollect = this.$store.state.collects.find(
        (collect) => collect.id === this.data.id
      );

      this.inSlick && this.setIconStatus(isInCollect);
      return isInCollect;
    }
  },
  mounted() {
    if (!this.inSlick) {
      return;
    }

    setTimeout(() => {
      var $node = $(`.slick-cloned [data-id='${this.data.id}']`);

      $node.find(`.product-img`).on(`click`, () => {
        this.onDetails(this.data);
      });

      $node.find(`.el-button`).on(`click`, () => {
        this.onAddCart(this.data);
      });

      $node.find(`.el-icon-star-off`).on(`click`, () => {
        this.onAddCollect(this.data);
      });

      this.clonedIcon = $node.find(`.el-icon-star-off`);
    }, 50);
  }
};
</script>
<style lang="less">
.single-product {
  cursor: pointer;
  padding: 25px;
  box-sizing: border-box;
  .product-img {
    height: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
    }
  }
  .el-card__body {
    position: relative;
  }
  .off {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url(http://assets.xvivx.online/static/offer-bg.png) no-repeat;
    width: 53px;
    height: 53px;
    color: white;
    h5 {
      font-weight: 700;
      line-height: 1.5;
      color: white;
    }
    span {
      font-size: 11px;
      line-height: 1;
      font-weight: 600;
    }
  }
  .product-content {
    .offer-product-price {
      display: flex;
      align-items: flex-end;
    }
    .product-name {
      margin-bottom: 15px;
      p {
        margin: 5px 0;
      }
    }
    .bottom-clearfix {
      display: flex;
      align-items: center;
      justify-content: space-between;
      i {
        cursor: pointer;
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 5px;
        background-color: #eee;
      }
      .active {
        background: #3dca79;
        color: white;
      }
    }
  }
}
</style>
