import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import router from './router'
import store from './store/module-template'

import '@/styles/styles.scss'

createApp(App)
    .use(createPinia())
    .use( store )
    .use(router)
    .mount('#app')