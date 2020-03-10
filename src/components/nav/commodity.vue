<template>
  <div class="navbar-commodity">
    <i
      @click="onDelete(data)"
      class="el-icon-delete"
    ></i>
    <div class="flex-center image-wrapper">
      <img :src="data.image">
    </div>
    <div class="commodity-info">
      <p>{{data.name}}</p>
      <h5>{{data.price}}</h5>
    </div>
    <div
      class="count"
      v-if="data.count > 0"
    >
      <el-input-number
        :max="data.inventory"
        :min="1"
        :value="data.count"
        @change="onInput(data, $event)"
      ></el-input-number>
    </div>
  </div>
</template>

<script>
import apis from '@/store/network/apis';
export default {
  props: {
    data: Object
  },
  methods: {
    onDelete(data) {
      if (data.count > 0) {
        this.$store.dispatch(`delete-cart`, data);
      } else {
        this.$store.commit('delete-form-collect', data);
      }
    },
    onInput(data, value) {
      data.count = value;

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$store.dispatch(`add-to-cart-database`, {
          id: data.id,
          count: data.count
        });
      }, 2000);
    }
  }
};
</script>

<style lang="less">
.navbar-commodity {
  display: flex;
  align-items: center;
  padding: 20px 20px 0 20px;
  font-size: 18px;
  .el-icon-delete {
    font-size: 18px;
    font-weight: 700;
  }
  .image-wrapper {
    width: 60px;
    height: 60px;
    border: 1px solid #eee;
    margin: 0 20px;
    padding: 5px;
    flex-shrink: 0;
    box-sizing: border-box;
    img {
      max-width: 100%;
    }
  }
  .commodity-info {
    flex: 1 1 0;
    min-width: 100px;
    max-width: 250px;
    padding-right: 20px;
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .el-input-number {
    width: 130px;
    user-select: none;
  }
  i {
    cursor: pointer;
  }
  p,
  h5 {
    margin: 0;
  }
}
</style>
