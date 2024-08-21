<template>
  <CoverImage :title="'Impact Reports'"></CoverImage>

  <Card style="width: 20rem; overflow: hidden">
    <template #header>
      <img alt="header" src="../../assets/images/logo.png" width="160" />
    </template>
    <template #title>Report 1</template>
    <template #subtitle>Card subtitle</template>
    <template #content>
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
        repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
        ratione quam perferendis esse, cupiditate neque quas!
      </p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Rating v-model="value" readonly />
      </div>
      <div class="flex gap-4 mt-3">
        <Button label="See Details" class="w-full" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import Rating from 'primevue/rating'
import CoverImage from '../../components/CoverImage.vue'
</script>

<style>
.p-card-header {
  display: flex;
  justify-content: center;
}
</style>
