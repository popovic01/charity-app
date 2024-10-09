import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import SignInView from '../views/SignInView.vue'
import DonationView from '../views/donation/DonationView.vue'
import ReportsView from '../views/donation/ReportsView.vue'
import FundraisingCampaignsView from '../views/donation/FundraisingCampaignsView.vue'
import FundraisingCampaignDetailsView from '../views/donation/FundraisingCampaignDetailsView.vue'
import EducationalMaterialsView from '../views/educational-materials/EducationalMaterialsView.vue'
import NutritionView from '../views/educational-materials/NutritionView.vue'
import HealthResourcesView from '../views/health-resources/HealthResourcesView.vue'
import TraditionalPracticesView from '../views/health-resources/TraditionalPracticesView.vue'
import SymptomCheckerView from '../views/health-resources/SymptomCheckerView.vue'
import HealthcareProvidersView from '../views/health-resources/HealthcareProvidersView.vue'
import DonateNowView from '../views/donation/DonateNowView.vue'
import AddCampaign from '../views/donation/AddCampaignView.vue'
import FobiddenView from '../views/FobiddenView.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  { path: '/sign-in', component: SignInView },
  { path: '/sign-up', component: SignUpView },
  { path: '/forbidden', component: FobiddenView },
  {
    path: '/donation',
    component: DonationView,
    children: [
      {
        path: 'donate-now',
        component: DonateNowView,
        meta: { requiresAuth: true, roles: ['user'] }
      },
      { path: 'donations', component: ReportsView },
      { path: 'fundraising-campaigns', component: FundraisingCampaignsView },
      { path: 'fundraising-campaigns/:id', component: FundraisingCampaignDetailsView },
      {
        path: 'add-campaign',
        component: AddCampaign,
        meta: { requiresAuth: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/educational-materials',
    component: EducationalMaterialsView,
    children: [{ path: 'nutrition', component: NutritionView }]
  },
  {
    path: '/health-resources',
    component: HealthResourcesView,
    children: [
      { path: 'healthcare-providers', component: HealthcareProvidersView },
      { path: 'symptom-checker', component: SymptomCheckerView },
      { path: 'traditional-practices', component: TraditionalPracticesView }
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
      if (
        to.meta.roles.includes('admin') &&
        JSON.parse(localStorage.getItem('currentUser')).isAdmin
      ) {
        // user is authenticated, proceed to the route
        next()
      } else if (
        to.meta.roles.includes('admin') &&
        !JSON.parse(localStorage.getItem('currentUser')).isAdmin
      ) {
        next('/forbidden')
      } else {
        // user is authenticated, proceed to the route
        next()
      }
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
