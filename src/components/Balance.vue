<template>
  <div
    class="w-full rounded-[10px] bg-gradient-to-r from-[#292e49] via-[#292e49yarn d] to-[#536976] text-grayBlue p-4 flex flex-col items-start justify-between"
  >
    <div class="flex items-center justify-end float-right clear-right w-full">
      <Logo :width="60" />
    </div>

    <div class="font-Roboto text-3xl font-normal whitespace-nowrap">
      0000 XXXX XXXX 1234
    </div>

    <div class="flex items-center justify-between space-x-4 w-full">
      <h1
        id="balance"
        class="text-2xl font-normal font-Roboto"
      >
        {{ total < 0 ? '-' : '' }}${{
          Math.abs(total).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        }}
      </h1>
      <span
        v-if="total < 0"
        class="bg-burgundy px-2 py-1 rounded-md text-white"
      >Overdraft</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Logo from './../assets/svg/Logo.vue';

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
});
</script>
