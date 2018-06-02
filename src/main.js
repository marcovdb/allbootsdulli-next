import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import VuePaginate from 'vue-paginate'

import './directives'
import './mixins'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VuePaginate)

new Vue({ router, render: h => h(App) }).$mount('#app')
