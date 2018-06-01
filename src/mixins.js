import Vue from 'vue'
import axios from 'axios'

Vue.mixin({
    methods: {
        get: (call) => {
            return axios.get('/api/' + call + '/')
        }
    }
})