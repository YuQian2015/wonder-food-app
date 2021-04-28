<template>
  <div id="app">
    <router-view />
    <Tab />
  </div>
</template>

<script>
import Tab from "./components/Tab.vue";

export default {
  name: "App",
  components: {
    Tab,
  },
  mounted() {
    window.addEventListener("token_invalid", () => {
      this.$router.replace("/login");
    });
  },
};
</script>
