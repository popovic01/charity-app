<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'

const isLoggedIn = ref(false)

function changeIsLoggedIn() {
  isLoggedIn.value = !isLoggedIn.value
  if (!isLoggedIn.value) {
    localStorage.removeItem('currentUser')
  }
}
</script>

<template>
  <header></header>

  <main>
    <NavBar :isLoggedIn="isLoggedIn" @logout="changeIsLoggedIn"></NavBar>
    <SignUp @register="changeIsLoggedIn"></SignUp>
    <SignIn @login="changeIsLoggedIn"></SignIn>
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
