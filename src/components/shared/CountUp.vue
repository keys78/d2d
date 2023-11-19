<template>
  <div>
    <div v-if="animatedTotal >= 0">
      <count-up
        :end-val="animatedPositiveTotal"
        :options="computedPositiveCountUpOptions"
        ref="positiveCountup"
      ></count-up>
    </div>
    <div v-else>
      <count-up
        :end-val="animatedNegativeTotal"
        :options="computedNegativeCountUpOptions"
        ref="negativeCountup"
      ></count-up>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from "vue";
import CountUp from "vue-countup-v3";

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
});

const animatedTotal = ref(props.total);
const animatedPositiveTotal = ref(Math.max(0, props.total));
const animatedNegativeTotal = ref(Math.min(0, props.total));
const positiveCountupRef = ref(null);
const negativeCountupRef = ref(null);

onMounted(() => {
  if (props.total >= 0 && positiveCountupRef.value) {
    positiveCountupRef.value.start();
  } else if (props.total < 0 && negativeCountupRef.value) {
    negativeCountupRef.value.start();
  }
});

watch(
  () => props.total,
  (newValue) => {
    animatedTotal.value = newValue;
    if (newValue >= 0) {
      animatedPositiveTotal.value = newValue;
      if (positiveCountupRef.value) {
        positiveCountupRef.value.update(newValue);
      }
    } else {
      animatedNegativeTotal.value = newValue;
      if (negativeCountupRef.value) {
        negativeCountupRef.value.update(newValue);
      }
    }
  }
);

const computedPositiveCountUpOptions = {
  prefix: "$",
  suffix: "",
  decimalPlaces: 2,
  duration: 1, 
  startVal: 0,
};

const computedNegativeCountUpOptions = {
  prefix: "$",
  suffix: "",
  decimalPlaces: 2,
  duration: 1, 
  startVal: 0,
  useEasing: true, 
};
</script>
