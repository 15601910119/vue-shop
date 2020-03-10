<template>
  <section class="discount-commodity">
    <el-row
      :gutter="30"
      class="hot-commodities"
      v-if="data.length > 0"
    >
      <el-col :span="leftCol" v-if="data[0]">
        <hot-commodity :data="data[0]"></hot-commodity>
      </el-col>
      <el-col :span="rightCol" v-if="data[1]">
        <hot-commodity :data="data[1]"></hot-commodity>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import HotCommodity from '@/components/hot-commodity';

export default {
  components: {
    'hot-commodity': HotCommodity
  },
  props: {
    leftCol: Number,
    rightCol: Number,
    data: Array
  },
};
</script>
<style lang="less">
.discount-commodity {
  padding-top: 60px;
  padding-bottom: 60px;
}
</style>
