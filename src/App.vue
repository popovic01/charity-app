<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import { users } from '../src/assets/data/users.js'
import { donationCampaigns } from '../src/assets/data/donationCampaigns'
import { encrypteData } from './utils/passwordHash'

const currentUser = ref(
  localStorage.getItem('currentUser') === null
    ? null
    : JSON.parse(localStorage.getItem('currentUser'))
)

function saveUsers() {
  if (!localStorage.getItem('users')) {
    users.forEach((x) => (x.password = encrypteData(x.password)))
    localStorage.setItem('users', JSON.stringify(users))
  }
}

function saveCampaigns() {
  if (!localStorage.getItem('donationCampaigns')) {
    localStorage.setItem('donationCampaigns', JSON.stringify(donationCampaigns))
  }
}

saveUsers()
saveCampaigns()

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
