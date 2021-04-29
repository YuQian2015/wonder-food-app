<template>
  <div class="post-item">
    <div class="post-card">
      <div class="user-info">
        <div class="avatar" v-if="postData.user">
          <van-image
            width="40"
            height="40"
            round
            v-bind:src="postData.user.avatar_url || 'https://img.yzcdn.cn/vant/cat.jpeg'"
          />
        </div>
        <div class="base-info">
          <div class="user-name" v-if="postData.user">{{postData.user.name}}</div>
          <div class="create-date">{{ formNow(postData.createAt) }} <van-tag v-if="postData.type === 0" round plain type="warning">求推荐</van-tag><van-tag round plain v-if="postData.type === 1" type="primary">推荐</van-tag></div>
        </div>
      </div>
      <div class="content">
        {{ postData.content }}
      </div>
      
      <div class="images" v-if="postData.images" >
        <van-grid center :gutter="10" square :border="false" :column-num="3">
          <van-grid-item @click="showImage(index)" v-for="(image, index) in postData.images.split(';')" :key="index">
            <van-image
              fit="cover"
              width="100%"
              height="100%"
              :src="image"
              style="position: absolute;"
            />
          </van-grid-item>
        </van-grid>
      </div>
      <div class="action">
        <div class="action-item"><van-icon name="eye-o" /><span class="text">{{postData.view_count}} 查看</span></div>
        <div class="action-item"><van-icon name="chat-o" /><span class="text">{{postData.comment_count}} 评论</span></div>
        <div class="action-item"><van-icon name="good-job-o" /><span class="text">{{postData.like_count}} 推荐</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant';
import { formNow } from "../utils";
export default {
  props: {
    postData: Object,
  },
  methods: {
    formNow,
    showImage(index){
      const images = this.postData.images.split(';');
      ImagePreview({
        images, startPosition: index,
      });
    }
  },
  mounted() {},
};
</script>
<style scoped>
.post-card {
  margin-bottom: 20px;
  box-shadow: 0 2px 10px #DFDFDF;
}
.avatar {
  margin-right: 10px;
}
.create-date {
  font-size: 12px;
  color: #686868;
}
.user-name {
  line-height: 1.8;
  font-weight: bold;
}
.user-info {
  display: flex;
  padding: 10px;
  align-content: center;
}
.base-info {
  flex: 1;
}
.content {
  word-break: break-all;
  padding: 0 10px;
}
.action {
  display: flex;
  color: #686868;
  border-top: solid 1px #eeeeee;
}
.action-item {
  flex: 1;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text {
  margin-left: 4px;
  font-size: 12px;
}
</style>