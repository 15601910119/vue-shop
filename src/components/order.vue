<template>
  <el-card>
    <div class="order">
      <div class="flex-center">
        <img :src="data.commodityImage">
      </div>
      <span class="commodity-name">{{data.commodityName}}</span>
      <div class="price-info">
        <price
          :value="(data.price + data.discount) / data.count"
          type="line"
          v-if="data.discount - 0 > 0"
        ></price>
        <price :value="data.price / data.count"></price>
      </div>
      <span class="commodity-count">{{data.count}}</span>
      <price
        :value="data.price"
        class="commodity-price"
      ></price>
      <template v-if="data.status === '未支付'">
        <el-popconfirm
          cancelButtonText="取消订单"
          confirmButtonText="支付订单"
          @onConfirm="$emit('confirm', data)"
          @onCancel="$emit('cancel', data)"
          title="请选择"
        >
          <span
            :class="['commodity-status', getStatus(data.status)]"
            slot="reference"
          >{{data.status}}</span>
        </el-popconfirm>
      </template>
      <span
        :class="['commodity-status', getStatus(data.status)]"
        v-else
      >{{data.status}}</span>
      <el-button
        @click="$emit('delete', data)"
        class="danger"
        type="text"
      >删除</el-button>
    </div>
  </el-card>
</template>

<script>
import Price from './price';
export default {
  components: {
    price: Price
  },
  props: {
    data: Object
  },
  methods: {
    getStatus(status) {
      if (status === '已支付') {
        return 'success';
      } else if (status === '未支付') {
        return 'unpaid';
      } else if (status === '已取消') {
        return 'canceled';
      }
    },

  }
};
</script>
<style lang="less">
.order {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .flex-center {
    border: 1px solid #f3f3f3;
    padding: 10px;
    margin-right: 15px;
    flex-shrink: 0;
  }
  img {
    width: 100px;
  }
  .commodity-status {
    flex-grow: 0;
    flex-shrink: 0;
  }
  .commodity-name,
  .price-info,
  .commodity-count,
  .commodity-price {
    flex: 1 1 0;
  }
  .success {
    color: #3dca79;
  }
  .unpaid {
    color: #e6a23c;
    cursor: pointer;
  }
  .canceled {
    color: #909399;
  }
  .danger {
    margin-left: 20px;
    color: #f56c6c;
  }
}
</style>
