<template>
  <CoverImage :title="'Fundraising campaigns'"></CoverImage>

  <div class="d-flex flex-wrap justify-content-center p-4">
    <Card v-for="campaign in donationCampaigns" :key="campaign.id">
      <template #header>
        <img alt="header" src="../../assets/images/logo.png" width="160" />
      </template>
      <template #title>{{ campaign.name }}</template>
      <template #subtitle>
        <div>Start date: {{ campaign.startDate }}</div>
        <div>End date: {{ campaign.endDate }}</div>
      </template>
      <template #content>
        <p class="m-0">
          {{ campaign.description }}
        </p>
      </template>
      <template #footer>
        <div class="d-flex flex-row gap-2 mt-1">
          <div>Average rating:</div>
          <Rating v-model="campaign.averageRating" readonly />
        </div>
        <div class="flex gap-4 mt-3">
          <Button label="See Details" class="w-full" @click="navigateToDetails(campaign.id)" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import Rating from 'primevue/rating'
import { donationCampaigns } from '../../assets/data/donationCampaigns'
import CoverImage from '../../components/CoverImage.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateToDetails(id) {
  router.push(`fundraising-campaigns/${id}`)
}
</script>

<style>
.p-card-header {
  display: flex;
  justify-content: center;
}

.p-card.p-component {
  width: 20rem;
  overflow: hidden;
  margin: 0 1.2rem 1rem;
}
</style>
