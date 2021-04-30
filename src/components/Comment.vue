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
    <PostItem :post-data="postData" :disable-actions="true" />
    <div v-if="comments && comments.length">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :data="comment"
      />
    </div>
    <van-popup
      v-model="show"
      position="bottom"
      round
      :style="{ height: '90%' }"
    >
      <Stores :on-confirmed="handleConfirmed" />
    </van-popup>
    <van-tabbar z-index="0" placeholder></van-tabbar>
    <div class="bottom-input">
      <div v-if="selectedStores && selectedStores.length">
        <StoreItem
          v-for="store in selectedStores"
          :key="store.id"
          :data="store"
          :show-remove="true"
        />
      </div>
      <div class="input-container">
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
          @click="showPopup"
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
  </div>
</template>
<script>
import { apiService } from "../services";
import PostItem from "./PostItem.vue";
import CommentItem from "./CommentItem.vue";
import Stores from "./Stores.vue";
import StoreItem from "./StoreItem";

export default {
  data() {
    return {
      show: false,
      postData: {},
      comments: [],
      message: "",
      selectedStores: [],
    };
  },
  components: {
    PostItem,
    CommentItem,
    Stores,
    StoreItem,
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
    showPopup() {
      this.show = true;
    },
    handleConfirmed(store) {
      this.selectedStores.length = 0;
      this.selectedStores.push(store);
      this.show = false;
    },
    async submit() {
      if (!this.message) {
        this.$toast("请输入内容！");
        return;
      }
      let data = {
        post_id: this.$router.currentRoute.params.id,
        content: this.message,
      };
      if (this.selectedStores && this.selectedStores.length) {
        data.store_id = this.selectedStores[0].id;
      }
      const res = await apiService.createComment(data);
      if (res && res.success) {
        this.message = "";
        this.getPost(this.$router.currentRoute.params.id);
        this.getComments(this.$router.currentRoute.params.id);
      }
    },
    async getComments(id) {
      const res = await apiService.getComment(id);
      if (res && res.success) {
        this.comments = res.data;
      }
    },
  },
  mounted() {
    this.getPost(this.$router.currentRoute.params.id);
    this.getComments(this.$router.currentRoute.params.id);
  },
};
</script>
<style>
.bottom-input {
  position: fixed;
  width: 100%;
  max-height: 300px;
  bottom: 0;
  background: white;
  border-top: solid 1px #ededed;
}
.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>