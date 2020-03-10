<template>
  <div class="message">
    <el-card>
      <el-page-header
        @back="$router.go(-1)"
        content="我的留言"
      ></el-page-header>
    </el-card>
    <el-card
      :key="message.id"
      v-for="message in messages"
    >
      <div slot="header" class="clearfix">
    <span>消息内容</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="onDelete(message)">删除留言</el-button>
  </div>
      <div class="info">
        <span class="name">{{message.name || '匿名'}}</span>
        <span>在</span>
        <span class="time">{{toTime(message.time)}}</span>
        <span>对我说</span>
      </div>
      <p>{{message.content}}</p>
    </el-card>
  </div>
</template>
<script>
import apis from '@/store/network/apis';
export default {
  data() {
    return {
      messages: []
    };
  },
  methods: {
    toTime(ts) {
      if (!ts) {
        return '--';
      }

      var time = new Date(ts).toTimeString().slice(0, 8);
      var date = new Date(ts).toISOString().slice(0, 10);
      return date + ' ' + time;
    },
    onDelete(data) {
      apis.deleteMessage({id: data.id}).then(resp => {
        this.$message.success('删除成功');
        this.messages = this.messages.filter(item => {
          return item.id !== data.id;
        })
      })
    }
  },
  mounted() {
    apis.queryMessage().then(resp => {
      this.messages = resp.data;
    });
  }
};
</script>
<style lang="less">
.message {
  .el-page-header {
    margin-bottom: 30px;
  }
  .el-card {
    margin-bottom: 15px;
  }
  .info {
    .name {
      font-size: 16px;
      font-weight: 600;
      margin-right: 10px;
    }
    .time {
      margin: 0 10px;
    }
  }
}
</style>
