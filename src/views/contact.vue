<template>
  <div class="contact">
    <contact-breadcrumb
      :routes="routes"
      title="联系我们"
    ></contact-breadcrumb>
    <div class="common-container">
      <el-row :gutter="30">
        <el-col
          :span="12"
          class="contact-info"
        >
          <h3 class="title">联系方式</h3>
          <el-row :gutter="30">
            <el-col :span="12">
              <div class="contact-item">
                <i class="el-icon-phone-outline"></i>
                <span>156 0191 0119</span>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="contact-item">
                <i class="el-icon-message"></i>
                <span>1250943062@qq.com</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <div class="contact-item">
                <i class="el-icon-location-outline"></i>
                <span>地址:上海市青浦区赵巷镇</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="contact-item">
                <i class="el-icon-user"></i>
                <span>李国印</span>
              </div>
            </el-col>
          </el-row>
        </el-col>

        <!-- 取得联系开始 -->

        <el-col
          :span="12"
          class="contact-form"
        >
          <h3 class="title">取得联系</h3>
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
          >
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item
                  label="姓名"
                  prop="name"
                >
                  <el-input
                    placeholder="输入姓名"
                    v-model="form.name"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="邮箱"
                  prop="email"
                >
                  <el-input
                    placeholder="输入邮箱"
                    v-model="form.email"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item
                  label="手机"
                  prop="phone"
                >
                  <el-input
                    placeholder="输入手机号"
                    v-model="form.phone"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="职位"
                  prop="subject"
                >
                  <el-select
                    placeholder="请选择"
                    v-model="form.subject"
                  >
                    <el-option
                      :key="item.id"
                      :label="item.value"
                      :value="item.id"
                      v-for="item in subjects"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item
              label="消息"
              prop="content"
            >
              <el-input
                :rows="6"
                type="textarea"
                v-model="form.content"
                placeholder="请输入您的留言"
              ></el-input>
            </el-form-item>
            <el-button
              @click="onSubimt"
              type="primary"
            >发送消息</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import contactBreadcrumb from '@/components/breadcrumb';
import apis from '@/store/network/apis';
export default {
  components: {
    'contact-breadcrumb': contactBreadcrumb
  },
  methods: {
    onSubimt() {
      this.$refs.form.validate(isValid => {
        if (isValid) {
          apis.sendMessage(this.form).then(resp => {
            this.$router.push({name: 'success'});
          });
        }
      });
    }
  },
  data() {
    return {
      routes: [
        {
          path: '/',
          name: '首页'
        },
        {
          name: '联系我们'
        }
      ],
      subjects: [
        {
          id: '猎头',
          value: '猎头'
        },
        {
          id: 'HR',
          value: 'HR'
        },
        {
          id: '主管',
          value: '主管'
        },
        {
          id: '其他',
          value: '其他'
        }
      ],
      form: {
        name: '',
        email: '',
        phone: '',
        content: '',
        subject: ''
      },
      rules: {
        content: [
          {
            required: true,
            message: '不能为空',
            trigger: `blur`
          }
        ]
      }
    };
  }
};
</script>
<style lang="less">
.contact {
  .common-container {
    .title {
      margin-bottom: 45px;
      font-weight: 600;
      font-size: 40px;
      color: #292633;
    }
    margin: 120px auto;
    .contact-info {
      .contact-item {
        text-align: center;
        padding: 50px;
        border: 1px solid #f3f3f3;
        border-radius: 5px;
        margin-bottom: 30px;
        i {
          display: block;
          font-size: 25px;
          color: #3dca79;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: auto;
          margin-bottom: 30px;
          line-height: 60px;
          box-shadow: 0px 0px 30px #2926330d;
        }
        span {
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
    .contact-form {
      .el-select {
        width: 100%;
      }
      label {
        color: #292633;
        font-size: 16px;
        font-weight: 600;
      }
      .el-button {
        margin-top: 30px;
        width: 100%;
      }
    }
  }
}
</style>
