import 'mdb-vue-ui-kit/css/mdb.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App).component('Datepicker', Datepicker).use(router).mount('#app')
