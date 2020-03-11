<template>
  <div class="banners">
    <banner :banners="banners" ref="banner"></banner>
    <el-dialog :title="title" :visible.sync="visible" @closed="onClosed">
      <el-form :model="form" :rules="rules" label-width="100px" ref="form">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="轮播标题" prop="title">
              <el-input
                placeholder="请输入轮播标题"
                v-model="form.title"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="轮播状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio label="on">显示</el-radio>
                <el-radio label="off">不显示</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="轮播顺序" prop="name">
              <el-input
                placeholder="请输入轮播顺序(从小到大排)"
                type="number"
                v-model="form.index"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="轮播背景" prop="bgcolor">
              <el-color-picker
                v-model="form.bgcolor"
                show-alpha
                color-format="rgb"
              ></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="按钮文字" prop="btntext">
              <el-input
                placeholder="请输入按钮文字"
                v-model="form.btntext"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="按钮链接" prop="link">
              <el-input
                placeholder="请输入按钮链接"
                v-model="form.link"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="banner图片" prop="file" ref="file">
          <el-upload
            :auto-upload="false"
            :on-change="onFileChange"
            :show-file-list="false"
            action
          >
            <el-image :src="image" fit="contain" v-if="image"></el-image>
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文字内容" prop="text">
          <el-input
            :rows="4"
            placeholder="请输入文字内容"
            type="textarea"
            v-model="form.text"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button @click="onSubimt()" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <div class="flex-center">
      <el-card
        v-for="(banner, index) in banners"
        :key="banner.id"
        @click.native="onTapCarouselItem(index)"
      >
        <div slot="header">
          <el-button type="text" @click="onEditBanner(banner)">编辑</el-button>
          <el-popconfirm
            title="删除后无法恢复，确认删除吗?"
            @onConfirm="onDelete(banner)"
          >
            <el-button class="danger" type="text" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </div>
        <div
          class="img-container"
          :style="`background-image: url(${banner.image})`"
        ></div>
      </el-card>
    </div>
    <el-button type="success" @click="onAddBanner">新增轮播</el-button>
  </div>
</template>
<script>
import apis from '@/store/network/manage';
import Banner from '@/views/home/components/banner';

class Form {
  constructor() {
    this.title = '';
    this.text = '';
    this.file = '';
    this.btntext = '';
    this.link = '';
    this.status = 'on';
  }
}
export default {
  components: {
    banner: Banner
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
      title: ``,
      banners: [],
      visible: false,
      form: new Form(),
      rules: {
        title: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        text: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  mounted() {
    this.getBanners();
  },
  methods: {
    getBanners() {
      return apis.getBanners().then((resp) => {
        this.banners = resp.data;
      });
    },
    onTapCarouselItem(index) {
      this.$refs.banner.$refs.carousel.setActiveItem(index);
    },
    async onDelete(data) {
      await apis.deleteBanner({ id: data.id });

      this.getBanners();

      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success'
      });
    },
    onClosed() {
      this.form = {};
      this.$refs.form.resetFields();
    },
    onEditBanner(data) {
      this.visible = true;
      this.title = '编辑BANNER';
      this.form = { ...data };
      this.form.file = data.image;
    },

    onAddBanner() {
      this.title = '添加BANNER';
      this.visible = true;
      this.form = new Form();
    },
    async onSubimt() {
      if (this.title === '添加BANNER') {
        await apis.addBanner(this.getFormData());
      } else if (this.title === '编辑BANNER') {
        await apis.updateBanner(this.getFormData());
      }

      this.visible = false;
      this.$notify({
        title: '成功',
        message: '操作成功',
        type: 'success'
      });
      this.getBanners();
    },
    onFileChange(file) {
      this.form.file = file;
      this.$refs.file.clearValidate();
    },
    getFormData() {
      var formData = new FormData();

      if (this.form.id) {
        formData.append(`id`, this.form.id);
      }

      if (this.form.index) {
        formData.append(`index`, this.form.index);
      }

      if (this.form.bgcolor) {
        formData.append(`bgcolor`, this.form.bgcolor);
      }

      if (this.form.title) {
        formData.append(`title`, this.form.title);
      }

      if (this.form.status) {
        formData.append(`status`, this.form.status);
      }

      if (this.form.text) {
        formData.append(`text`, this.form.text);
      }

      if (this.form.link) {
        formData.append(`link`, this.form.link);
      }

      if (this.form.btntext) {
        formData.append(`btntext`, this.form.btntext);
      }

      if (this.form.file && this.form.file.raw) {
        formData.append(`file`, this.form.file.raw);
      }

      return formData;
    }
  }
};
</script>
<style lang="less">
.banners {
  padding: 20px;
  .banner-container {
    margin-bottom: 25px;
    .common-container {
      width: 100%;
      padding-left: 25px;
    }
  }
  .flex-center {
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-bottom: 25px;
    .el-card {
      flex: 0 0 30%;
      margin-right: 20px;
      cursor: pointer;
      img {
        max-width: 100%;
      }
      .el-button {
        padding: 3px 0;
      }
    }
    .img-container {
      position: relative;
      padding-top: 40%;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  .el-upload {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
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
