<template>
  <div class="store-item">
    <van-image width="40px" height="40px" fit="cover" :src="data.images" />
    <div class="store-info">
      <div class="name">{{ data.name }}</div>
      <div class="description">{{ data.description }}</div>
    </div>
    <van-icon size="24" v-if="showRemove" color="red" name="delete-o" />
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
    showRemove: Boolean,
  },
};
</script>

<style scoped>
.store-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-bottom: solid 1px #eeeeee;
}
.store-info {
  flex: 1;
  margin-left: 10px;
}
.name {
  font-weight: bold;
}
.description {
  font-size: 12px;
  color: #686868;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>