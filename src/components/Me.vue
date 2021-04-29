<template>
  <div>
    <van-nav-bar title="我的" />
    <div style="text-align: center">
      <van-image width="100" height="100" round style="margin: 20px" />
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
import Tab from "./Tab.vue";
export default {
  components: {
    Tab,
  },
};
</script>