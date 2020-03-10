<template>
  <div class="advertise">
    <div class="advertise-text">
      <h6>{{data.brand}}</h6>
      <h3>{{data.name}}</h3>
      <p>{{data.info}}</p>
      <el-button type="success">立即抢购</el-button>
    </div>
    <div class="advertise-img">
      <img :src="data.image">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object
  }
};
</script>

<style lang="less">
.advertise {
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  align-items: center;
  max-width: 700px;
  .advertise-text {
    padding: 40px;
    padding-right: 0;
    h6 {
      color: #e71214;
      font-size: 16px;
      line-height: 1.4;
      font-weight: 600;
      margin-bottom: 15px;
    }
    h3 {
      font-size: 40px;
      line-height: 1.4;
      margin-bottom: 15px;
    }
    p {
      margin-bottom: 15px;
    }
    button {
      background: #3dca79;
      border: 1px solid #3dca79;
      padding: 12px 30px;
      transition: 0.5s;
    }
    button:hover {
      transform: translateY(-3px);
      box-shadow: 0px 10px 30px #3dca7966;
    }
  }
  .advertise-img {
    margin-right: 20px;
    img {
      max-width: 100%;
      vertical-align: middle;
    }
  }
}
</style>
