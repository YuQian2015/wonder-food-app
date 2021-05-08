<template>
  <div>
    <van-nav-bar
      title="选择推荐内容"
      right-text="确定"
      @click-right="onClickRight"
    />
    <van-tabs @change="handleTabChange" v-model="active">
      <van-tab name="store" title="商家">
        <van-list v-if="storeList && storeList.length">
          <van-cell v-for="store in storeList" :key="store.id">
            <div class="store-list">
              <van-image
                width="40px"
                height="40px"
                fit="cover"
                :src="store.images"
              />
              <div class="store-info">
                <div class="name">{{ store.name }}</div>
                <div class="description">{{ store.description }}</div>
              </div>
              <div @click="selecteStore(store)">
                <van-icon
                  v-if="selectedStore.id !== store.id"
                  size="24"
                  name="circle"
                  color="#686868"
                />
                <van-icon
                  size="24"
                  v-if="selectedStore.id === store.id"
                  color="#1989fa"
                  name="checked"
                />
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab name="foods" title="美食">
        <van-list v-if="foodList && foodList.length">
          <van-cell v-for="food in foodList" :key="food.id">
            <div class="store-list">
              <van-image
                width="40px"
                height="40px"
                fit="cover"
                :src="food.images"
              />
              <div class="store-info">
                <div class="name">{{ food.name }}</div>
                <div class="description">{{ food.description }}</div>
              </div>
              <div @click="selecteFood(food)">
                <van-icon
                  v-if="selectedFood.id !== food.id"
                  size="24"
                  name="circle"
                  color="#686868"
                />
                <van-icon
                  size="24"
                  v-if="selectedFood.id === food.id"
                  color="#1989fa"
                  name="checked"
                />
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { apiService } from "../services";
export default {
  data() {
    return {
      storeList: [],
      foodList: [],
      active: "store",
      selectedStore: 0,
      selectedFood: 0,
    };
  },
  props: {
    onConfirmed: {
      type: Function,
    },
  },
  methods: {
    onClickRight() {
      if (!this.selectedStore && !this.selectedFood) {
        this.$toast("选择一条数据！");
        return;
      }
      this.onConfirmed &&
        this.onConfirmed(
          this.active === "store" ? this.selectedStore : this.selectedFood,
          this.active
        ); // 父组件方法
    },
    selecteStore(store) {
      this.selectedStore = store;
    },
    selecteFood(food) {
      this.selectedFood = food;
    },
    handleTabChange(type, title) {
      console.log(type, title);
      if (type === "foods") {
        this.getFoods();
      } else {
        this.getStores();
      }
    },
    async getFoods() {
      const res = await apiService.getFoods();
      if (res && res.success) {
        this.foodList = res.data;
      }
    },
    async getStores() {
      const res = await apiService.getStores();
      if (res && res.success) {
        this.storeList = res.data;
      }
    },
  },
  async mounted() {
    this.getStores();
  },
};
</script>
<style scoped>
.store-list {
  display: flex;
  align-items: center;
  justify-content: center;
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
}
</style>