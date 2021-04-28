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
    <van-uploader />
  </div>
</template>
<script>
import { apiService } from "../services";
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    async submit() {
      const res = await apiService.createPost({
        content: this.content,
      });
      if (res && res.success) {
        this.$toast('发布成功！');
        this.$router.back();
      }
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>