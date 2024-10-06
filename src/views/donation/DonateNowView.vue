<template>
  <Toast />
  <CoverImage :title="'Donate Now'"></CoverImage>

  <div class="container mt-5 mb-3">
    <div class="d-flex justify-content-center mb-3 w-100">
      <div class="col-8">
        <h1 class="mb-3 text-center">Donate now</h1>

        <form @submit.prevent="submitForm" id="donateForm">
          <div class="row mb-3">
            <div class="col-md-7 mb-2">
              <label for="amount" class="form-label">Amount</label>
              <input
                type="number"
                min="5"
                class="form-control"
                id="amount"
                v-model="formData.amount"
                @input="() => validateAmount()"
              />
              <p v-if="!formValidation.isAmount && isFormSubmitted" class="text-danger">
                Amount is required.
              </p>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Donate</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import CoverImage from '../../components/CoverImage.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import emailjs from 'emailjs-com'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import db from '../../firebase/init'
import { collection, addDoc } from 'firebase/firestore'

const toast = useToast()
const showMessage = (title, description, severity) => {
  toast.add({
    severity: severity,
    summary: title,
    detail: description,
    life: 2000
  })
}

const retrieveDonations = () => {
  let donations = localStorage.getItem('donations')
  return donations ? JSON.parse(donations) : []
}

const donations = ref(retrieveDonations())

const router = useRouter()

const isFormSubmitted = ref(false)

const getInitialData = () => ({
  amount: 5
})

const getInitialValidation = () => ({
  isAmountValid: false
})

const formData = ref(getInitialData())
const formValidation = ref(getInitialValidation())

const submitForm = () => {
  isFormSubmitted.value = true
  validateAmount()

  //the validation is correct
  if (formValidation.value.isAmountValid) {
    const email = JSON.parse(localStorage.getItem('currentUser')).email
    sendEmail(email)
    saveDonation(email)
    router.push('/donation/donations')
    clearForm()
  }
}

async function saveDonation(email) {
  const today = new Date()
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  await addDoc(collection(db, 'donations'), {
    user: email,
    amount: formData.value.amount,
    date: formattedDate
  })
}

function sendEmail(email) {
  try {
    emailjs.send(
      'service_mzrtc4i',
      'template_dnnddu7',
      {
        to_name: email.substring(0, email.indexOf('@')),
        to_email: email,
        amount: formData.value.amount
      },
      'LsataIKg8wAhradmK'
    )
    showMessage('Successfull donation', 'Thank You for Your Generous Donation', 'success')
  } catch (error) {
    showMessage('An error occured', error, 'error')
  }
}

function validateAmount() {
  if (formData.value.amount) {
    formValidation.value.isAmountValid = true
  } else {
    formValidation.value.isAmountValid = false
  }
}

function clearForm() {
  formData.value = getInitialData()
  formValidation.value = getInitialValidation()
  isFormSubmitted.value = false
}
</script>

<style></style>
