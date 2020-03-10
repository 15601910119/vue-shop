<template>
  <div class="indent">
    <el-tabs
      @tab-click="onTypeChange"
      v-model="activeName"
    >
      <el-tab-pane name="paid">
        <el-badge
          :value="overview.paid || paids.length"
          slot="label"
          type="success"
        >已支付</el-badge>
        <order
          :data="order"
          :key="order.id"
          @delete="onDelete($event)"
          v-for="order in paids"
        ></order>
      </el-tab-pane>
      <el-tab-pane
        name="unpaid"
      >
      <el-badge
      :value="overview.unpaid || unpaids.length"
      slot="label"
      type="warning"
      >
      未支付
      </el-badge>
        <order
          :data="order"
          :key="order.id"
          @cancel="oncancel($event)"
          @confirm="onConfirm($event)"
          @delete="onDelete($event)"
          v-for="order in unpaids"
        ></order>
      </el-tab-pane>
      <el-tab-pane
        name="canceled"
      >
      <el-badge
      :value="overview.canceled || canceleds.length"
      slot="label"
      type="danger"
      >已取消</el-badge>
        <order
          :data="order"
          :key="order.id"
          @delete="onDelete($event)"
          v-for="order in canceleds"
        ></order>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import apis from '@/store/network/apis';
import Order from '@/components/order';
export default {
  components: {
    order: Order
  },
  data() {
    return {
      activeName: 'paid',
      paids: [],
      unpaids: [],
      canceleds: [],
      overview: {
        paid: 0,
        unpaid: 0,
        canceled: 0
      }
    };
  },
  mounted() {
    this.getPaids();

    apis.overviewOrder().then(resp => {
      this.overview = resp.data;
    });
  },
  methods: {
    onConfirm(data) {
      apis.payment({ id: data.id }).then(resp => {
        this.unpaids = this.unpaids.filter(item => {
          return item.id !== data.id;
        });
        this.getPaids();
      });
    },
    oncancel(data) {
      apis.cancelOrder({ id: data.id }).then(resp => {
        this.unpaids = this.unpaids.filter(item => {
          return item.id !== data.id;
        });
        this.getCanceleds();
      });
    },
    getPaids() {
      apis.getOrders({ type: `PAID` }).then(resp => {
        this.paids = resp.data;
        this.overview.paid = 0;
      });
    },
    getUnpaids() {
      apis.getOrders({ type: `UNPAID` }).then(resp => {
        this.unpaids = resp.data;
        this.overview.unpaid = 0;
      });
    },
    getCanceleds() {
      apis.getOrders({ type: `CANCELED` }).then(resp => {
        this.canceleds = resp.data;
        this.overview.canceled = 0;
      });
    },
    onTypeChange(tab) {
      if (tab.name === 'paid') {
        this.getPaids();
      } else if (tab.name === 'unpaid') {
        this.getUnpaids();
      } else if (tab.name === 'canceled') {
        this.getCanceleds();
      }
    },
    onDelete(data) {
      apis.deleteOrder({ id: data.id }).then(resp => {
        if (data.status === '已支付') {
          this.paids = this.paids.filter(item => {
            return item.id !== data.id;
          });
        } else if (data.status === '未支付') {
          this.unpaids = this.unpaids.filter(item => {
            return item.id !== data.id;
          });
        } else if (data.status === '已取消') {
          this.canceleds = this.canceleds.filter(item => {
            return item.id !== data.id;
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.indent {
  .el-card {
    margin-bottom: 15px;
  }
  .el-tabs__item {
    padding-top: 10px;
    height: 50px;
  }
}
</style>
