<template>
  <h3 class="text-xl font-bold mb-4">Transaction Details</h3>
  <div v-if="selectedTransaction">
    <div class="flex items-center justify-between bg-darkBlue py-3 rounded-md px-3">
      <div class="flex items-center space-x-3">
        <div :class="[
          'border-2',
          'w-[30px]',
          'h-[30px]',
          'rounded-full',
          'flex items-center justify-center border-veryDarkBlue',
          selectedTransaction?.type === 'income'
            ? 'bg-green-600'
            : 'bg-red-500',
        ]">
          <span v-if="selectedTransaction?.category === 'home'">
            <ph-house :size="20" color="#fff" />
          </span>
          <span v-else-if="selectedTransaction?.category === 'school'">
            <ph-student :size="20" color="#fff" />
          </span>
          <span v-else-if="selectedTransaction?.category === 'office'">
            <ph-ladder :size="20" color="#fff" />
          </span>
          <span v-else-if="selectedTransaction?.category === 'religious'">
            <ph-star :size="20" color="#fff" />
          </span>
          <span v-else-if="selectedTransaction?.category === 'others'">
            <ph-asterisk :size="20" color="#fff" />
          </span>
        </div>
        <p class="font-bold text-gray-500">#{{ selectedTransaction?.id }}</p>
      </div>
      <p>{{ moment(selectedTransaction?.date).format("l") }}</p>
    </div>
    <div class="flex items-center justify-between mt-4">
      <p class="capitalize text-xl pt-4 pb-2 font-medium">
        {{ selectedTransaction?.title }}
      </p>

      <p :class="[
        'capitalize',
        'text-xl',
        'font-Roboto',
        selectedTransaction?.type === 'income'
          ? 'text-green-600'
          : 'text-red-500',
      ]">
        <CountUp :total="selectedTransaction?.amount" :animationOptions="{
          duration: 2,
          prefix: '$',
          suffix: '',
          decimalPlaces: 2,
        }" />
      </p>
    </div>
    <p class="pb-6 pt-3">{{ selectedTransaction?.description }}</p>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import moment from "moment";
import CountUp from "../components/shared/CountUp.vue";
import { useTransactionStore } from "../store/transactions";

const props = defineProps({
  transactionId: {
    type: String,
    required: true,
    default: "",
  },
});

const selectedTransaction = ref(null);
const transactionStore = useTransactionStore();

onMounted(() => {
  selectedTransaction.value = transactionStore.getSingleTransaction(
    props.transactionId
  );
});
</script>