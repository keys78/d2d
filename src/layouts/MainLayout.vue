<template>
  <div>
    <Header />
    <section class="s-767:px-20 px-4 mt-24">
      <div class="max-w-[600px] mx-auto">
        <router-view v-slot="{ Component }">
          <Transition name="page-slide" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </section>
    <Navbar />
  </div>
</template>

<script setup>
import { Transition, onMounted } from "vue";
import Header from "../components/shared/Header.vue";
import Navbar from "../components/shared/Navbar.vue";

</script>

<style>
.page-slide-enter-active,
.page-slide-leave-active {
  transition: 400ms ease all;
}
.page-slide-enter-from,
.page-slide-leave-to {
  transform: translateX(15%);
  opacity: 0;
}
</style>
