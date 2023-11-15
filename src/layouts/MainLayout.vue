<template>
  <Header />
  <!-- <main class="max-w-[600px] mx-auto relative mt-24">-->
  <section class="s-767:px-20 px-4 mt-24">
    <div class="max-w-[600px] mx-auto">
      <router-view />
    </div>
  </section>
  <Navbar />
</template>

<script setup>
import Header from "../components/shared/Header.vue";
import Navbar from "../components/shared/Navbar.vue";
</script>



