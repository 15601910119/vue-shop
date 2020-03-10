<template>
  <div class="categories-manage">
    <div class="form">
      <el-button
        @click="handleAdd()"
        type="success"
      >添加品牌</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="品牌名称"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品状态"
        prop="status"
      ></el-table-column>

      <el-table-column
        label="创建时间"
        prop="createTime"
      >
        <template slot-scope="data">{{data.row.createTime | toTime}}</template>
      </el-table-column>
      <el-table-column
        label="修改时间"
        prop="updateTime"
      >
        <template slot-scope="data">{{data.row.updateTime | toTime}}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            type="text"
          >编辑</el-button>
          <el-button
            @click="handleClick(scope.row)"
            type="text"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="title"
      :visible.sync="visible"
      @closed="onReset"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        :rules="rules"
        label-width="100px"
        ref="form"
        status-icon
      >
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item
              label="品牌名称"
              prop="name"
            >
              <el-input
                placeholder="请输入商品名称"
                v-model="form.name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="品牌状态"
              prop="status"
            >
              <el-select
                placeholder="请选择"
                v-model="form.status"
              >
                <el-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-for="item in options"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="品牌描述"
          prop="description"
        >
          <el-input
            placeholder="请输入品牌描述"
            type="textarea"
            v-model="form.description"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="品牌LOGO"
          prop="file"
          ref="file"
        >
          <el-upload
            :auto-upload="false"
            :on-change="onFileChange"
            :show-file-list="false"
            action
          >
            <el-image
              :src="image"
              fit="contain"
              v-if="image"
            ></el-image>
            <i
              class="el-icon-plus avatar-uploader-icon"
              v-else
            ></i>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          @click="onSubmit"
          type="success"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import apis from '@/store/network/manage';

export default {
  mounted() {
    apis.queryAllCategoreis().then(resp => {
      this.tableData = resp.data;
    });
  },
  methods: {
    onReset() {
      this.form = {
        file: ``,
      };
      this.$refs.form.resetFields();
    },
    onFileChange(file) {
      this.form.file = file;
      this.$refs.file.clearValidate();
    },

    handleEdit(data) {
      this.title = `编辑品牌`;
      this.visible = true;
      this.form = {
        id: data.id,
        name: data.name,
        status: data.status,
        file: data.image,
        description: data.description
      };
    },
    handleClick(data) {
      apis.deleteCategory({ id: data.id }).then(resp => {
        if (resp.status === 'success') {
          this.$message.success(data.name + '删除成功');
          apis.queryAllCategoreis().then(resp => {
            this.tableData = resp.data;
          });
        } else {
          this.$message.error(data.name + '删除失败');
        }
      });
    },
    handleAdd() {
      this.title = `添加品牌`;
      this.visible = true;
      this.form = {
        file: ``,
      };
    },
    getFormData() {
      var formData = new FormData();

      if (this.form.id) {
        formData.append(`id`, this.form.id);
      }

      if (this.form.name) {
        formData.append(`name`, this.form.name);
      }

      if (this.form.status) {
        formData.append(`status`, this.form.status);
      }

      if (this.form.description) {
        formData.append(`description`, this.form.description);
      }

      if (this.form.file && this.form.file.raw) {
        formData.append(`file`, this.form.file.raw);
      }

      return formData;
    },
    onSubmit() {
      this.$refs.form.validate(isValid => {
        if (!isValid) {
          return;
        }

        if (this.title === '编辑品牌') {
          apis.updateCategory(this.getFormData()).then(resp => {
            if (resp.status === `success`) {
              this.visible = false;

              apis.queryAllCategoreis().then(resp => {
                this.tableData = resp.data;
              });
            } else {
              this.$message.error(resp.error);
            }
          });
        } else {
          apis.addCategory(this.getFormData()).then(resp => {
            if (resp.status === `success`) {
              this.visible = false;

              apis.queryAllCategoreis().then(resp => {
                this.tableData = resp.data;
              });
            } else {
              this.$message.error(resp.error);
            }
          });
        }
      });
    }
  },
  computed: {
    image() {
      if (this.form.file && this.form.file.raw) {
        return URL.createObjectURL(this.form.file.raw);
      }

      return this.form.file;
    }
  },
  data() {
    return {
      options: [
        {
          value: '在线',
          label: '在线'
        },
        {
          value: '下线',
          label: '下线'
        }
      ],
      title: '',
      tableData: [],
      visible: false,
      form: {
        name: ``,
        status: ``,
        file: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: `品牌名称必须填写`,
            trigger: `blur`
          },
          {
            validator(rule, value, callback) {
              if (value.length < 2) {
                callback(`名称太短，最少2个字符`);
                return;
              } else if (/\s/.test(value)) {
                callback(`不能有特殊字符，如空格、：、+等`);
                return;
              }

              return callback();
            },
            trigger: `blur`
          }
        ],
        status: [
          {
            required: true,
            message: `必须选择品牌状态`,
            trigger: `change`
          }
        ],
        file: [
          {
            required: true,
            message: `不能缺少品牌LOGO`,
            trigger: `change`
          }
        ]
      }
    };
  }
};
</script>

<style lang="less">
.categories-manage {
  .form {
    border-bottom: 1px solid #e6e6e6;
    line-height: 100px;
    text-align: right;
    padding-right: 20px;

    .el-select {
      display: block;
    }
  }
  .el-upload {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 300px;
    height: 200px;
    border: 1px dashed lightgray;

    .el-image {
      display: block;
      height: 100%;
    }
    .el-icon-plus {
      font-size: 30px;
    }
  }
}
</style>

