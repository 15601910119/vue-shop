<template>
  <div class="commodities-manage">
    <el-form inline>
      <el-form-item label="商品种类">
        <el-select
          @change="onClassChange"
          placeholder="请选择"
          v-model="classify"
        >
          <el-option
            :key="item.id"
            :label="item.name"
            :value="item.id"
            v-for="item in classes"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="品牌种类">
        <el-select
          @change="onBrandChange"
          placeholder="请选择"
          v-model="brandId"
        >
          <el-option
            :key="item.id"
            :label="item.name"
            :value="item.id"
            v-for="item in brands"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="热门种类">
        <el-radio-group
          @change="onHotCommodity"
          v-model="radio"
        >
          <el-radio label="true">热销</el-radio>
          <el-radio label="false">非热销</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-input
          @keyup.enter.native="searchName"
          class="input-with-select"
          placeholder="输入商品名字进行搜索"
          v-model="commodityName"
        >
          <el-button
            @click="searchName"
            icon="el-icon-search"
            slot="append"
          ></el-button>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          @click="handleAdd()"
          type="success"
        >添加商品</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column
        fixed="left"
        label="商品名称"
        prop="name"
        width="120"
      ></el-table-column>

      <el-table-column
        label="商品状态"
        prop="status"
        width="80"
      ></el-table-column>

      <el-table-column
        label="商品价格"
        prop="price"
        width="80"
      ></el-table-column>

      <el-table-column
        label="折扣价格"
        prop="discounted"
        width="80px"
      ></el-table-column>

      <el-table-column
        label="库存"
        prop="inventory"
        width="80px"
      ></el-table-column>

      <el-table-column
        label="销量"
        prop="sales"
        width="80px"
      ></el-table-column>

      <el-table-column
        label="商品类型"
        prop="classificationId"
        width="100px"
      >
        <template slot-scope="data">{{toClasses(data.row.classificationId)}}</template>
      </el-table-column>

      <el-table-column
        label="所属品牌"
        prop="categoryId"
        width="100px"
      >
        <template slot-scope="data">{{toCategory(data.row.categoryId)}}</template>
      </el-table-column>

      <el-table-column
        label="商品信息"
        min-width="300px"
        prop="description"
      ></el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="200px"
      >
        <template slot-scope="scope">
          <el-button
            @click="onChangeHot(scope.row)"
            type="text"
          >
            {{
            scope.row.hot ? `取消热销` : `设为热销`
            }}
          </el-button>
          <el-button
            @click="handleEdit(scope.row)"
            type="text"
          >编辑</el-button>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="visible"
      @closed="onClosed"
    >
      <el-form
        :model="form"
        :rules="rules"
        label-width="80px"
        ref="form"
        status-icon
      >
        <el-form-item
          label="商品名称"
          prop="name"
        >
          <el-input
            placeholder="请输入商品名称"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="折扣价格"
              prop="discounted"
            >
              <el-input v-model="form.discounted"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="商品价格"
              prop="price"
            >
              <el-input
                placeholder="请输入商品价格"
                v-model="form.price"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="商品状态"
              prop="status"
            >
              <el-select
                placeholder="请选择"
                v-model="form.status"
              >
                <el-option
                  label="在线"
                  value="在线"
                ></el-option>
                <el-option
                  label="下线"
                  value="下线"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="商品库存"
              prop="inventory"
            >
              <el-input
                placeholder="请输入商品重量"
                v-model="form.inventory"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="商品类型"
              prop="classificationId"
            >
              <el-select
                placeholder="请选择"
                v-model="form.classificationId"
              >
                <el-option
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                  v-for="item in classes"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="所属品牌"
              prop="categoryId"
            >
              <el-select
                placeholder="请选择"
                v-model="form.categoryId"
              >
                <el-option
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                  v-for="item in brands"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="商品描述"
          prop="description"
        >
          <el-input
            placeholder="请输入商品描述"
            type="textarea"
            v-model="form.description"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="商品图片"
          prop="image"
        >
          <el-upload
            :auto-upload="false"
            :file-list="uploadedFiles"
            :on-change="onFileChange"
            action
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img
              :src="dialogImageUrl"
              alt
              width="100%"
            >
          </el-dialog>
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

    <div class="pagination">
      <el-pagination
        :page-size="pageSize"
        :total="total"
        @current-change="onCurrentPageChange($event)"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import apis from '@/store/network/manage';

