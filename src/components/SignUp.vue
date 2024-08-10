<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="mb-3">Sign up</h1>

        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-7 mb-2">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" v-model="formData.name" />
              <p v-if="!formValidation.isNameValid && isFormSubmitted" class="text-danger">
                Name is required
              </p>
            </div>
            <div class="col-md-7 mb-2">
              <label for="email" class="form-label">Email</label>
              <input type="text" class="form-control" id="email" v-model="formData.email" />
            </div>
            <p v-if="!formValidation.isEmailValid && isFormSubmitted" class="text-danger">
              Email is not valid
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
                Password must be 8-22 characters long, containing at least one uppercase letter, one
                digit, and one special character
              </p>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2" @click="$emit('login')">
              Sign up
            </button>
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

const isFormSubmitted = ref(false)

const getInitialData = () => ({
  name: '',
  email: '',
  password: '',
  isAdmin: false
})

const getInitialValidation = () => ({
  isEmailValid: false,
  isNameValid: false,
  isPasswordValid: false
})

const formData = ref(getInitialData())
const formValidation = ref(getInitialValidation())

const users = ref([])

const submitForm = () => {
  checkValidation()
  isFormSubmitted.value = true

  //the validation is correct
  if (
    formValidation.value.isEmailValid &&
    formValidation.value.isPasswordValid &&
    formValidation.value.isNameValid
  ) {
    users.value.push({
      ...formData.value
    })
    localStorage.setItem('currentUser', JSON.stringify(formData.value))
    clearForm()
  }
}

function checkValidation() {
  let emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  let lengthRegex = new RegExp(/^\S{8,22}$/m)
  let specialCharRegex = new RegExp(/^(?=.*[~!@#$%^*\-_=+[{\]}\/;:,.?]).*$/m)
  let upperCharRegex = new RegExp(/^(?=.*[A-Z]).*$/m)
  let numericCharRegex = new RegExp(/^(?=.*\d).*$/m)

  if (!formData.value.email || !emailRegex.test(formData.value.email)) {
    formValidation.value.isEmailValid = false
  } else {
    formValidation.value.isEmailValid = true
  }
  if (!formData.value.name) {
    formValidation.value.isNameValid = false
  } else {
    formValidation.value.isNameValid = true
  }
  if (
    !formData.value.password ||
    !lengthRegex.test(formData.value.password) ||
    !specialCharRegex.test(formData.value.password) ||
    !upperCharRegex.test(formData.value.password) ||
    !numericCharRegex.test(formData.value.password)
  ) {
    formValidation.value.isPasswordValid = false
  } else {
    formValidation.value.isPasswordValid = true
  }
  console.log(formValidation.value)
}

function clearForm() {
  formData.value = getInitialData()
  formValidation.value = getInitialValidation()
  localStorage.removeItem('currentUser')
  isFormSubmitted.value = false
}
</script>

<style scoped></style>
