<template>
  <div class="icon-container">
    <div
      @click="show = true"
      class="badage-container"
    >
      <el-badge
        :hidden="badgeValue === 0"
        :value="badgeValue"
      >
        <slot name="icon"></slot>
      </el-badge>
    </div>

    <el-drawer
      :modal-append-to-body="false"
      :visible.sync="show"
      :with-header="false"
    >
      <slot></slot>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    badgeValue: Number
  },
  data() {
    return {
      show: false
    };
  }
};
</script>

<style lang="less">
.icon-container {
  .el-drawer {
    width: auto !important;
    .el-drawer__body {
      overflow: auto;
    }
  }
  .badage-container {
    cursor: pointer;

  }
  i {
    font-size: 18px;
  }
}
</style>
