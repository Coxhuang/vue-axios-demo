// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "./api/";
Vue.prototype.$api = axios;


// 使用统一化管理,将以下代码注释掉
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios,axios);
// axios.defaults.baseURL = "http://127.0.0.1:8000/";


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
