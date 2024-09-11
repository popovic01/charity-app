<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import { donationCampaigns } from '../src/assets/data/donationCampaigns'
import { donations } from '../src/assets/data/donations'

const currentUser = ref(
  localStorage.getItem('currentUser') === null
    ? null
    : JSON.parse(localStorage.getItem('currentUser'))
)

function saveCampaigns() {
  localStorage.setItem('donationCampaigns', JSON.stringify(donationCampaigns))
}

function saveDonations() {
  localStorage.setItem('donations', JSON.stringify(donations))
}

saveCampaigns()
saveDonations()

function changeIsLoggedIn() {
  if (currentUser.value) {
    localStorage.removeItem('currentUser')
    currentUser.value = null
  } else {
    currentUser.value = JSON.parse(localStorage.getItem('currentUser'))
  }
}
</script>

<template>
  <Toast />

  <main>
    <NavBar :currentUser="currentUser" @logout="changeIsLoggedIn"></NavBar>
    <RouterView @login="changeIsLoggedIn" @register="changeIsLoggedIn" :currentUser="currentUser" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
