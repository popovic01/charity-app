<template>
  <Toast aria-live="polite" aria-atomic="true" />

  <div class="d-flex flex-column justify-content-center p-4">
    <h2>{{ campaign.name }}</h2>
    <p>{{ campaign.description }}</p>

    <div
      id="carouselExample"
      class="carousel slide"
      aria-label="Fundraising campaign image carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="(image, index) in campaign.images"
          :key="index"
          :class="index === 0 ? 'carousel-item active' : 'carousel-item'"
        >
          <img
            class="d-block w-100"
            :src="image.itemImageSrc"
            :alt="image.alt || 'Fundraising campaign image'"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ image.title }}</h5>
          </div>
        </div>
      </div>

      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
        aria-label="Previous slide"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
        aria-label="Next slide"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div class="d-flex flex-row gap-4 mt-2">
      <div>Average rating:</div>
      <Rating v-model="campaign.averageRating" readonly aria-label="Campaign average rating" />
    </div>

    <div class="d-flex align-items-center flex-row gap-4 mt-2">
      <div>Rate this campaign:</div>

      <div v-if="loggedInUser != null && rating != 0" class="d-flex flex-row gap-3">
        <Rating v-model="rating" disabled aria-label="Your rating for the campaign" />
        <div class="text-secondary">(You already rated this campaign)</div>
      </div>

      <div v-else-if="loggedInUser != null && rating == 0" class="d-flex flex-row gap-3">
        <Rating v-model="newRating" aria-label="Select your rating for the campaign" />
        <Button
          label="Rate"
          size="small"
          class="w-full"
          @click="rateCampaign()"
          tabindex="0"
          aria-label="Submit rating for the campaign"
        />
      </div>

      <div v-else class="d-flex flex-row gap-3">
        <Rating v-model="rating" readonly aria-label="Campaign rating" />
        <div class="text-secondary">(Only logged in users can rate campaigns)</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Rating from 'primevue/rating'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const toast = useToast()

const showMessage = (title, description, severity) => {
  toast.add({
    severity: severity,
    summary: title,
    detail: description,
    life: 2000
  })
}

const router = useRouter()

const campaignId = ref(0)
const campaign = ref(null)
const donationCampaigns = ref([])
const loggedInUser = ref(null)
const rating = ref(0)
const newRating = ref(0)

getCampaignDetails()
getLoggedInUser()

function getLoggedInUser() {
  let user = JSON.parse(localStorage.getItem('currentUser'))
  if (user) {
    getRating()
    loggedInUser.value = user
  }
}

function getRating() {
  let user = JSON.parse(localStorage.getItem('currentUser'))
  let userRating = campaign.value.userRatings.find((x) => x.email === user.email)
  if (userRating) {
    rating.value = campaign.value.userRatings.find((x) => x.email === user.email).rating
  }
}

function getCampaignDetails() {
  campaignId.value = router.currentRoute.value.params.id
  donationCampaigns.value = JSON.parse(localStorage.getItem('donationCampaigns'))
  campaign.value = donationCampaigns.value.find((x) => x.id == campaignId.value)
}

function rateCampaign() {
  if (newRating.value == 0) {
    showMessage('An error occured', 'You have to choose the rating value', 'error')
  }
  rating.value = newRating.value
  campaign.value.userRatings.push({ email: loggedInUser.value.email, rating: newRating.value })
  donationCampaigns.value.find((x) => x.id == campaignId.value).userRatings =
    campaign.value.userRatings
  const totalRating = campaign.value.userRatings.reduce((sum, item) => sum + item.rating, 0)
  const averageRating = totalRating / campaign.value.userRatings.length
  donationCampaigns.value.find((x) => x.id == campaignId.value).averageRating = averageRating
  localStorage.setItem('donationCampaigns', JSON.stringify(donationCampaigns.value))
}
</script>

<style scoped>
.campaign-wrapper {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
</style>
