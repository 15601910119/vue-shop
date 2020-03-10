<template>
  <el-carousel
    :autoplay="true"
    :height="height"
    trigger="click"
    arrow="never"
  >
    <el-carousel-item
      :key="banner.image"
      v-for="banner in banners"
    >
      <div
        :style="{'background-image': 'url('+ banner.image + ')'}"
        class="banner-wrapper"
      >
        <aside class="common-container">
          <h1>{{banner.title}}</h1>
          <pre>{{banner.text}}</pre>
          <el-button type="success" @click="$router.push(banner.link)">{{banner.btntext}}</el-button>
        </aside>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: {
    banners: Array,
    height: String
  }
};
</script>

<style lang="less">
.banner-wrapper {
  background-position: center center;
  background-size: cover;
  height: 100%;
  padding-top: 120px;
  padding-bottom: 120px;
  box-sizing: border-box;
  pre {
    color: white;
  }
  aside {
    h1 {
      font-size: 55px;
      line-height: 85px;
      margin-bottom: 26px;
      font-weight: 700;
      color: white;
      margin-right: 500px;
    }
    p {
      font-size: 18px;
      font-weight: 400;
      line-height: 2;
      color: white;
      margin-bottom: 40px;
      margin-right: 300px;
      max-width: 660px;
    }
  }
}
</style>

