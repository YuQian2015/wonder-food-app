<template>
  <div>
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :title="postData.content"
    />
    <PostItem :post-data="postData" :hide-actions="true" />
    <div class="bottom-input">
      <van-field
        style="max-height: 200px"
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        size="small"
        show-word-limit
        placeholder="请输入你的回复"
      />
      <van-button
        style="margin: 0 2px"
        round
        size="small"
        icon="photo-o"
      ></van-button>
      <van-button
        style="margin: 0 2px"
        round
        size="small"
        icon="plus"
      ></van-button>
      <van-button
        round
        type="primary"
        style="margin: 0 2px; white-space: nowrap"
        size="small"
        >发布</van-button
      >
    </div>
  </div>
</template>
<script>
import { apiService } from "../services";
import PostItem from "./PostItem.vue";
export default {
  data() {
    return {
      postData: {},
      message: "",
    };
  },
  components: {
    PostItem,
  },
  methods: {
    async getPost(id) {
      const res = await apiService.getPost(id);
      if (res && res.success) {
        this.postData = res.data;
      }
    },
    onClickLeft() {
      this.$router.back();
    },
  },
  mounted() {
    this.getPost(this.$router.currentRoute.params.id);
  },
};
</script>
<style>
.bottom-input {
  position: fixed;
  width: 100%;
  max-height: 200px;
  bottom: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>