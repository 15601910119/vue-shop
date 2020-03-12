<template>
  <div class="login-sign">
    <div class="form-container">
      <div class="common-container">
        <el-card class="container-login">
          <slot></slot>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import apis from '@/store/network/apis';

export default {

};
</script>

<style lang="less">
.login-sign {
  background-image: url('http://assets.xvivx.online/static/login.jpg');
  background-size: cover;
  .form-container {
    position: relative;
    height: calc(100vh - 80px);
    .common-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .container-login {
    width: 500px;
    box-shadow: 0px 0px 30px #2926330d;

    label {
      font-weight: 600;
      font-size: 16px;
      color: black;
    }
    .sign {
      span {
        margin: 0 5px;
      }
    }
    button {
      color: white;
      border: none;
    }
    .btn-login {
      background: #3dca79;
    }
    .btn-reset {
      background: #02a2ea;
    }
    .btn-group {
      .el-form-item__content {
        display: flex;
        button {
          flex: 1 1 0;
        }
      }
    }
  }
}
</style>
