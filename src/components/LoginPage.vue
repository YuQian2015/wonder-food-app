<template>
  <div>
    <van-nav-bar title="登录" />
    <div style="text-align: center">
      <van-image
        width="100"
        height="100"
        round
        style="margin: 20px"
      />
    </div>
    <van-form>
      <van-field
        v-model="data.email"
        name="Email"
        placeholder="Email"
      />
      <van-field
        v-if="showCreateForm"
        v-model="data.name"
        type="text"
        name="Name"
        placeholder="用户名"
      />
      <van-field
        v-model="data.password"
        type="password"
        name="Password"
        placeholder="密码"
      />
      <van-field
        v-model="data.repeatPassword"
        v-if="showCreateForm"
        type="password"
        name="RepeatPassword"
        placeholder="重复密码"
      />
      <div style="margin: 16px">
        <van-button round block v-if="!showCreateForm" type="primary" @click="onSubmit">登录</van-button>
        <van-button round block v-if="showCreateForm" type="primary" @click="onSubmit">立即注册</van-button>
        <van-divider />
        <van-button round block v-if="!showCreateForm" @click="showCreate">创建用户</van-button>
        <van-button round block v-if="showCreateForm" @click="returnLogin">返回登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import localforage from "localforage";
import { apiService } from "../services";
export default {
  data() {
    return {
      showCreateForm: false,
      data: {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      const { name, email, password, repeatPassword } = this.data;
      if (!this.showCreateForm && (!email || !password)) {
        this.$toast('请填入必填信息！');
        return;
      }
      if (
        this.showCreateForm &&
        (!name || !email || !password || !repeatPassword)
      ) {
        this.$toast('请填入必填信息！');
        return;
      }
      let res = this.showCreateForm
        ? await apiService.register(this.data)
        : await apiService.login(this.data);
      if (res && res.success && res.data) {
        console.log(res.data.token);
        await localforage.setItem("token", res.data.token);
        this.$router.replace("/users");
      } else {
        this.$toast(res.message);
      }
    },
    showCreate() {
      this.showCreateForm = true;
    },
    returnLogin() {
      this.showCreateForm = false;
    },
  },
};
</script>
