<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    window.addEventListener("token_invalid", () => {
      this.$router.replace("/login");
    });
  },
};
</script>
