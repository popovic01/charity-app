<template>
  <nav class="navbar navbar-expand-xl navbar-light bg-light">
    <a class="navbar-brand" href="/">
      <img src="../assets/images/logo.png" width="50" height="40" alt="logo" />
    </a>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/">Home</a>
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="healthResourcesDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Health Resources
          </a>
          <ul class="dropdown-menu" aria-labelledby="healthResourcesDropdown">
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
            href="#"
            id="educationalMaterialsDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Educational Materials
          </a>
          <ul class="dropdown-menu" aria-labelledby="educationalMaterialsDropdown">
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
            href="#"
            id="communitySupportDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Community Support
          </a>
          <ul class="dropdown-menu" aria-labelledby="communitySupportDropdown">
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
            href="#"
            id="nonIndigenousAwarenessDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Non-Indigenous Awareness
          </a>
          <ul class="dropdown-menu" aria-labelledby="nonIndigenousAwarenessDropdown">
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
            href="#"
            id="donationPlatformDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Donation Platform
          </a>
          <ul class="dropdown-menu" aria-labelledby="donationPlatformDropdown">
            <li><a class="dropdown-item" href="/donation">Overview</a></li>
            <li><a class="dropdown-item" href="/donation/donate-now">Donate Now</a></li>
            <li><a class="dropdown-item" href="/donation/impact-reports">Impact reports</a></li>
            <li v-if="currentUser?.isAdmin">
              <a class="dropdown-item" href="/donation/add-campaign">Add campaign</a>
            </li>
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
            href="#"
            id="aboutUsDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            About Us
          </a>
          <ul class="dropdown-menu" aria-labelledby="aboutUsDropdown">
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
        <li class="nav-item" v-if="!currentUser">
          <a class="nav-link" href="/sign-in">Sign in</a>
        </li>
        <li class="nav-item" v-if="!currentUser">
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
defineProps(['currentUser'])
</script>

<style scoped>
.nav-item {
  font-size: 0.9rem;
}
.navbar.navbar-expand-xl.navbar-light.bg-light {
  padding-left: 1rem;
}
</style>
