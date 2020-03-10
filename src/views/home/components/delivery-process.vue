<template>
  <el-row class="how-work shop-steps">
    <div class="section-title">
        <h2>交付过程</h2>
        <p>江南、江南、江南商品厂倒闭、倒闭了，以前100元、200元，现在统统、统统超低价、低价出售，大力折扣进行中...</p>
      </div>
    <el-col
      :md="6"
      class="how-work-step"
    >
      <div class="work-box down-dashed">
        <span class="work-number">
          <i class="el-icon-shopping-bag-2"></i>
        </span>
        <span class="line"></span>
        <h5>选择商品</h5>
      </div>
    </el-col>
    <el-col
      :md="6"
      class="how-work-step"
    >
      <div class="work-box up-dashed">
        <span class="work-number">
          <i class="el-icon-shopping-cart-full"></i>
        </span>
        <span class="line"></span>
        <h5>加入购物车</h5>
      </div>
    </el-col>
    <el-col
      :md="6"
      class="how-work-step"
    >
      <div class="work-box down-dashed">
        <span class="work-number">
          <i class="el-icon-money"></i>
        </span>
        <span class="line"></span>
        <h5>去收银台</h5>
      </div>
    </el-col>
    <el-col
      :md="6"
      class="how-work-step"
    >
      <div class="work-box">
        <span class="work-number">
          <i class="el-icon-check"></i>
        </span>
        <span class="line"></span>
        <h5>完成支付</h5>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style lang="less">
.how-work {
  .how-work-step {
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
    .work-box {
      position: relative;
      padding: 20px;
      &::before {
        position: absolute;
        content: '';
        border-radius: 100%;
        z-index: -1;
      }

      &.down-dashed::before {
        border-bottom: 1.5px dashed #3dca79;
        width: 100%;
        left: 54%;
        top: 5%;
        height: 40%;
      }

      &.up-dashed::before {
        border-top: 1.5px dashed #3dca79;
        width: 110%;
        left: 50%;
        top: 8px;
        height: 75%;
      }

      .work-number {
        height: 80px;
        width: 80px;
        background: #ffffff;
        display: inline-block;
        border-radius: 50%;
        box-shadow: 0px 0px 30px #33333314;
        margin-bottom: 30px;
        i {
          font-size: 30px;
          color: #3dca79;
          line-height: 80px;
        }
      }

      h5 {
        margin-bottom: 15px;
        font-size: 18px;
      }

      p {
        margin-top: 20px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
