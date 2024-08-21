import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import Donation from './components/donation/Donation.vue'
import Reports from './components/donation/Reports.vue'
import FundraisingCampaigns from './components/donation/FundraisingCampaigns.vue'
import FundraisingCampaignDetails from './components/donation/FundraisingCampaignDetails.vue'

const routes = [
  {
    path: '/',
    component: Home
    // add this if you want to allow access only to auth users
    // meta: {
    //   requiresAuth: true
    // }
  },
  { path: '/sign-in', component: SignIn },
  { path: '/sign-up', component: SignUp },
  {
    path: '/donation',
    component: Donation,
    children: [
      { path: 'impact-reports', component: Reports },
      { path: 'fundraising-campaigns', component: FundraisingCampaigns },
      { path: 'fundraising-campaigns/:id', component: FundraisingCampaignDetails }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('currentUser')) {
      // user is authenticated, proceed to the route
      next()
    } else {
      // uer is not authenticated, redirect to login
      next('/sign-in')
    }
  } else {
    // Non-protected route, allow access
    next()
  }
})

export default router
