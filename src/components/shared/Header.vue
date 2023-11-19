<template>
  <header class="shadow py-3 !fixed top-0 w-full bg-veryDarkBlue">
    <section class=" s-767:px-20 px-4">
      <div class="flex items-center justify-between max-w-[600px] mx-auto">
        <Logo :width="100" :height="50"/>
        <div class="cursor-pointer" @click="toggleSound">
          <span v-if="soundOn"><ph-speaker-slash :size="24" color="#828FA3" /></span>
          <span v-else><ph-speaker-high :size="24" color="#828FA3" /></span>
        </div>
        <ToggleSwitch />
      </div>
    </section>
  </header>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import ToggleSwitch from "../ui/ToggleSwitch.vue";
import GainAudio from '../../assets/audio/gain.wav';
import LossAudio from '../../assets/audio/loss.mp3';
import Logo from "../../assets/svg/Logo.vue";
import { useTransactionStore } from '../../store/transactions';


const transactionStore = useTransactionStore();

const gainAudio = new Audio(GainAudio);
const lossAudio = new Audio(LossAudio);
const storedSound = localStorage.getItem('soundOn');
const soundOn = ref(storedSound !== null ? JSON.parse(storedSound) : true);

const totalBalance = computed(() => transactionStore.getTotalBalance());

const toggleSound = () => {
  soundOn.value = !soundOn.value;
  localStorage.setItem('soundOn', JSON.stringify(soundOn.value)); 
};

let soundWatcher = null;

// Watching for changes in soundOn and update local storage
watch(soundOn, (newValue) => {
  localStorage.setItem('soundOn', JSON.stringify(newValue));

  if (newValue && !soundWatcher) {
    soundWatcher = watch(totalBalance, (newVal, oldVal) => {
      if (newValue && newVal > oldVal) {
        gainAudio.play();
      } else if (newValue && newVal < oldVal) {
        lossAudio.play();
      }
    });
  } else if (!newValue && soundWatcher) {
    soundWatcher();
    soundWatcher = null;
    gainAudio.pause();
    gainAudio.currentTime = 0;
    lossAudio.pause();
    lossAudio.currentTime = 0;
  }
});

// Initialize audio based on initial soundOn status after mounted
onMounted(() => {
  if (soundOn.value) {
    soundWatcher = watch(totalBalance, (newVal, oldVal) => {
      if (newVal > oldVal) {
        gainAudio.play();
      } else if (newVal < oldVal) {
        lossAudio.play();
      }
    });
  }
});
</script>