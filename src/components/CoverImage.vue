<template>
  <div class="img-wrapper">
    <img src="../assets/images/aborigines.jpg" alt="Snow" class="w-100" />
    <div class="centered text-uppercase">{{ title }}</div>
  </div>
</template>

<script setup>
defineProps(['title'])
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
