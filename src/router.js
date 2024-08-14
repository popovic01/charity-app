import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/sign-in', component: SignIn },
  { path: '/sign-up', component: SignUp }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
