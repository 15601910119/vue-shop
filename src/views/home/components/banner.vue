<template>
  <div class="banner-container" :style="{ 'padding-top': height }">
    <el-carousel
      ref="carousel"
      :autoplay="true"
      height="100%"
      arrow="never"
      trigger="click"
      :interval="7000"
      @change="onChange($event)"
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
            <pre :id="banner.id">{{ banner.text }}</pre>
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
import $ from 'jquery';
var timer;

$.fn.autotype = function() {
  var $text = $(this);
  var str = this[0]._text = this[0]._text || $text.html();;
  var index = 0;

  $text.height($text.height());

  clearInterval(timer);

  timer = setInterval(function() {
    var current = str.substr(index, 1);

    if (current === '<') {
      //indexOf() 方法返回">"在字符串中首次出现的位置。
      index = str.indexOf('>', index) + 1;
    } else {
      index++;
    }

    $text.html(str.substring(0, index) + (index & 1 ? '_' : ''));
    index > $text.html().length + 10 && (index = 0);

    if (index >= str.length) {
      clearInterval(timer);
      $text.html(str.substring(0, index));
    }
  }, 100);
};

export default {
  props: {
    banners: Array,
    height: {
      type: String,
      default: `25%`
    }
  },
  watch: {
    banners(val) {
      if (val.length > 0 && !this.didMounted) {
        this.didMounted = true;

        setTimeout(() => {
          this.onChange(0);
        }, 100);
      }
    }
  },
  methods: {
    onChange(index) {
      $(`#${this.banners[index].id}`).autotype();
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
    background-size: cover;
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
        font-size: 1.2vw;
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
