<!-- <template>
  <div class="w-full flex sm:flex-col flex-row sm:space-x-0 space-x-5 sm:space-y-5 sm:pt-0 pt-5">
    <div class="bg-darkBlue w-full rounded-md p-4 flex items-start space-x-3">
      <ph-arrow-circle-down :size="24" color="#3aba17" />
      <div>
        <p class="text-[11px] pb-2 pt-1">Income</p>
        <p class="sm:text-[18px] text-[15px] font-Roboto text-green-500">
          {{ formatAmount(income) }}
        </p>
      </div>
    </div>

    <div class="bg-darkBlue w-full rounded-md p-4 flex items-start space-x-3">
      <ph-arrow-circle-up :size="24" color="#e01f1f" />
      <div>
        <h4 class="text-[11px] pb-2 pt-1">Expense</h4>
        <p class="sm:text-[18px] text-[15px] font-Roboto text-red-500">
          {{ formatAmount(expenses) }}
        </p>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
import { defineProps } from "vue";

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

const formatAmount = (value) => {
  const formattedValue = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${value < 0 ? '-' : ''}$${formattedValue}`;
};
</script> -->


<template>
  <div class="w-full flex sm:flex-col flex-row sm:space-x-0 space-x-5 sm:space-y-5 sm:pt-0 pt-5">
    <div class="bg-darkBlue w-full rounded-md p-4 flex items-start space-x-3">
      <ph-arrow-circle-down :size="24" color="#3aba17" />
      <div class="font-Roboto text-[#3aba17]">
        <p class="text-[11px] pb-2 pt-1 text-paleBlue">Income</p>
        <CountUp :total="income" :animationOptions="{ duration: 2, prefix: '$', suffix: '', decimalPlaces: 2 }" />
      </div>
    </div>

    <div class="bg-darkBlue w-full rounded-md p-4 flex items-start space-x-3">
      <ph-arrow-circle-up :size="24" color="#e01f1f" />
      <div class="font-Roboto text-red-500">
        <h4 class="text-[11px] pb-2 pt-1 text-paleBlue">Expense</h4>
        <CountUp :total="expenses" :animationOptions="{ duration: 2, prefix: '$', suffix: '', decimalPlaces: 2 }" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import CountUp from "./shared/CountUp.vue";

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
