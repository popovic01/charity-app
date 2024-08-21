<template>
  <CoverImage :title="'Educational Materials'" v-if="isOverview()"></CoverImage>
  <RouterView></RouterView>
</template>

<script setup>
import CoverImage from '../../components/CoverImage.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function isOverview() {
  if (router.currentRoute.value.fullPath === '/educational-materials') {
    return true
  }
  return false
}
</script>

<style></style>
