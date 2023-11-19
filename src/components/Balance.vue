<template>
  <div
    class="w-full rounded-[10px] bg-gradient-to-r from-[#292e49] via-[#292e49yarn d] to-[#536976] text-grayBlue p-4 flex flex-col items-start justify-between"
  >
    <div class="flex items-center justify-end float-right clear-right w-full">
      <Logo :width="60" />
    </div>

    <div class="font-Roboto sm:text-3xl text-2xl font-normal whitespace-nowrap sm:py-0 py-6">
      0000 XXXX XXXX 1234
    </div>

    <div class="flex items-center justify-between space-x-4 w-full">
      <h1 id="balance" class="sm:text-2xl text-xl font-normal font-Roboto text-gray-400">
        <CountUp :total="total" :animationOptions="{ duration: 2, prefix: '$', suffix: '', decimalPlaces: 2 }" />
      </h1>
      <span v-if="total < 0" class="bg-accent-3 text-xs px-2 py-1 rounded-md text-white">Overdraft</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import Logo from './../assets/svg/Logo.vue';
import GainAudio from './../assets/audio/gain.wav';
import LossAudio from './../assets/audio/loss.mp3';
import CountUp from './shared/CountUp.vue';

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
});

// Reference to audio elements
// const gainAudio = new Audio(GainAudio);
// const lossAudio = new Audio(LossAudio);

// // Watch for changes in the total and play audio accordingly
// watch(() => props.total, (newValue, oldValue) => {
//   if (newValue > oldValue) {
//     // Play gain audio when the balance increases
//     gainAudio.play();
//   } else if (newValue < oldValue) {
//     // Play loss audio when the balance decreases
//     lossAudio.play();
//   }
// });
</script>
