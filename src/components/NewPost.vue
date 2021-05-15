<template>
  <div>
    <van-nav-bar
      :title="type == 0 ? '发布揾食' : '发布推荐'"
      left-text="返回"
      right-text="发布"
      left-arrow
      @click-left="onClickLeft"
      @click-right="submit"
      fixed
      placeholder
    />
    <van-field
      v-model="content"
      rows="8"
      autosize
      type="textarea"
      placeholder="说点什么"
      maxlength="500"
      show-word-limit
    />
    <van-uploader
      v-model="fileList"
      :before-read="beforeRead"
      :after-read="afterRead"
      max-count="9"
      :preview-options="{ closeable: true }"
    >
    </van-uploader>
  </div>
</template>
<script>
import Compressor from "compressorjs";
import localForage from "localforage";
import { apiService } from "../services";
export default {
  data() {
    return {
      content: "",
      fileList: [],
      type: 0,
      uploadedImages: [],
      uploadIndex: 0,
    };
  },
  methods: {
    async submit() {
      if (!this.content) {
        this.$toast("请输入帖子内容！");
        return;
      }
      if (this.fileList.length) {
        this.uploadedImages.length = 0;
        this.uploadIndex = 0;
        await this.doUpload();
      }

      const res = await apiService.createPost({
        content: this.content,
        type: this.$router.currentRoute.params.type,
        images: this.uploadedImages.join(";"),
      });
      if (res && res.success) {
        this.$toast("发布成功！");
        this.$router.back();
      }
    },

    async doUpload() {
      const file = this.fileList[this.uploadIndex];
      if (file) {
        file.status = "uploading";
        file.message = "上传中...";
        const form = new FormData();
        form.append(
          "file",
          file.file,
          new Date().getTime() + "." + file.file.type.split("/")[1]
        );
        const res = await apiService.uploadImage(form);
        this.uploadIndex++;
        if (res && res.success) {
          this.uploadedImages.push(res.data.url);
          file.status = "done ";
          file.message = "上传完成";
          await this.doUpload();
        } else {
          file.status = "failed";
          file.message = "上传失败";
        }
      } else {
        return;
      }
    },

    beforeRead(file) {
      return new Promise((resolve) => {
        // compressorjs 默认开启 checkOrientation 选项
        // 会将图片修正为正确方向
        new Compressor(file, {
          success: resolve,
          error(err) {
            console.log(err.message);
          },
        });
      });
    },

    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },

    onClickLeft() {
      this.$router.back();
    },
  },
  async mounted() {
    const token = await localForage.getItem("token");
    this.type = this.$router.currentRoute.params.type;
    if (!token) {
      this.$router.replace("login");
    }
  },
};
</script>