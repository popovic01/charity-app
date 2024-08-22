<template>
  <div class="img-wrapper">
    <img src="../assets/images/aborigines.jpg" alt="Snow" class="w-100" />
    <div class="centered text-uppercase">{{ title }}</div>
  </div>
</template>

<script setup>
defineProps(['title'])
</script>

<style scoped>
.img-wrapper {
  position: relative;
  text-align: center;
  color: white;
  opacity: 60%;
}

.centered.text-uppercase {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 500;
  width: 86%;
}

@media only screen and (max-width: 576px) {
  .centered.text-uppercase {
    font-size: 1rem;
  }
  img {
    height: 7rem;
  }
}

@media only screen and (min-width: 577px) and (max-width: 768px) {
  .centered.text-uppercase {
    font-size: 2rem;
  }
}

@media only screen and (min-width: 769px) and (max-width: 992px) {
  .centered.text-uppercase {
    font-size: 3rem;
  }
}

@media only screen and (min-width: 993px) {
  .centered.text-uppercase {
    font-size: 4rem;
  }
}
</style>
