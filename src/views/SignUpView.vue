<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="mb-3">Sign up</h1>

        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-7 mb-2">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="formData.name"
                @input="() => validateName()"
              />
              <p v-if="!formValidation.isNameValid && isFormSubmitted" class="text-danger">
                Name is required.
              </p>
            </div>
            <div class="col-md-7 mb-2">
              <label for="email" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="email"
                v-model="formData.email"
                @input="() => validateEmail()"
              />
            </div>
            <p v-if="!formValidation.isEmailEntered && isFormSubmitted" class="text-danger">
              Email is required.
            </p>
            <p
              v-if="
                formValidation.isEmailEntered && !formValidation.isEmailValid && isFormSubmitted
              "
              class="text-danger"
            >
              Email is not valid.
            </p>
            <p v-if="formValidation.isUserRegistered && isFormSubmitted" class="text-danger">
              A user with that email address already exists.
            </p>
            <div class="col-md-7 mb-2">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @input="() => validatePassword()"
              />
              <p v-if="!formValidation.isPasswordEntered && isFormSubmitted" class="text-danger">
                Password is required.
              </p>
              <p
                v-if="
                  formValidation.isPasswordEntered &&
                  !formValidation.isPasswordValid &&
                  isFormSubmitted
                "
                class="text-danger"
              >
                Password must be 8-22 characters long, containing at least one uppercase letter, one
                digit, and one special character.
              </p>
            </div>
            <div class="col-md-7 mb-2">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @input="() => validateConfirmPassword()"
              />
              <p
                v-if="!formValidation.isConfirmPasswordEntered && isFormSubmitted"
                class="text-danger"
              >
                Confirm password is required.
              </p>
              <p
                v-if="
                  formValidation.isPasswordEntered &&
                  formValidation.isPasswordValid &&
                  formValidation.isConfirmPasswordEntered &&
                  !formValidation.ifPasswordsMatch &&
                  isFormSubmitted
                "
                class="text-danger"
              >
                Passwords do not match.
              </p>
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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { encrypteData } from '../utils/passwordHash'

const router = useRouter()

const emit = defineEmits(['register'])

const isFormSubmitted = ref(false)

const retrieveUsers = () => {
  let users = localStorage.getItem('users')
  return users ? JSON.parse(users) : []
}

const users = ref(retrieveUsers())

const getInitialData = () => ({
  name: '',
  email: '',
  password: '',
  isAdmin: false
})

const getInitialValidation = () => ({
  isEmailValid: false,
  isNameValid: false,
  isPasswordValid: false,
  isPasswordEntered: false,
  isConfirmPasswordEntered: false,
  isUserRegistered: false,
  ifPasswordsMatch: false
})

const formData = ref(getInitialData())
const formValidation = ref(getInitialValidation())

const submitForm = () => {
  isFormSubmitted.value = true

  //the validation is correct
  if (
    formValidation.value.isEmailValid &&
    formValidation.value.isEmailEntered &&
    formValidation.value.isPasswordValid &&
    formValidation.value.isPasswordEntered &&
    formValidation.value.isConfirmPasswordEntered &&
    formValidation.value.ifPasswordsMatch &&
    formValidation.value.isNameValid &&
    !formValidation.value.isUserRegistered
  ) {
    router.push('/')
    emit('register')
    formData.value.password = encrypteData(formData.value.password)
    users.value.push({
      ...formData.value
    })
    localStorage.setItem('users', JSON.stringify(users.value))
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ email: formData.value.email, isAdmin: formData.value.isAdmin })
    )
    clearForm()
  }
}

function validateEmail() {
  let emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

  if (formData.value.email) {
    formValidation.value.isEmailEntered = true
  } else {
    formValidation.value.isEmailEntered = false
  }

  if (emailRegex.test(formData.value.email)) {
    formValidation.value.isEmailValid = true
    if (users.value.some((user) => user.email === formData.value.email)) {
      formValidation.value.isUserRegistered = true
    } else {
      formValidation.value.isUserRegistered = false
    }
  } else {
    formValidation.value.isEmailValid = false
  }
}

function validateName() {
  if (formData.value.name) {
    formValidation.value.isNameValid = true
  } else {
    formValidation.value.isNameValid = false
  }
}

function validatePassword() {
  let lengthRegex = new RegExp(/^\S{8,22}$/m)
  let specialCharRegex = new RegExp(/^(?=.*[~!@#$%^*\-_=+[{\]}\/;:,.?]).*$/m)
  let upperCharRegex = new RegExp(/^(?=.*[A-Z]).*$/m)
  let numericCharRegex = new RegExp(/^(?=.*\d).*$/m)

  if (formData.value.password) {
    formValidation.value.isPasswordEntered = true
  } else {
    formValidation.value.isPasswordEntered = false
  }

  if (
    lengthRegex.test(formData.value.password) &&
    specialCharRegex.test(formData.value.password) &&
    upperCharRegex.test(formData.value.password) &&
    numericCharRegex.test(formData.value.password)
  ) {
    formValidation.value.isPasswordValid = true
  } else {
    formValidation.value.isPasswordValid = false
  }
}

function validateConfirmPassword() {
  if (formData.value.confirmPassword) {
    formValidation.value.isConfirmPasswordEntered = true
  } else {
    formValidation.value.isConfirmPasswordEntered = false
  }

  if (formData.value.confirmPassword != formData.value.password) {
    formValidation.value.ifPasswordsMatch = false
  } else {
    formValidation.value.ifPasswordsMatch = true
  }
}

function clearForm() {
  formData.value = getInitialData()
  formValidation.value = getInitialValidation()
  isFormSubmitted.value = false
}
</script>

<style scoped></style>
