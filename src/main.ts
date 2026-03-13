import '@/style.css'
import 'iconify-icon'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

const router = createRouter({
	history: createWebHistory(),
	routes,
})
const app = createApp(App)
app.use(router)
app.use(createPinia())

app.mount('#app')