export default {
  mounted() {
    this.getCommodities();
    apis.queryAllCategoreis().then(resp => {
      this.brands = resp.data;
    });
    apis.queryAllClasses().then(resp => {
      this.classes = resp.data || [];
    });
  },

  methods: {
    searchName() {
      this.getCommodities();
    },
    onBrandChange() {
      this.getCommodities();
    },
    onClassChange() {
      this.getCommodities();
    },
    onHotCommodity() {
      this.getCommodities();
    },
    onCurrentPageChange(curr) {
      this.pageStart = curr - 1;
      this.getCommodities();
    },
    getCommodities() {
      apis
        .queryCommodities({
          pageStart: this.pageStart,
          pageSize: this.pageSize,
          name: this.commodityName,
          classificationId: this.classify,
          categoryId: this.brandId,
          hot: this.radio
        })
        .then(resp => {
          this.tableData = resp.data;
          this.total = resp.total;
        });
    },
    onFileChange(file, list) {
      this.form.files = list;
    },
    onChangeHot(data) {
      if (data.hot === true) {
        apis.cancelHotCommodity({ id: data.id }).then(resp => {
          apis.queryCommodities().then(resp => {
            this.tableData = resp.data;
          });
          this.$message.success('操作成功');
        });
      } else {
        apis.addHotCommoditiy({ id: data.id }).then(resp => {
          apis.queryCommodities().then(resp => {
            this.tableData = resp.data;
          });
          this.$message.success('操作成功');
        });
      }
    },

    onClosed() {
      this.form = {};
      this.uploadedFiles = [];
      this.$refs.form.resetFields();
    },
    toCategory(id) {
      if (this.brands.length === 0) {
        return '--';
      } else {
        var category = this.brands.find(item => {
          return item.id === id;
        });
        if (!category) {
          return '--';
        } else {
          return category.name;
        }
      }
    },
    toClasses(type) {
      if (this.classes.length === 0) {
        return '--';
      } else {
        var category = this.classes.find(item => {
          return item.id === type;
        });
        if (!category) {
          return '--';
        } else {
          return category.name;
        }
      }
    },
    handleEdit(data) {
      this.title = `编辑商品`;
      this.visible = true;
      this.form = { ...data };
      apis.queryCommodityPictures({ id: data.id }).then(resp => {
        this.uploadedFiles = resp.data.map(item => {
          return {
            name: item,
            url: item
          };
        });
      });
    },

    toTime(ts) {
      if (!ts) {
        return '--';
      }

      var time = new Date(ts).toTimeString().slice(0, 8);
      var date = new Date(ts).toISOString().slice(0, 10);
      return date + ' ' + time;
    },
    handleDelete(data) {
      apis.deleteCommodity({ id: data.id }).then(resp => {
        if (resp.status === 'success') {
          this.$message.success(data.name + '删除成功');
          apis.queryCommodities().then(resp => {
            this.tableData = resp.data;
          });
        } else {
          this.$message.error(data.name + '删除失败');
        }
      });
    },
    handleAdd() {
      this.title = `添加商品`;
      this.visible = true;
      this.form = {};
    },
    onSubmit() {
      this.$refs.form.validate(isValid => {
        if (!isValid) {
          return;
        }

        var files = this.form.files || this.uploadedFiles;
        var data = { ...this.form };
        var formData = new FormData();

        delete data.files;

        files.forEach((file, index) => {
          if (!file.raw) {
            formData.append(`files`, new Blob([file.url]));
          } else {
            formData.append(`files`, file.raw);
          }
        });

        for (var key in data) {
          formData.append(key, data[key]);
        }

        if (this.title === '编辑商品') {
          apis.updateCommodity(formData).then(resp => {
            this.$message.success(`操作成功`);
            this.visible = false;
            apis.queryCommodities().then(resp => {
              this.tableData = resp.data;
            });
          });
        } else {
          apis.addCommodity(formData).then(resp => {
            if (resp.status === `success`) {
              this.visible = false;

              apis.queryCommodities().then(resp => {
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

  data() {
    return {
      radio: '',
      brandId: '',
      commodityName: '',
      total: 0,
      pageStart: 0,
      pageSize: 10,
      uploadedFiles: [],
      dialogImageUrl: '',
      dialogVisible: false,
      classify: '',
      brands: [],
      classes: [],
      title: '',
      tableData: [],
      visible: false,
      form: {
        status: '',
        name: '',
        description: '',
        price: '',
        inventory: '',
        classificationId: ''
      },
      rules: {
        name: [
          {
            required: false,
            message: `品牌名称必须填写`,
            trigger: `blur`
          }
        ],
        price: [
          {
            required: false,
            message: `不能为空`,
            trigger: `blur`
          }
        ],
        weight: [
          {
            required: false,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        image: [
          {
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        typeId: [
          {
            required: false,
            message: '不能为空',
            trigger: 'change'
          }
        ],
        categoryId: [
          {
            required: false,
            message: '不能为空',
            trigger: 'change'
          }
        ],
        info: [
          {
            required: false,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      }
    };
  }
};
</script>

<style lang="less">
.commodities-manage {
  .el-form {
    border-bottom: 1px solid #e6e6e6;
    padding-top: 20px;
    padding-left: 10px;
  }
  .el-dialog__wrapper {
    .el-select {
      width: 100%;
    }
  }
  .pagination {
    margin-top: 10px;
    text-align: center;
  }
}
</style>

