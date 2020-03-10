<template>
  <div class="money">
    <money-breadcrumb
      :routes="routes"
      title="收银台"
    ></money-breadcrumb>
    <div class="common-container">
      <el-row>
        <el-col :span="16">
          <div
            :class="{active: address.id === activeId}"
            :key="address.id"
            @click="activeId = address.id"
            v-for="address in addresses"
          >
            <el-card class="address">
              <div class="recipient">
                <span>{{address.recipient}}</span>
                <span>({{address.name}})</span>
              </div>

              <span>{{address.detail}}</span>
              <span>{{address.phone}}</span>
            </el-card>
          </div>
          <el-button
            @click="visible = true"
            type="primary"
          >使用新地址</el-button>
          <el-dialog
            :close-on-click-modal="false"
            :visible.sync="visible"
            @closed="onReset"
            title="创建地址"
          >
            <div class="from-address">
              <el-form
                :model="form"
                :rules="rules"
                label-width="80px"
                ref="form"
              >
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="收件人"
                      prop="recipient"
                    >
                      <el-input
                        placeholder="请输入收件人姓名"
                        v-model="form.recipient"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="手机号"
                      prop="phone"
                    >
                      <el-input
                        placeholder="请输入收件人手机号"
                        v-model="form.phone"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="地址别名"
                      prop="name"
                    >
                      <el-input
                        placeholder="请输入地址别名"
                        v-model="form.name"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="地址"
                      prop="address"
                    >
                      <el-cascader
                        :options="address"
                        :props="{value: 'label'}"
                        v-model="form.address"
                      ></el-cascader>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item
                  label="街道地址"
                  prop="detail"
                >
                  <el-input
                    placeholder="请输入街道地址"
                    type="textarea"
                    v-model="form.detail"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>

            <span
              class="dialog-footer"
              slot="footer"
            >
              <el-button @click="visible = false">取 消</el-button>
              <el-button
                @click="onConfirm"
                type="primary"
              >确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
        <el-col :span="8">
          <div class="order-info">
            <div class="title">订单信息</div>
            <div class="total-warp">
              <div
                class="total-item"
                v-for="commodity in $store.state.carts"
              >
                <span class="info">
                  {{commodity.name}}
                  <i class="el-icon-close"></i>
                  {{commodity.count}}
                </span>
                <span class="price">{{(commodity.price * commodity.count).toFixed(2)}}</span>
              </div>
              <div class="total-item total">
                <span class="total">总金额</span>
                <span class="price">{{allMoney}}</span>
              </div>
              <div class="total-item btn">
                <el-button
                  @click="onSubmit"
                  type="primary"
                >提交订单</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import moneyBreadcrumb from '@/components/breadcrumb';
import apis from '@/store/network/apis';
import user from '@/store/network/user';

export default {
  components: {
    'money-breadcrumb': moneyBreadcrumb
  },
  computed: {
    allMoney() {
      var num = 0;
      var carts = this.$store.state.carts;
      for (var i = 0; i < carts.length; i++) {
        num += carts[i].price * carts[i].count;
      }
      return num.toFixed(2);
    }
  },
  mounted() {
    apis.queryAreas().then(resp => {
      this.address = resp.data;
    });
    user.queryAddress().then(resp => {
      this.addresses = resp.data;
    });
  },
  methods: {
    onReset() {
      this.form = {};
      this.$refs.form.resetFields();
    },
    onConfirm() {
      this.$refs.form.validate(isValid => {
        if (!isValid) {
          return;
        }
        var data = { ...this.form };

        if (Array.isArray(data.address)) {
          data.address = data.address.join('/');
        }

        user.addAddress(data).then(resp => {
          user.queryAddress().then(resp => {
            this.addresses = resp.data;
          });
        });

        this.visible = false;
      });
    },
    onSubmit() {
      var data = { shipId: '', commodities: [] };
      var carts = this.$store.state.carts;
      for (var i = 0; i < this.addresses.length; i++) {
        if (this.addresses[i].id === this.activeId) {
          data.shipId = this.addresses[i].id;
        }
      }
      for (var i = 0; i < carts.length; i++) {
        data.commodities.push({ id: carts[i].id, count: carts[i].count });
      }

      user.addOrder(data).then(resp => {
        this.$store.dispatch(`get-cart-info`);
        this.$router.replace({
          name: 'payment',
          params: {
            data: resp.data || []
          }
        });
      });
    }
  },

  data() {
    return {
      activeId: ``,
      visible: false,
      addresses: [],
      address: [],
      routes: [
        {
          path: '/',
          name: '首页'
        },
        {
          name: '收银台'
        }
      ],
      form: {
        name: '',
        recipient: '',
        phone: '',
        detail: ''
      },
      rules: {
        recipient: [
          {
            required: true,
            message: '收件人不能为空',
            trigger: `blur`
          }
        ],
        phone: [
          {
            required: true,
            message: '手机号能为空',
            trigger: `blur`
          }
        ],
        detail: [
          {
            required: true,
            message: '街道地址不能为空',
            trigger: `blur`
          }
        ]
      }
    };
  }
};
</script>
<style lang="less">
.money {
  .active {
    .el-card {
      border: 1px solid #409eff;
    }
  }
  .address {
    cursor: pointer;
    margin-bottom: 10px;
    .recipient {
      margin-bottom: 10px;
      span {
        font-weight: 500;
      }
    }
  }
  .common-container {
    margin: 120px auto;
    .el-col-16 {
      padding-right: 30px;
    }
    .el-col-8 {
      padding-left: 30px;
    }
    .from-address {
      .el-cascader {
        width: 100%;
      }
      label {
        color: #071c35;
        font-weight: 600;
      }
    }
    .order-info {
      padding: 50px;
      border: 1px solid #f3f3f3;
      border-radius: 5px;
      .title {
        margin-bottom: 40px;
        font-weight: 600;
        color: #292633;
        font-size: 25px;
      }
      .total-warp {
        .total-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          button {
            width: 100%;
          }
          .info {
            color: #686868;
            font-weight: 500;
            i {
              font-size: 12px;
              margin: 0 3px;
            }
          }
          .price {
            color: #292633;
            font-weight: 600;
            font-size: 16px;
          }
        }
        .total-item.total {
          font-weight: 600;
          padding: 25px 0;
          color: #292633;
          border-top: 1px solid #f3f3f3;
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>







