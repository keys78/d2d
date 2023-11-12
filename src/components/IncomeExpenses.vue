<template>
  <div class="w-full flex flex-col space-y-5">
    <div class="bg-darkBlue w-full rounded-md p-4 flex items-start space-x-3">
      <div class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-green-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <p class="text-[11px] pb-2 pt-1">Income</p>
        <p class="text-[18px] font-Roboto text-green-500">
          +{{ income.toFixed(2) }}
        </p>
      </div>
    </div>

    <div class="bg-darkBlue w-full rounded-md p-4 flex items-start space-x-3">
      <div class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-red-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <h4 class="text-[11px] pb-2 pt-1">Expense</h4>
        <p class="text-[18px] font-Roboto text-red-500">
          {{ expenses.toFixed(2) }}
        </p>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
import { defineProps } from "vue";
import { BeakerIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  income: {
    type: Number,
    required: true,
  },
  expenses: {
    type: Number,
    required: true,
  },
});
</script>