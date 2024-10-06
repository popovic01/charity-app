<template>
  <div class="container mt-5 mb-3">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="mb-3">Add donation campaign</h1>

        <form @submit.prevent="submitForm" aria-describedby="formInstructions">
          <div id="formInstructions" class="sr-only">
            Fill in the campaign details including title, description, start date, and end date.
            Ensure all fields are completed.
          </div>
          <br />

          <div class="row mb-3">
            <div class="col-md-7 mb-2">
              <label for="name" class="form-label">Title</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="formData.name"
                @input="() => validateTitle()"
                aria-required="true"
                aria-invalid="!formValidation.isTitleValid && isFormSubmitted"
              />
              <p
                v-if="!formValidation.isTitleValid && isFormSubmitted"
                class="text-danger"
                id="titleError"
              >
                Title is required.
              </p>
            </div>

            <div class="col-md-7 mb-2">
              <label for="description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="description"
                v-model="formData.description"
                @input="() => validateDescription()"
                rows="10"
                aria-required="true"
                aria-invalid="!formValidation.isDescriptionValid && isFormSubmitted"
              />
              <p
                v-if="!formValidation.isDescriptionValid && isFormSubmitted"
                class="text-danger"
                id="descriptionError"
              >
                Description is required.
              </p>
            </div>

            <div class="col-md-7 mb-2">
              <label for="startDate" class="form-label">Start date</label>
              <input
                type="date"
                class="form-control"
                id="startDate"
                v-model="formData.startDate"
                @input="() => validateStartDate()"
                aria-required="true"
                aria-invalid="!formValidation.isStartDateEntered && isFormSubmitted"
              />
              <p
                v-if="!formValidation.isStartDateEntered && isFormSubmitted"
                class="text-danger"
                id="startDateError"
              >
                Start date is required.
              </p>
              <p
                v-if="
                  formValidation.isStartDateEntered &&
                  !formValidation.isStartDateValid &&
                  isFormSubmitted
                "
                class="text-danger"
              >
                Start date must be in the future.
              </p>
            </div>

            <div class="col-md-7 mb-2">
              <label for="endDate" class="form-label">End date</label>
              <input
                type="date"
                class="form-control"
                id="endDate"
                v-model="formData.endDate"
                @input="() => validateEndDate()"
                aria-required="true"
                aria-invalid="!formValidation.isEndDateEntered && isFormSubmitted"
              />
              <p
                v-if="!formValidation.isEndDateEntered && isFormSubmitted"
                class="text-danger"
                id="endDateError"
              >
                End date is required.
              </p>
              <p
                v-if="
                  formValidation.isEndDateEntered &&
                  !formValidation.isEndDateValid &&
                  isFormSubmitted
                "
                class="text-danger"
              >
                End date must be later than the start date.
              </p>
            </div>
          </div>

          <div class="text-center">
            <button
              type="submit"
              class="btn btn-primary me-2"
              aria-label="Submit donation campaign form"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isFormSubmitted = ref(false)
const today = new Date()

const retrieveCampaigns = () => {
  let campaigns = localStorage.getItem('donationCampaigns')
  return campaigns ? JSON.parse(campaigns) : []
}

const campaigns = ref(retrieveCampaigns())

const getInitialData = () => ({
  id: 0,
  name: '',
  startDate: '',
  endDate: '',
  description: '',
  userRatings: [],
  averageRating: 0
})

const getInitialValidation = () => ({
  isTitleValid: false,
  isDescriptionValid: false,
  isStartDateEntered: false,
  isStartDateValid: false,
  isEndDateEntered: false,
  isEndDateValid: false
})

const formData = ref(getInitialData())
const formValidation = ref(getInitialValidation())

const submitForm = () => {
  isFormSubmitted.value = true
  validateTitle()
  validateDescription()
  validateStartDate()
  validateEndDate()

  //the validation is correct
  if (
    formValidation.value.isTitleValid &&
    formValidation.value.isDescriptionValid &&
    formValidation.value.isStartDateEntered &&
    formValidation.value.isStartDateValid &&
    formValidation.value.isEndDateEntered &&
    formValidation.value.isEndDateValid
  ) {
    formData.value.id = campaigns.value[campaigns.value.length - 1].id + 1
    campaigns.value.push({
      ...formData.value
    })
    localStorage.setItem('donationCampaigns', JSON.stringify(campaigns.value))
    router.push('/donation/fundraising-campaigns')
    clearForm()
  }
}

function validateTitle() {
  if (formData.value.name) {
    formValidation.value.isTitleValid = true
  } else {
    formValidation.value.isTitleValid = false
  }
}

function validateDescription() {
  if (formData.value.description) {
    formValidation.value.isDescriptionValid = true
  } else {
    formValidation.value.isDescriptionValid = false
  }
}

function validateStartDate() {
  if (formData.value.startDate) {
    formValidation.value.isStartDateEntered = true
    if (today.getTime() > new Date(formData.value.startDate).getTime()) {
      formValidation.value.isStartDateValid = false
    } else {
      formValidation.value.isStartDateValid = true
    }
  } else {
    formValidation.value.isStartDateEntered = false
  }
}

function validateEndDate() {
  if (formData.value.endDate) {
    formValidation.value.isEndDateEntered = true
    if (
      new Date(formData.value.startDate).getTime() >= new Date(formData.value.endDate).getTime()
    ) {
      formValidation.value.isEndDateValid = false
    } else {
      formValidation.value.isEndDateValid = true
    }
  } else {
    formValidation.value.isEndDateEntered = false
  }
}

function clearForm() {
  formData.value = getInitialData()
  formValidation.value = getInitialValidation()
  isFormSubmitted.value = false
}
</script>

<style scoped></style>
