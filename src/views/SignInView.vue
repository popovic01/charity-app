<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="mb-3">Sign in</h1>

        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-7 mb-2">
              <label for="email" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="email"
                v-model="formData.email"
                @input="validateEmail()"
              />
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
                @input="validatePassword()"
              />
              <p v-if="!formValidation.isPasswordEntered && isFormSubmitted" class="text-danger">
                Password is required.
              </p>
              <p
                v-if="
                  !formValidation.isPasswordCorrect &&
                  formValidation.isPasswordEntered &&
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
import { useRouter } from 'vue-router'
import { encrypteData } from '../utils/passwordHash'

const router = useRouter()

const emit = defineEmits(['login'])

const isFormSubmitted = ref(false)

const retrieveUsers = () => {
  let users = localStorage.getItem('users')
  return users ? JSON.parse(users) : []
}

const users = ref(retrieveUsers())
const user = ref(null)

const getInitialData = () => ({
  email: '',
  password: ''
})

const getInitialValidation = () => ({
  isEmailValid: false,
  isPasswordEntered: false,
  isPasswordCorrect: false,
  isUserRegistered: false
})

const formData = ref(getInitialData())
const formValidation = ref(getInitialValidation())

const submitForm = () => {
  isFormSubmitted.value = true
  validateEmail()
  validatePassword()

  //the validation is correct
  if (
    formValidation.value.isEmailValid &&
    formValidation.value.isPasswordEntered &&
    formValidation.value.isUserRegistered &&
    formValidation.value.isPasswordCorrect
  ) {
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ email: formData.value.email, isAdmin: formData.value.isAdmin })
    )
    router.push('/')
    emit('login')
    clearForm()
  }
}

function validateEmail() {
  user.value = users.value.find((user) => user.email === formData.value.email)

  if (formData.value.email) {
    formValidation.value.isEmailValid = true
    if (user.value) {
      formValidation.value.isUserRegistered = true
    } else {
      formValidation.value.isUserRegistered = false
    }
  } else {
    formValidation.value.isEmailValid = false
  }
}

function validatePassword() {
  if (formData.value.password) {
    formValidation.value.isPasswordEntered = true
    if (user?.value.password === encrypteData(formData.value.password)) {
      formValidation.value.isPasswordCorrect = true
    } else {
      formValidation.value.isPasswordCorrect = false
    }
  } else {
    formValidation.value.isPasswordEntered = false
  }
}

function clearForm() {
  formData.value = getInitialData()
  formValidation.value = getInitialValidation()
  isFormSubmitted.value = false
}
</script>

<style scoped></style>
