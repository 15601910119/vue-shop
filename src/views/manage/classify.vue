<template>
  <div class="classify">
    <div class="addClass">
      <el-button @click="addClass">添加分类</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="分类名称"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="分类信息"
        prop="info"
      ></el-table-column>

      <el-table-column
        label="创建时间"
        prop="createTime"
      >
        <template slot-scope="data">{{toTime(data.row.createTime)}}</template>
      </el-table-column>

      <el-table-column
        label="更新时间"
        prop="updateTime"
      >
        <template slot-scope="data">{{toTime(data.row.updateTime)}}</template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-popconfirm
            :title="'确认删除' + scope.row.name"
            @onConfirm="handleClick(scope.row)"
            cancelButtonText="取消"
            confirmButtonText="确定"
            icon="el-icon-info"
            iconColor="red"
          >
            <el-button
              slot="reference"
              type="text"
            >删除</el-button>
          </el-popconfirm>

          <el-button
            @click="onCompile(scope.row)"
            style="margin-left: 10px"
            type="text"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      @closed="onClosed"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        :rules="rules"
        label-width="80px"
        ref="form"
      >
        <el-form-item
          label="分类名称"
          prop="name"
        >
          <el-input
            placeholder="输入分类名称"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="分类信息"
          prop="info"
        >
          <el-input
            placeholder="输入分类信息"
            v-model="form.info"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        class="dialog-footer"
        slot="footer"
      >
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          @click="onSave"
          type="primary"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import apis from '@/store/network/manage';
export default {
  mounted() {
    apis.queryClassify().then(resp => {
      this.tableData = resp.data;
    });
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
    onClosed() {
      this.$refs.form.resetFields();
    },
    handleClick(row) {
      apis.deleteClassify(row).then(resp => {
        apis.queryClassify().then(resp => {
          this.tableData = resp.data;
        });
      });
    },
    onCompile(data) {
      this.title = '编辑分类';
      this.dialogVisible = true;
      this.form = { ...data };
    },
    addClass() {
      this.title = '添加分类';
      this.dialogVisible = true;
      this.form = {};
    },
    onSave() {
      var data = { ...this.form };
      if (this.title === '添加分类') {
        apis.addClassify(data).then(resp => {
          if (resp.status === 'success') {
            this.dialogVisible = false;

            apis.queryClassify().then(resp => {
              this.tableData = resp.data;
            });
          }
        });
      } else {
        apis.updateClassify(data).then(resp => {
          if (resp.status === 'success') {
            this.dialogVisible = false;

            apis.queryClassify().then(resp => {
              this.tableData = resp.data;
            });
          }
        });
      }
    }
  },

  data() {
    return {
      title: '',
      dialogVisible: false,
      tableData: [],
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: `不能为空`,
            trigger: `blur`
          }
        ],
        type: [
          {
            required: true,
            message: `不能为空`,
            trigger: `blur`
          }
        ]
      }
    };
  }
};
</script>

<style lang="less">
.classify {
  .addClass {
    text-align: right;
    padding: 20px;
    border-bottom: 1px solid #e6e6e6;
  }
}
</style>
