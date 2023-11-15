<template>
  <main>
    <Header />
    <slot />
    <Navbar />
  </main>
</template>

<script setup>
import Header from "../components/shared/Header.vue";
import Navbar from "../components/shared/Navbar.vue";
</script>