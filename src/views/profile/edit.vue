<template>
  <el-card class="edit-user-info">
    <el-page-header
      @back="$router.go(-1)"
      content="编辑资料"
    ></el-page-header>
    <el-form label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="中文名字"
            prop="cname"
          >
            <el-input
              placeholder="请输入你的中文名字"
              v-model="form.cname"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="性别"
            prop="sex"
          >
            <el-select
              placeholder="请选择"
              v-model="form.sex"
            >
              <el-option value="男"></el-option>
              <el-option value="女"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="用户昵称"
            prop="nick"
          >
            <el-input
              placeholder="请输入你的昵称"
              v-model="form.nick"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="年龄"
            prop="age"
          >
            <el-input
              placeholder="请输入你的年龄"
              v-model="form.age"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="常用手机"
            prop="phone"
          >
            <el-input
              placeholder="请输入你的手机号码"
              v-model="form.phone"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              placeholder="请输入你的邮箱"
              v-model="form.email"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item
        label="人生格言"
        prop="motto"
      >
        <el-input
          placeholder="请输入你的人生格言"
          type="textarea"
          v-model="form.motto"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          @click="onSubmit"
          type="success"
        >保存资料</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import apis from '@/store/network/user';

export default {
  data() {
    return {
      form: {}
    };
  },

  mounted() {
    var userInfo = this.$store.state.userInfo || {};
    this.form = { ...userInfo };
  },

  watch: {
    ['$store.state.userInfo']() {
      var userInfo = this.$store.state.userInfo || {};
      this.form = { ...userInfo };
    }
  },

  methods: {
    onSubmit() {
      apis.update(this.form).then(resp => {
        this.$message.success('编辑成功');
        this.$router.replace({ name: 'profile-info' });
        this.$store.dispatch(`query-user-info`);
      });
    }
  }
};
</script>

<style lang="less">
.edit-user-info {
  .el-page-header {
    margin-bottom: 30px;
  }
  .el-select {
    width: 100%;
  }
}
</style>
