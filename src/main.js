import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.mixin({
    methods: {
        get: (call) => {
            return axios.get('http://allbootsdulli.ubuntu.local/api/' + call + '/')
        }
    }
})

new Vue({ router, render: h => h(App) }).$mount('#app')
