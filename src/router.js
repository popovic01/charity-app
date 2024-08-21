import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/HomeView.vue'
import SignUp from './views/SignUpView.vue'
import SignIn from './views/SignInView.vue'
import Donation from './views/donation/DonationView.vue'
import Reports from './views/donation/ReportsView.vue'
import FundraisingCampaigns from './views/donation/FundraisingCampaignsView.vue'
import FundraisingCampaignDetails from './views/donation/FundraisingCampaignDetailsView.vue'

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
