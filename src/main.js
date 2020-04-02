import Vue from 'vue'
import store from './vuex'
import App from './App.vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from "vue2-google-maps"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(BootstrapVue)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: "places"
  }
});
var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
