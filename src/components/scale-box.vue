<template>
  <div class="scale-box" :style="style">
    <div class="box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scale: {
      type: String,
      default: `1:1`
    },
    image: {
      type: String,
      default: ''
    },
  },
  computed: {
    style() {
      var [w, h] = this.scale.split(`:`) || [];
      var style = {};

      if (w && h) {
        style['padding-top'] = (h / w) * 100 + `%`;
      }

      if (this.image) {
        style['background-image'] = `url(${this.image})`;
      }

      return style;
    }
  }
};
</script>

<style lang="less" scoped>
.scale-box {
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  .box-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    overflow: hidden;
  }
}
</style>
