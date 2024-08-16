<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="">
      <img src="../assets/images/logo.png" width="90" height="90" alt="logo" />
    </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Health Resources</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Educational Materials</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Community Support</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Awareness for Non-Indigenous People</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Donation Platform</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About Us</a>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <a class="nav-link" href="/sign-in">Sign in</a>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <a class="nav-link" href="/sign-up">Sign up</a>
        </li>
        <li class="nav-item" v-else>
          <a class="nav-link" href="#" @click="$emit('logout')">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
defineProps(['isLoggedIn'])
</script>

<style></style>
