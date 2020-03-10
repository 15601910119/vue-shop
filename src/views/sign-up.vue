<template>
  <div class="sign-up">
    <breadcrumb
      :routes="routes"
      :title="title"
    ></breadcrumb>
    <login-sign-up>
      <div class="title">
        <h2>注册</h2>
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
          prop="password"
        >
          <el-input
            placeholder="请输入密码"
            show-password
            type="password"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="aginword"
        >
          <el-input
            placeholder="确认密码"
            show-password
            type="aginword"
            v-model="form.aginword"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div class="sign">
            <span>你有账号吗？</span>
            <router-link to="/view/login">登录</router-link>
          </div>
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button
            @click="onReset"
            class="btn-reset"
          >重置</el-button>
          <el-button
            :loading="submitLoading"
            @click="submit"
            class="btn-login"
          >注册</el-button>
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
    'login-sign-up': LoginSignUp,
    breadcrumb: Breadcrumb
  },
  data() {
    return {
      submitLoading: false,
      title: '欢迎加入',
      routes: [
        {
          path: '/',
          name: '首页'
        },
        { name: '注册' }
      ],
      form: {
        password: '',
        aginword: '',
        username: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          },
          {
            validator(rule, value, callback) {
              if (value.length < 3 || value.length > 6) {
                callback('用户名3～6位');
                return;
              } else if (!/^[\da-zA-Z]+$/.test(value)) {
                callback('必须由数字和字母组成');
                return;
              } else {
                apis.checkName({username: value}).then(resp => {
                  callback();
                }).catch(resp => {
                  callback(resp.error);
                });
              }
            },
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            validator(rule, value, callback) {
              if (value.length < 6) {
                callback('密码不得少于6位');
                return;
              } else if (!/[A-Z]/.test(value)) {
                callback('密码必须至少一位是大写字母');
                return;
              } else if (!/\d/.test(value)) {
                callback('密码至少要有一位数字');
                return;
              } else {
                return callback();
              }
            },
            trigger: 'blur'
          }
        ],
        aginword: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback('与上面密码不一致');
                return;
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
    onReset() {
      this.$refs.form.resetFields();
    },
    submit() {
      this.$refs.form.validate(isValid => {
        if (isValid) {
          var data = {
            username: this.form.username,
            password: this.form.password
          };
          apis.signUp(data).then(resp => {
              this.$message.success('注册成功');

          });
        }
      });
    }
  }
};
</script>