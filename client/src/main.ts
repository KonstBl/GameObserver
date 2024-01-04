import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import FeatherIcon from './components/icons/FeatherIcon.vue'
Vue.component(FeatherIcon.name, FeatherIcon)

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

require('@/filters')

Vue.use(BootstrapVue)

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
