<template>
  <div>
    <div class="comment-card" v-if="data.user">
      <div class="user-info">
        <van-image
          class="avatar"
          round
          width="40"
          height="40"
          :src="data.user.avatar_url || 'https://img01.yzcdn.cn/vant/cat.jpeg'"
        />
        <div class="base-info">
          <div class="user-name">{{ data.user.name }}</div>
          <div class="time">{{ formNow(data.created_at) }}</div>
        </div>
      </div>
    </div>
    <div class="content">{{ data.content }}</div>
    <div style="background: #d7e8d4">
      <StoreItem v-if="data.store" :data="data.store" />
    </div>
    <div style="background: #f3eda4">
      <FoodItem v-if="data.product" :data="data.product" />
    </div>
  </div>
</template>
<script>
import { formNow } from "../utils";
import StoreItem from "./StoreItem";
import FoodItem from "./FoodItem";
export default {
  components: {
    StoreItem,
    FoodItem,
  },
  props: {
    data: Object,
  },
  methods: {
    formNow,
  },
};
</script>
<style scoped>
.comment-card {
  padding: 10px;
  border-top: solid 1px #eeeeee;
}
.avatar {
  margin-right: 10px;
}
.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
}
.base-info {
  flex: 1;
}
.user-name {
  line-height: 1.8;
  font-weight: bold;
}
.time {
  font-size: 12px;
  color: #686868;
}
.content {
  word-break: break-all;
  padding: 10px;
  padding-bottom: 10px;
}
</style>