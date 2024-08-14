<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="mb-3">Sign in</h1>

        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-7 mb-2">
              <label for="email" class="form-label">Email</label>
              <input type="text" class="form-control" id="email" v-model="formData.email" />
            </div>
            <p v-if="!formValidation.isEmailValid && isFormSubmitted" class="text-danger">
              Email is not valid.
            </p>
            <p
              v-if="
                !formValidation.isUserRegistered && formValidation.isEmailValid && isFormSubmitted
              "
              class="text-danger"
            >
              A user with that email address doesn't exists.
            </p>
            <div class="col-md-7 mb-2">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
              <p v-if="!formValidation.isPasswordValid && isFormSubmitted" class="text-danger">
                Password is required.
              </p>
              <p
                v-if="
                  !formValidation.isPasswordCorrect &&
                  formValidation.isPasswordValid &&
                  formValidation.isUserRegistered &&
                  isFormSubmitted
                "
                class="text-danger"
              >
                Password is not correct.
              </p>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Sign in</button>
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
</template>

<script setup>
import { ref } from 'vue'
import { users } from '../assets/data/users.js'

const emit = defineEmits(['login'])

const isFormSubmitted = ref(false)

const getInitialData = () => ({
  email: '',
  password: ''
})

const getInitialValidation = () => ({
  isEmailValid: false,
  isPasswordValid: false,
  isPasswordCorrect: false,
  isUserRegistered: false
})

const formData = ref(getInitialData())
const formValidation = ref(getInitialValidation())

const submitForm = () => {
  checkValidation()
  isFormSubmitted.value = true

  //the validation is correct
  if (
    formValidation.value.isEmailValid &&
    formValidation.value.isPasswordValid &&
    formValidation.value.isUserRegistered &&
    formValidation.value.isPasswordCorrect
  ) {
    emit('login')
    localStorage.setItem('currentUser', JSON.stringify(formData.value))
    clearForm()
  }
}

function checkValidation() {
  let user = users.find((user) => user.email === formData.value.email)

  if (user) {
    formValidation.value.isUserRegistered = true
  }

  if (user?.password === formData.value.password) {
    formValidation.value.isPasswordCorrect = true
  }

  if (formData.value.email) {
    formValidation.value.isEmailValid = true
  }

  if (formData.value.name) {
    formValidation.value.isNameValid = true
  }

  if (formData.value.password) {
    formValidation.value.isPasswordValid = true
  }
}

function clearForm() {
  formData.value = getInitialData()
  formValidation.value = getInitialValidation()
  isFormSubmitted.value = false
}
</script>

<style scoped></style>
