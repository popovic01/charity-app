import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import SignUpView from './views/SignUpView.vue'
import SignInView from './views/SignInView.vue'
import DonationView from './views/donation/DonationView.vue'
import ReportsView from './views/donation/ReportsView.vue'
import FundraisingCampaignsView from './views/donation/FundraisingCampaignsView.vue'
import FundraisingCampaignDetailsView from './views/donation/FundraisingCampaignDetailsView.vue'
import AboutUsView from './views/about-us/AboutUsView.vue'
import OurTeamView from './views/about-us/OurTeamView.vue'
import ContactUsView from './views/about-us/ContactUsView.vue'
import FAQsView from './views/about-us/FAQsView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
    // add this if you want to allow access only to auth users
    // meta: {
    //   requiresAuth: true
    // }
  },
  { path: '/sign-in', component: SignInView },
  { path: '/sign-up', component: SignUpView },
  {
    path: '/donation',
    component: DonationView,
    children: [
      { path: 'impact-reports', component: ReportsView },
      { path: 'fundraising-campaigns', component: FundraisingCampaignsView },
      { path: 'fundraising-campaigns/:id', component: FundraisingCampaignDetailsView }
    ]
  },
  {
    path: '/about-us',
    component: AboutUsView,
    children: [
      { path: 'our-team', component: OurTeamView },
      { path: 'contact-us', component: ContactUsView },
      { path: 'faqs', component: FAQsView }
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
