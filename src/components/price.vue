<template>
  <div :class="['price', type]">
    <span class="int">{{number.int}}</span>
    <span>.</span>
    <span class="decimal">{{number.decimal}}</span>
    <span>元</span>
  </div>
</template>
<script>
export default {
  props: {
    value: [Number, String],
    type: String
  },
  computed: {
    number() {
      var data = (this.value * 1).toFixed(2).split('.');
      return {
        int: data[0],
        decimal: data[1]
      };
    }
  }
};
</script>
<style lang="less" scoped>
.price {
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  line-height: 1;
  margin-right: 10px;
  .int {
    font-size: 18px;
    font-weight: 600;
  }
  &.line {
    position: relative;
    .int {
      font-size: 14px;
      font-weight: normal;
    }

    text-decoration: line-through;
  }
}
</style>
