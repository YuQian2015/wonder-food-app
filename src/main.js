import Vue from 'vue'
import Vant from 'vant';
import VueRouter from 'vue-router';
import 'vant/lib/index.css';
import App from './App.vue';
import router from './router';


Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vant);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
