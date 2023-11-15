<template>
  <div class="w-full flex sm:flex-col flex-row sm:space-x-0 space-x-5 sm:space-y-5 sm:pt-0 pt-5">
    <div class="bg-darkBlue w-full rounded-md p-4 flex items-start space-x-3">
      <ph-arrow-circle-down :size="24" color="#3aba17" />
      <div>
        <p class="text-[11px] pb-2 pt-1">Income</p>
        <p class="text-[18px] font-Roboto text-green-500">
          +{{ income.toFixed(2) }}
        </p>
      </div>
    </div>

    <div class="bg-darkBlue w-full rounded-md p-4 flex items-start space-x-3">
      <ph-arrow-circle-up :size="24" color="#e01f1f" />
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