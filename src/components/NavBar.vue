<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">
      <img src="../assets/images/logo.png" width="50" height="40" alt="logo" />
    </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Health Resources</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Educational Materials</a>
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="community-support"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Community Support
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/community-support">Overview</a></li>
            <li>
              <a class="dropdown-item" href="/community-support/support-groups">Support Groups</a>
            </li>
            <li>
              <a class="dropdown-item" href="/community-support/community-events"
                >Community Events</a
              >
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Awareness for Non-Indigenous People</a>
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="donation"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Donation Platform
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/donation">Overview</a></li>
            <li><a class="dropdown-item" href="/donation/donate-now">Donate Now</a></li>
            <li><a class="dropdown-item" href="/donation/impact-reports">Impact reports</a></li>
            <li>
              <a class="dropdown-item" href="/donation/fundraising-campaigns"
                >Fundraising campaigns</a
              >
            </li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="about-us"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            About Us
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/about-us">Overview</a></li>
            <li><a class="dropdown-item" href="/about-us/our-team">Our team</a></li>
            <li><a class="dropdown-item" href="/about-us/contact-us">Contact us</a></li>
            <li>
              <a class="dropdown-item" href="/about-us/faqs">FAQs</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
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

<style scoped>
.nav-item {
  font-size: 0.9rem;
}
</style>
