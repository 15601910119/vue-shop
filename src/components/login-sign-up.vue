<template>
  <div class="common-container login-sign-up">
    <div class="flex-center">
      <el-col
        :span="14"
        class="container-img"
      ></el-col>
      <el-col
        :span="10"
        class="container-login"
      >
        <slot></slot>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.login-sign-up {
  margin: 120px auto;
  .container-login {
    padding: 120px 30px;
    box-shadow: 0px 0px 30px #2926330d;
    height: 100%;
    .title {
      h2 {
        margin-bottom: 15px;
        font-size: 45px;
        line-height: 1.4;
      }
    }
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
  .flex-center {
    align-items: stretch;
  }
}
.container-img {
  background-size: cover;
  background-position: center;
  background-image: url('http://assets.xvivx.online/static/log-in.png');
}
</style>
