<template>
  <div class="banners">
    <banner
      :banners="banners"
      :height="'500px'"
    ></banner>
    <div class="select">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="删除图片">
              <el-select
                @change="onBannerChange"
                placeholder="请选择"
                v-model="value"
              >
                <el-option
                  :key="index"
                  :label="'第' + (index + 1) + '张'"
                  :value="index"
                  v-for="(item, index) in banners"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="编辑图片">
              <el-select
                @change="onBannerChange"
                placeholder="请选择"
                v-model="value"
              >
                <el-option
                  :key="index"
                  :label="'第' + (index + 1) + '张'"
                  :value="index"
                  v-for="(item, index) in banners"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-button
              @click="onAddBanner"
              type="primary"
            >添加BANNER</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      @closed="onClosed"
    >
      <el-form
        :model="form"
        :rules="rules"
        label-width="100px"
        ref="form"
      >
        <el-form-item
          label="图片标题"
          prop="title"
        >
          <el-input
            placeholder="请输入图片标题"
            v-model="form.title"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="图片内容"
          prop="text"
        >
          <el-input
            :rows="4"
            placeholder="请输入图片内容"
            type="textarea"
            v-model="form.text"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="图片状态"
          prop="status"
        >
          <el-radio-group
            v-model="form.status"
          >
            <el-radio label="on">显示</el-radio>
            <el-radio label="off">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="按钮文字"
          prop="btntext"
        >
          <el-input
            placeholder="请输入按钮文字"
            v-model="form.btntext"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="按钮链接"
          prop="link"
        >
          <el-input
            placeholder="请输入按钮链接"
            v-model="form.link"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="banner图片"
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
      <span
        class="dialog-footer"
        slot="footer"
      >
        <el-button @click="visible = false">取 消</el-button>
        <el-button
          @click="onSubimt()"
          type="primary"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import apis from '@/store/network/manage';
import Banner from '@/views/home/components/banner';
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
    },
    height() {}
  },
  data() {
    return {
      title: '',
      value: '',
      banners: [],
      visible: false,
      form: {
        title: '',
        text: '',
        file: '',
        btntext: '',
        link: '',
        status: 'on'
      },
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
    apis.getBanners().then(resp => {
      this.banners = resp.data;
    });
  },
  methods: {
    onClosed() {
      this.form = {};
      this.$refs.form.resetFields();
    },
    onBannerChange(value) {
      this.visible = true;
      this.title = '编辑banner';
      for (var i = 0; i < this.banners.length; i++) {
        if (i === value) {
          this.form = {
            id: this.banners[i].id,
            title: this.banners[i].title,
            text: this.banners[i].text,
            file: this.banners[i].image,
            btntext: this.banners[i].btntext,
            link: this.banners[i].link,
            status: this.banners[i].status
          };
        }
      }
    },

    onAddBanner() {
      this.title = '添加banner';
      this.visible = true;
      this.form = {
        file: '',
        status: 'on'
      };
    },
    async onSubimt() {
      if (this.title === '添加banner') {
        await apis.addBanner(this.getFormData());
      } else if (this.title === '编辑banner') {
        await apis.updateBanner(this.getFormData());
      }

      var resp = await apis.getBanners();

      this.banners = resp.data;
      this.visible = false;
      this.$message.success(`操作成功`);
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
  .select {
    margin-top: 30px;
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
