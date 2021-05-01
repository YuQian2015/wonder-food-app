<template>
  <div>
    <van-nav-bar title="我的" />
    <div style="text-align: center; margin: 20px 0">
      <van-image @click="goUserPage" width="100" height="100" round style="" />
      <div v-if="userInfo">{{ userInfo.name }}</div>
    </div>
    <van-cell-group>
      <van-cell title="揾食" value="揾食——发现你身边的美食" />
      <van-cell title="版本" value="v1.0.0" />
      <van-cell title="说明" is-link />
    </van-cell-group>
    <van-cell-group title="登录">
      <van-cell title="立即登录" is-link to="login" />
    </van-cell-group>
    <Tab />
  </div>
</template>
<script>
import { apiService } from "../services";
import Tab from "./Tab.vue";
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