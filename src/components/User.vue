<template>
  <div>
    <van-nav-bar
      title="资料"
      fixed
      placeholder
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      description="选择性别"
    />
    <van-cell-group v-if="userInfo" title="个人信息">
      <van-cell title="头像" center is-link :value="userInfo.avatar_url">
        <template #default>
          <van-image
            width="48px"
            height="48px"
            :src="userInfo.avatar_url"
            v-if="userInfo.avatar_url"
          />
          <van-uploader
            max-count="1"
            :deletable="false"
            v-model="fileList"
            :after-read="afterRead"
            preview-size="48"
            v-if="!userInfo.avatar_url"
          />
        </template>
      </van-cell>
      <van-cell title="名字" :value="userInfo.name" />
      <van-cell
        title="性别"
        :value="userInfo.gender"
        is-link
        @click="show = true"
      />
      <van-cell title="邮箱" :value="userInfo.email" />
      <!-- <van-cell title="年龄" :value="userInfo.age" />
      <van-cell title="角色" :value="userInfo.role" /> -->
    </van-cell-group>
  </div>
</template>
<script>
import { apiService } from "../services";
export default {
  data() {
    return {
      userInfo: null,
      fileList: [],
      show: false,
      actions: [{ name: "男" }, { name: "女" }],
    };
  },
  methods: {
    afterRead(file) {
      this.doUpload(file);
    },
    onClickLeft() {
      this.$router.back();
    },
    async onSelect(e) {
      await apiService.updateUserInfo({
        gender: e.name,
      });
      this.userInfo.gender = e.name;
      this.show = false;
    },
    async doUpload(file) {
      if (file) {
        file.status = "uploading";
        file.message = "上传中...";
        const form = new FormData();
        form.append(
          "file",
          file.file,
          new Date().getTime() + "." + file.file.type.split("/")[1]
        );
        const res = await apiService.uploadImage(form);
        if (res && res.success) {
          await apiService.updateUserInfo({
            avatar_url: res.data.url,
          });
          console.log(res.data);
          file.status = "done ";
          file.message = "上传完成";
        } else {
          file.status = "failed";
          file.message = "上传失败";
        }
      } else {
        return;
      }
    },
  },
  async mounted() {
    const res = await apiService.getUserInfo();
    if (res && res.success) {
      this.userInfo = res.data;
    }
  },
};
</script>