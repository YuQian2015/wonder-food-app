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
import md5 from "md5";
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
      // 在提交表单时获取用户输入数据，并且判断必填信息
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
      
      // 判断当前的表单是否是注册，如果是注册则调用注册接口，如果是登录则调用登录接口
      // 对于密码使用了消息摘要算法，避免明文传输
      let res = this.showCreateForm
        ? await apiService.register({
          name: this.data.name, email: this.data.email, password: md5(this.data.password)
        })
        : await apiService.login({
          email: this.data.email, password: md5(this.data.password)
        });
      if (res && res.success && res.data) {
        // 不管是注册还是登录，在操作成功之后都会获取到用户token，将token存放至本地，方便以后使用
        await localforage.setItem("token", res.data.token);
        this.$router.replace("/"); // 跳转到首页
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
