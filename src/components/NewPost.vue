<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="发布"
      left-arrow
      @click-left="onClickLeft"
      @click-right="submit"
    />
    <van-field
      v-model="content"
      rows="8"
      autosize
      type="textarea"
      placeholder="说点什么"
    />
    <van-uploader
      v-model="fileList"
      :before-read="beforeRead"
      :after-read="afterRead"
      max-count="9"
    >
    </van-uploader>
  </div>
</template>
<script>
import Compressor from "compressorjs";
import { apiService } from "../services";
export default {
  data() {
    return {
      content: "",
      fileList: [],
    };
  },
  methods: {
    async submit() {
      if (this.fileList.length) {
        console.log(this.fileList[0]);
        const form = new FormData();
        form.append(
          "file",
          this.fileList[0].file,
          new Date().getTime() + "." + this.fileList[0].file.type.split("/")[1]
        );
        const res = await apiService.uploadImage(form);
        console.log(res);
        return;
      }
      const res = await apiService.createPost({
        content: this.content,
      });
      if (res && res.success) {
        this.$toast("发布成功！");
        this.$router.back();
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
};
</script>