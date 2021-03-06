import Vue from 'vue'
import store from './vuex'
import App from './App.vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from "vue2-google-maps"
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faBiohazard,
  faHandSparkles,
  faInfoCircle,
  faVirus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$http = axios

library.add(faBars)
library.add(faBiohazard)
library.add(faHandSparkles)
library.add(faInfoCircle)
library.add(faVirus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: "places"
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
