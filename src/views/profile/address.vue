<template>
  <div class="user-address" v-loading="loading">
    <div>
      <el-card
        :key="address.id"
        v-for="address in addresses"
      >
        <div
          class="clearfix"
          slot="header"
        >
          <span class="alias">{{address.name}}</span>
          <el-button-group>
            <el-button
              @click="onEditAddress(address)"
              type="text"
            >编辑</el-button>
            <el-popconfirm
              :title="`确认删除${address.name}吗？`"
              @onConfirm="onDeleteAddress(address)"
            >
              <el-button
                class="danger"
                slot="reference"
                type="text"
              >删除</el-button>
            </el-popconfirm>
          </el-button-group>
        </div>
        <div class="address-content">
          <div class="flex-center row-info">
            <label>收件人</label>
            <p>{{address.recipient}}</p>
          </div>
          <div class="flex-center row-info">
            <label>收货地址</label>
            <p>{{address.address}}{{address.detail}}</p>
          </div>
        </div>
      </el-card>
    </div>
    <el-button
      @click="onAddAddress"
      type="text"
    >新增收货地址</el-button>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="visible"
      @closed="onReset"
      :close-on-click-modal="false"

    >
      <el-form
        :model="form"
        :rules="rules"
        label-width="100px"
        ref="form"
      >
        <el-form-item
          label="地址别名"
          prop="name"
        >
          <el-input
            placeholder="请输入地址别名，方便记忆"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="收货地址"
          prop="address"
        >
          <el-cascader
            :options="areas"
            :props="{value: 'label'}"
            placeholder="请选择收货地址"
            v-model="form.address"
          ></el-cascader>
        </el-form-item>

        <el-form-item
          label="详细地址"
          prop="detail"
        >
          <el-input
            placeholder="请输入详细地址"
            v-model="form.detail"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="收件人"
          prop="recipient"
        >
          <el-input
            placeholder="请输入收件人姓名"
            v-model="form.recipient"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="联系手机"
          prop="phone"
        >
          <el-input
            placeholder="请输入收件人的手机号"
            v-model="form.phone"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        class="dialog-footer"
        slot="footer"
      >
        <el-button @click="visible = false">取消</el-button>
        <el-button
          @click="onSubmit"
          type="primary"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import apis from '@/store/network/user';

export default {
  mounted() {
    this.loading = true;
    this.queryAllAddresses();
    apis.queryAreas().then(resp => {
      this.loading = false;
      this.areas = resp.data;
    });
  },
  data() {
    return {
      loading: false,
      dialogTitle: ``,
      addresses: [],
      areas: [],
      form: {
        id: '',
        name: '',
        cname: '',
        username: '',
        address: '',
        detail: '',
        phone: '',
        recipient: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '地址别名不能为空',
            trigger: `blur`
          }
        ],
        address: [
          {
            required: true,
            message: '收货地址不能为空',
          }
        ],
        detail: [
          {
            required: true,
            message: '详细地址不能为空',
            trigger: `blur`,
          }
        ],
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
            message: '联系手机不能为空',
            trigger: `blur`
          }
        ]
      },
      visible: false
    };
  },
  methods: {
    onReset() {
      this.form = {};
      this.$refs.form.resetFields();
    },
    queryAllAddresses() {
      apis.queryAddress().then(resp => {
        this.addresses = resp.data;
      });
    },
    onEditAddress(data) {
      this.form = { ...data };
      this.form.address = data.address.split(`/`);
      this.visible = true;
      this.dialogTitle = `编辑收货地址`;
    },
    onAddAddress() {
      this.visible = true;
      this.dialogTitle = `新增收货地址`;
    },
    onDeleteAddress(data) {
      apis.deleteAddress({ id: data.id }).then(resp => {
        this.$message.success(`删除成功`);
        this.queryAllAddresses();
      });
    },
    onSubmit() {
      this.$refs.form.validate(isValid => {
        if (!isValid) {
          return;
        }
        var data = { ...this.form };

        if (Array.isArray(data.address)) {
          data.address = data.address.join('/');
        }

        if (this.dialogTitle === `编辑收货地址`) {
          apis.updateAddress(data).then(resp => {
            this.visible = false;
            this.$message.success(`编辑成功`);
            this.queryAllAddresses();
          });
        } else {
          apis.addAddress(data).then(resp => {
            this.visible = false;
            this.$message.success(`新增成功`);
            this.queryAllAddresses();
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.user-address {
  .el-card {
    margin-bottom: 25px;
    .alias {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .el-card__header {
    .clearfix {
      display: flex;
      align-items: center;
      & > span {
        flex: 1 1 0;
      }

      .danger {
        color: #f56c6c;
        margin-left: 10px;
      }
    }
  }
  .address-content {
    .row-info {
      justify-content: flex-start;
      font-size: 16px;
      color: #333;

      p {
        margin-left: 25px;
      }
    }
  }
}
</style>
