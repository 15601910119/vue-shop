<template>
  <div class="scale-box" :style="{'padding-top': paddingTop}">
    <div class="flex-center">
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
    }
  },
  computed: {
    paddingTop() {
      var [w, h] = this.scale.split(`:`) || [];

      if (w && h) {
        return (h / w) * 100 + `%`;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.scale-box {
  position: relative;
  .flex-center {
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
