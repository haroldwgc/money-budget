import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import { createPinia } from 'pinia'
createApp(App)
.use(createPinia())
.use(router).mount('#app')
import "bootstrap/dist/js/bootstrap.js"
