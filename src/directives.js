import Vue from 'vue'
import moment from 'moment'

Vue.directive('moment', {
    bind: function(el, binding) {
        let dateFormat = binding.arg || 'YYYY-MM-DD';

        if (dateFormat === 'fromNow') {
            el.textContent = moment(binding.value).fromNow();
        } else {
            el.textContent = moment(binding.value).format(dateFormat);
        }
    }
})