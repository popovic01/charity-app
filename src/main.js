import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import ToastService from 'primevue/toastservice'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCjdCViDavtNLMp8pXbsXIBwWE-MZlGVgU',
  authDomain: 'charity-app-2db92.firebaseapp.com',
  projectId: 'charity-app-2db92',
  storageBucket: 'charity-app-2db92.appspot.com',
  messagingSenderId: '132374224090',
  appId: '1:132374224090:web:c3232914c9eae1cac159e3'
}

const firebaseApp = initializeApp(firebaseConfig)
export default getAuth(firebaseApp)

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.use(router)
app.use(ToastService)

app.mount('#app')
