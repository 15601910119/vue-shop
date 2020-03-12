<template>
  <div :class="['menu', { active }]" @click="$emit(`change`, active)"></div>
</template>
<script>
export default {
  props: {
    active: Boolean
  }
};
</script>
<style lang="less" scoped>
.menu {
  position: relative;
  height: 44px;
  width: 44px;
  overflow: hidden;
  &::before,
  &::after {
    content: '';
    background-color: #fff;
    position: absolute;
    width: 26px;
    height: 2px;
    left: 0px;
    transition: all 0.2s;
    transform-origin: center center;
  }

  &::before {
    top: 15px;
  }
  &::after {
    bottom: 15px;
  }

  &.active {
    &::before {
      top: 21px;
      transform: rotate3d(0, 0, 1, 45deg);
    }
    &::after {
      bottom: 21px;
      transform: rotate3d(0, 0, 1, -45deg);
    }
  }
}
</style>
