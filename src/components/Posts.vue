<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-if="posts && posts.length" finished-text="没有更多了">
        <van-cell v-for="item in posts" :key="item.id" :title="item.content" />
      </van-list>
    </van-pull-refresh>
    <div class="new-post">
      <van-button @click="goNewPost" round type="primary"><van-icon name="plus"></van-icon></van-button>
    </div>
  </div>
</template>
<script>
import { apiService } from "../services";
export default {
  data() {
    return {
      posts: [],
      refreshing: false,
    };
  },
  methods: {
    goNewPost() {
      this.$router.push("/post");
    },

    async getData() {
      this.refreshing = true;
      const res = await apiService.getPosts();
      this.refreshing = false;
      if (res && res.success) {
        this.posts = res.data;
      }
    },

    onRefresh() {
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style scoped>
.new-post {
  position: fixed;
  bottom: 80px;
  right: 20px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
</style>>