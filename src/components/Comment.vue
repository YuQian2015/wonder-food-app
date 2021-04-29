<template>
  <div>
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :title="postData.content"
      fixed
      placeholder
    />
    <PostItem :post-data="postData" :hide-actions="true" />
    <div v-if="postData.comments && postData.comments.length">
      <CommentItem
        v-for="comment in postData.comments"
        :key="comment.id"
        :data="comment"
      />
    </div>
    <van-tabbar z-index="0" placeholder></van-tabbar>
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
      <!-- <van-button
        style="margin: 0 2px"
        round
        size="small"
        icon="photo-o"
      ></van-button> -->
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
        @click="submit()"
        >发布</van-button
      >
    </div>
  </div>
</template>
<script>
import { apiService } from "../services";
import PostItem from "./PostItem.vue";
import CommentItem from "./CommentItem.vue";
export default {
  data() {
    return {
      postData: {},
      message: "",
    };
  },
  components: {
    PostItem,
    CommentItem,
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
    async submit() {
      if (!this.message) {
        this.$toast("请输入内容！");
        return;
      }
      const res = await apiService.createComment({
        post_id: this.$router.currentRoute.params.id,
        content: this.message,
      });
      if (res && res.success) {
        this.getPost(this.$router.currentRoute.params.id);
        this.message = "";
      }
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