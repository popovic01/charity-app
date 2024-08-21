<template>
  <CoverImage :title="'Non-Indigenous Awareness'" v-if="isOverview()"></CoverImage>
  <RouterView></RouterView>
</template>

<script setup>
import CoverImage from '../../components/CoverImage.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function isOverview() {
  if (router.currentRoute.value.fullPath === '/non-indigenous-awareness') {
    return true
  }
  return false
}
</script>

<style></style>
