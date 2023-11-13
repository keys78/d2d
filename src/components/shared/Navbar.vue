<template>
  <section>
    <div class="absolute bottom-4 left-0 w-full mt-10">
    <div class="flex item-center justify-around bg-darkBlue max-w-[300px] mx-auto rounded-md">
      <router-link to="/">
        <div class="cursor-pointer w-[150px] flex item-center justify-center py-3 rounded-md">
          <HomeIcon />
        </div>
      </router-link>
      <div class="bg-accent-2 rounded-full h-12 w-12 flex items-center justify-center -mt-6 mix-blend-color-difference absolute">
        <PlusIcon />
      </div>
      <router-link to="/transactions">
        <div class="cursor-pointer w-[150px] flex item-center justify-center py-3 rounded-md">
          <TransactionsIcon />
        </div>
      </router-link>
    </div>
  </div>
  <AddTransactionModal />
  </section>
</template>

<script setup>
import HomeIcon from "../../assets/svg/HomeIcon.vue";
import PlusIcon from "../../assets/svg/PlusIcon.vue";
import TransactionsIcon from "../../assets/svg/TransactionsIcon.vue";
import AddTransactionModal from './../modal/AddTransactionModal.vue'
</script>

<style scoped>
a.router-link-exact-active {
  background: red; border-radius: 6px;
}
</style>