<template>
  <header class="shadow py-3 !fixed top-0 w-full bg-veryDarkBlue">
    <section class=" s-767:px-20 px-4">
      <div class="flex items-center justify-between max-w-[600px] mx-auto">
        <Logo :width="100" />
        <ToggleSwitch />
      </div>
    </section>
  </header>
</template>

<script setup>
import ToggleSwitch from "../ui/ToggleSwitch.vue";
import Logo from "../../assets/svg/Logo.vue";
</script>