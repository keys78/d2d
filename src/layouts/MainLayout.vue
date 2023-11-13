<template>
  <Header />
  <main class="max-w-[600px] mx-auto relative border-2 border-green-500 h-full">
    <router-view/>
  </main>
  <Navbar />
</template>

<script setup>
import Header from "../components/Header.vue";
import Navbar from "../components/shared/Navbar.vue";
</script>



