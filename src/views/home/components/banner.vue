<template>
  <div class="banner-container" :style="{ 'padding-top': height }">
    <el-carousel
      ref="carousel"
      :autoplay="false"
      height="100%"
      trigger="click"
      arrow="never"
      :interval="7000"
    >
      <el-carousel-item :key="banner.id" v-for="banner in banners">
        <div
          :style="{
            'background-image': 'url(' + banner.image + ')',
            'background-color': banner.bgcolor
          }"
          class="banner-item"
        >
          <aside class="common-container">
            <h1>{{ banner.title }}</h1>
            <pre>{{ banner.text }}</pre>
            <el-button type="success" @click="$router.push(banner.link)">{{
              banner.btntext
            }}</el-button>
          </aside>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    banners: Array,
    height: {
      type: String,
      default: `25%`
    }
  }
};
</script>

<style lang="less">
.banner-container {
  position: relative;
  width: 100%;
  .el-carousel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
  }
  .banner-item {
    padding-top: 2%;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #ccc;
    height: 100%;
    aside {
      h1 {
        font-size: 3vw;
        line-height: 1.5;
        margin-bottom: 2%;
        font-weight: 700;
        color: white;
        margin-right: 50%;
      }
      pre {
        font-size: 1.25vw;
        line-height: 1.5;
        color: white;
        margin-bottom: 2%;
        margin-right: 50%;
        max-width: 50%;
      }
    }
  }
}
</style>