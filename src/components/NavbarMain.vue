<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="navbar navbar-expand-lg nav-main">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Vue API</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <!-- <router-link to="/" class="nav-link" aria-current="page"
            >Home</router-link
          >
          <router-link to="/about" class="nav-link">About</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-main {
  background-color:#38CE48;
}

.navbar-brand, .nav-link {
  color: #ffffff;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  color: #d6c5c5;
}
</style>