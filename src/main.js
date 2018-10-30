import Vue from 'vue'
import App from './App.vue'
import router from './router'


import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import _ from 'lodash';

library.add(faExternalLinkAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(_);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
