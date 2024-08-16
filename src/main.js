import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import ToastService from 'primevue/toastservice'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.use(router)
app.use(ToastService)

app.mount('#app')
