<template>
  <CoverImage :title="'Overview'" v-if="isOverview()"></CoverImage>
  <RouterView></RouterView>
</template>

<script setup>
import CoverImage from '../../components/CoverImage.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps(['title'])

function isOverview() {
  if (router.currentRoute.value.fullPath === '/donation') {
    return true
  }
  return false
}
</script>

<style>
.img-wrapper {
  position: relative;
  text-align: center;
  color: white;
  opacity: 60%;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: 500;
}
</style>
