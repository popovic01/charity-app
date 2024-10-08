<template>
  <nav class="navbar navbar-expand-xl navbar-light bg-light" aria-label="Main navigation">
    <a class="navbar-brand" href="/">
      <img src="../assets/images/logo.png" width="50" height="40" alt="Website logo" />
    </a>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation menu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse">
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
            <li><a class="dropdown-item" href="/health-resources">Health Resources Overview</a></li>
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
            <li>
              <a class="dropdown-item" href="/educational-materials"
                >Educational Materials Overview</a
              >
            </li>
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
            <li>
              <a class="dropdown-item" href="/community-support">Community Support Overview</a>
            </li>
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
            <li>
              <a class="dropdown-item" href="/non-indigenous-awareness"
                >Non-Indigenous Awareness Overview</a
              >
            </li>
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
            <li><a class="dropdown-item" href="/donation">Donation Platform Overview</a></li>
            <li><a class="dropdown-item" href="/donation/donate-now">Donate Now</a></li>
            <li><a class="dropdown-item" href="/donation/donations">Donations</a></li>
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

        <li v-if="currentUser?.isAdmin" class="nav-item">
          <a class="nav-link" href="/admin-dashboard">Admin dashboard</a>
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
