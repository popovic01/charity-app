<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="mb-3">Sign up</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-7">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" v-model="formData.name" />
            </div>
            <div class="col-md-7">
              <label for="email" class="form-label">Email</label>
              <input type="text" class="form-control" id="email" v-model="formData.email" />
            </div>
            <div class="col-md-7">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <h2>Users</h2>
  <ul v-if="users.length">
    <li v-for="user in users" :key="user.email">
      {{ user.name }} ({{ user.email }}) - Admin: {{ user.isAdmin }}
    </li>
  </ul>

  <p v-if="isLoggedIn">Logged in</p>
  <button @click="logOut">Log out</button>
</template>

<script setup>
import { ref } from 'vue'

const getInitialData = () => ({
  name: '',
  email: '',
  password: '',
  isAdmin: false
})

const formData = ref(getInitialData())

const users = ref([])
const isLoggedIn = ref(false)

const submitForm = () => {
  users.value.push({
    ...formData.value
  })
  localStorage.setItem('currentUser', JSON.stringify(formData.value))
  isLoggedIn.value = true
  clearForm()
}

function clearForm() {
  formData.value = getInitialData()
}

function logOut() {
  isLoggedIn.value = false
}
</script>

<style scoped></style>
