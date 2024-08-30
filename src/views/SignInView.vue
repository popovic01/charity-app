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
            </div>
            <p v-if="formValidation.invalidCredentials && isFormSubmitted" class="text-danger">
              Your login credentials are not valid.
            </p>
            <p
              v-if="
                formValidation.isPasswordEntered &&
                formValidation.isEmailValid &&
                !formValidation.default &&
                isFormSubmitted
              "
              class="text-danger"
            >
              Something went wrong.
            </p>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()

const emit = defineEmits(['login'])

const isFormSubmitted = ref(false)

const getInitialData = () => ({
  email: '',
  password: ''
})

const getInitialValidation = () => ({
  isEmailValid: false,
  isPasswordEntered: false,
  invalidCredentials: false,
  default: false
})

const formData = ref(getInitialData())
const formValidation = ref(getInitialValidation())

const submitForm = () => {
  isFormSubmitted.value = true
  validateEmail()
  validatePassword()

  //the validation is correct
  if (formValidation.value.isEmailValid && formValidation.value.isPasswordEntered) {
    login()
  }
}

function login() {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, formData.value.email, formData.value.password)
    .then((data) => {
      router.push('/')
      clearForm()
      formValidation.value.default = true
      formValidation.value.invalidCredentials = false
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          email: data.user.email,
          isAdmin: data.user.email == 'admin@example.com' ? true : false
        })
      )
      emit('login')
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-credential':
          formValidation.value.invalidCredentials = true
          break
        default:
          formValidation.value.default = false
          break
      }
    })
}

function validateEmail() {
  formValidation.value.default = true
  if (formData.value.email) {
    formValidation.value.isEmailValid = true
  } else {
    formValidation.value.isEmailValid = false
  }
}

function validatePassword() {
  if (formData.value.password) {
    formValidation.value.isPasswordEntered = true
  } else {
    formValidation.value.isPasswordEntered = false
  }
  formValidation.value.default = true
}

function clearForm() {
  formData.value = getInitialData()
  formValidation.value = getInitialValidation()
  isFormSubmitted.value = false
}
</script>

<style scoped></style>
