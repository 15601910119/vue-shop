<template>
  <div class="login">
    <route-breadcrumb
      :routes="routes"
      :title="title"
    ></route-breadcrumb>
    <login-sign-up>
      <div class="title">
        <h2>欢迎回来</h2>
      </div>
      <el-form
        :model="form"
        :rules="rules"
        label-position="top"
        ref="form"
        status-icon
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            placeholder="用户名为字母和数字组合"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pass"
        >
          <el-input
            @keyup.enter.native="submit"
            placeholder="请输入密码"
            show-password
            type="password"
            v-model="form.pass"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div class="sign">
            <span>忘记密码</span>
            <span>没有账号</span>
            <router-link to="/view/sign-up">注册账号</router-link>
          </div>
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button
            @click="onReset"
            class="btn-reset"
          >重置</el-button>
          <el-button
            @click="submit"
            class="btn-login"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </login-sign-up>
  </div>
</template>
<script>
import LoginSignUp from '@/components/login-sign-up';
import Breadcrumb from '@/components/breadcrumb';
import apis from '@/store/network/apis';

export default {
  components: {
    'route-breadcrumb': Breadcrumb,
    'login-sign-up': LoginSignUp
  },
  data() {
    return {
      submitLoading: false,
      title: '欢迎登陆',
      routes: [{ path: '/', name: '首页' }, { name: '登陆' }],
      form: {
        pass: '',
        username: ''
      },
      rules: {
        pass: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            validator(rule, value, callback) {
              if (value.length < 6) {
                callback('密码不得少于六位');
                return;
              } else {
                return callback();
              }
            },
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '用户名必填',
            trigger: 'blur'
          },
          {
            validator(rule, value, callback) {
              if (value.length < 3) {
                return callback(`用户名太短`);
              } else if (!/^[\da-zA-Z]+$/.test(value)) {
                return callback(`用户名只能是数组和字母组合`);
              }

              return callback();
            },
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(isValid => {
        if (isValid) {
          var data = {
            username: this.form.username,
            password: this.form.pass
          };

          this.submitLoading = true;
          apis
            .login(data)
            .then(resp => {
              this.submitLoading = false;

              if (resp.status === 'success') {
                window.localStorage.setItem(`token`, resp.token);
                this.$store.dispatch(`query-user-info`);
                this.$store.dispatch(`get-cart-info`);
                this.$router.replace('/');
              } else if (resp.error) {
                this.$message.error(resp.error);
              }
            })
            .catch(e => {
              this.submitLoading = false;
            });
        }
      });
    },
    onReset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>