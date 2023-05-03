import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import router from './router'
import stores from './stores'

import '@/styles/styles.scss'

createApp(App)
    .use(createPinia())
    .use( stores )
    .use(router)
    .mount('#app')