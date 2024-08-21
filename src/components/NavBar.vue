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

        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="health-resources"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Health Resources
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/health-resources">Overview</a></li>
            <li>
              <a class="dropdown-item" href="/health-resources/healthcare-providers"
                >Healthcare Providers</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="/health-resources/symptom-checker">Symptom Checker</a>
            </li>
            <li>
              <a class="dropdown-item" href="/health-resources/traditional-practices"
                >Traditional Practices</a
              >
            </li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="educational-materials"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Educational Materials
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/educational-materials">Overview</a></li>
            <li>
              <a class="dropdown-item" href="/educational-materials/mental-health">Mental Health</a>
            </li>
            <li>
              <a class="dropdown-item" href="/educational-materials/nutrition">Nutrition</a>
            </li>
            <li>
              <a class="dropdown-item" href="/educational-materials/preventive-care"
                >Preventive Care</a
              >
            </li>
          </ul>
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

        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="non-indigenous-awareness"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Non-Indigenous Awareness
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/non-indigenous-awareness">Overview</a></li>
            <li>
              <a class="dropdown-item" href="/non-indigenous-awareness/case-studies"
                >Case studies</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="/non-indigenous-awareness/cultural-preservation"
                >Cultural Preservation</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="/non-indigenous-awareness/health-disparities"
                >Health Disparities</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="/non-indigenous-awareness/socio-economic-issues"
                >Socio-economic Issues</a
              >
            </li>
          </ul>
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
