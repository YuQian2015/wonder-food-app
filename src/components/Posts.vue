<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-if="posts && posts.length" finished-text="没有更多了">
        <PostItem v-for="item in posts" :key="item.id" v-bind:post-data="item" />
      </van-list>
      <van-empty v-if="posts && posts.length === 0" description="暂无内容，快去发布吧~" />
    </van-pull-refresh>
    <van-share-sheet
      v-model="showShare"
      title="发布"
      description="发布帖子寻找美食，或者向他人推荐"
      :options="options"
      @select="onSelect"
    />
    <div class="new-post">
      <van-button @click="showShare = true" round type="primary"><van-icon name="plus"></van-icon></van-button>
    </div>
    <Tab />
  </div>
</template>
<script>
import Tab from "./Tab.vue";
import PostItem from "./PostItem.vue";
import { apiService } from "../services";
export default {
  components: {
    Tab, PostItem,
  },
  data() {
    return {
      posts: [],
      refreshing: false,
      showShare: false,
      options: [
        { name: '揾食', icon: 'wechat-moments', description: '寻找美食' },
        { name: '我要推荐', icon: 'link', description: '向别人推荐美食' },
      ],
    };
  },
  methods: {
    goNewPost(type) {
      console.log(type);
      this.$router.push({
        name: 'new',
        params: { type }
      });
    },

    async getData() {
      this.refreshing = true;
      const res = await apiService.getPosts();
      this.refreshing = false;
      if (res && res.success) {
        this.posts = res.data;
      }
    },

    onSelect(option) {
      if(option.icon === 'wechat-moments') {
        this.goNewPost(0);
      }
      if(option.icon === 'link') {
        this.goNewPost(1);
      }
      this.showShare = false;
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
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>>