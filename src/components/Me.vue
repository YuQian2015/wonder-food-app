<template>
  <div>
    <van-nav-bar title="我的" />
    <div style="text-align: center; margin: 20px 0">
      <van-image
        @click="goUserPage"
        width="80"
        height="80"
        round
        :src="userInfo && userInfo.avatar_url"
      />
      <div v-if="userInfo">{{ userInfo.name }}</div>
    </div>
    <van-cell-group>
      <van-cell title="揾食" value="揾食——发现你身边的美食" />
      <van-cell title="版本" value="v1.0.0" />
      <van-cell title="说明" is-link />
    </van-cell-group>
    <van-cell-group v-if="!userInfo" title="登录">
      <van-cell title="立即登录" is-link to="login" />
    </van-cell-group>
    <van-button
      style="margin-top: 80px"
      v-if="userInfo"
      block
      type="danger"
      @click="logout"
      >退出登录</van-button
    >
    <Tab />
  </div>
</template>
<script>
import { apiService } from "../services";
import Tab from "./Tab.vue";
import localforage from "localforage";
export default {
  data() {
    return {
      userInfo: null,
    };
  },
  methods: {
    goUserPage() {
      if (this.userInfo) {
        this.$router.push({
          name: "user",
          params: { id: this.userInfo.id },
        });
      }
    },
    async logout() {
      await localforage.removeItem("token");
      this.$router.replace("index");
    },
  },
  components: {
    Tab,
  },
  async mounted() {
    const res = await apiService.getUserInfo();
    if (res && res.success) {
      this.userInfo = res.data;
    }
  },
};
</script>