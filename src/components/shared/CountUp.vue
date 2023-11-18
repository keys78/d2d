<template>
  <div>
    <count-up
      :end-val="animatedTotal"
      :options="computedCountUpOptions"
      ref="countup"
    ></count-up>
  </div>
</template>
  
  <script setup>
import { ref, onMounted, watch } from "vue";
import CountUp from "vue-countup-v3";

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  animationOptions: {
    type: Object,
    default: () => ({
      prefix: "$",
      suffix: "",
      decimalPlaces: 2,
      duration: 0.2,
    }),
  },
});

const animatedTotal = ref(
  props.total < 0 ? -Math.abs(props.total) : Math.abs(props.total)
);
const countupRef = ref(null);

onMounted(() => {
  if (countupRef.value) {
    countupRef.value.start();
  }
});

watch(
  () => props.total,
  (newValue) => {
    animatedTotal.value =
      newValue < 0 ? -Math.abs(newValue) : Math.abs(newValue);
    if (countupRef.value) {
      countupRef.value.update(Math.abs(newValue));
    }
  }
);

const computedCountUpOptions = {
  ...props.animationOptions,
  startVal: props.total < 0 ? -Math.abs(props.total) : 0, // Starting value for negative balance
};
</script>
  