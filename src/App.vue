<template>
  <div :class="className" id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      className: "mobile",
    };
  },
  mounted() {
    window.addEventListener("token_invalid", () => {
      this.$router.replace("/login");
    });
    if (/mobi/i.test(window.navigator.userAgent.toLowerCase())) {
      this.className = "mobile";
    } else {
      this.className = "pc";
    }
  },
};
</script>
<style>
.pc {
  width: 500px;
  height: 100%;
  margin: 0 auto;
  border: solid 1px gray;
}
body,
html {
  height: 100%;
}
</style>
