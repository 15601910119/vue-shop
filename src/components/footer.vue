<template>
  <div class="footer">
    <div class="container common-container">
      <div class="container-item">
        <div class="container-item-logo">
          <a href="#">
            <img src="http://assets.xvivx.online/static/logo.png">
          </a>
        </div>
        <p>公司地址:<br>江南皮革厂向东一百米，向西一百米，向南一百米，向北一百米。</p>
        <div class="container-item-icon">
          <a href="#">
            <i class="el-icon-eleme"></i>
          </a>
          <a href="#">
            <i class="el-icon-help"></i>
          </a>
          <a href="#">
            <i class="el-icon-bell"></i>
          </a>
          <a href="#">
            <i class="el-icon-rank"></i>
          </a>
        </div>
      </div>
      <div class="container-item">
        <h5>公司</h5>
        <a href="#">公司介绍</a>
        <a href="#">博客</a>
        <a href="#">商店</a>
        <a href="#">联系我们</a>
      </div>
      <div class="container-item">
        <h5>订阅我们</h5>
        <p>欢迎联系我们，非诚勿扰，欢迎骚扰</p>
        <el-input
          placeholder="请输入内容"
        >
          <template slot="append" class="el-btn">Send</template>
        </el-input>
      </div>
      <div class="container-item">
        <h5>付款方式</h5>
        <a href="#">
          <img src="http://assets.xvivx.online/static/bankcard/visa.png">
        </a>
        <a href="#">
          <img src="http://assets.xvivx.online/static/bankcard/mastercard.png">
        </a>
        <a href="#">
          <img src="http://assets.xvivx.online/static/bankcard/discover.png">
        </a>
        <a href="#">
          <img src="http://assets.xvivx.online/static/bankcard/americanexpress.png">
        </a>
      </div>
    </div>
    <div class="row">
      <div class="line"></div>
      <p>Copyright © 2020.Company name All rights reserved.</p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.footer {
  padding-top: 100px;
  padding-bottom: 30px;
  background: #292633;
  color: #c1c1c1;
  .container {
    display: flex;
    justify-content: space-between;
    a {
      color: #c1c1c1;
    }
    .container-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 30px;
      padding: 0 15px;
      max-width: 25%;
      .el-input-group__append {
        background: #3dca79;
        border: 1px solid #3dca79;
        color: white;
      }
        h5 {
      color: white;
      font-size: 18px;
      margin-bottom: 30px;
    }
      .container-item-logo {
        margin-bottom: 30px;
        img {
          height: 60px;
        }
      }
      p {
        margin-bottom: 30px;
        line-height: 1.5;
      }
      .container-item-icon {
        i {
          width: 30px;
          height: 30px;
          color: #c1c1c1;
          font-size: 14px;
          line-height: 29px;
          text-align: center;
          border-radius: 50%;
          background: transparent;
          transition: 0.4;
          border: 1px solid #c1c1c1;
          margin-right: 15px;
        }
        i:hover {
          color: white;
          background-color: #3dca79;
          border: 1px solid #3dca79;
        }
      }
    }
  }
  .row {
    padding-top: 100px;
    padding-bottom: 60px;
    text-align: center;
    .line {
     border-top: 1px solid #C1C1C1;
     padding-bottom: 30px;

    }
  }
}
</style>
