<template>
  <div class="flex items-center justify-between pt-10 pb-4">
    <h3>{{ title }}</h3>
    <a v-if="loadMoreBtn" href="/transactions">View all</a>
  </div>

  <ul v-if="transactions.length > 0">
    <li
      v-for="transaction in transactions"
      :key="transaction.id"
      class=" flex items-center group overflow-x-hidden mb-4 hover:cursor-pointer sm:text-[16px] text-[14px]"
    >
      <aside class="w-full group-hover:-ml-[140px] transition-all duration-300 grid sm:grid-cols-8 grid-cols-11 items-center justify-between py-3 px-3 bg-darkBlue rounded-l-md">
        <span class="sm:col-span-2 col-span-3 font-bold text-gray-500"> #{{ transaction?.id }}</span>
        <span class="sm:col-span-2 col-span-3"> {{ moment(transaction?.date).format('l') }}</span>
        <span class="sm:col-span-3 col-span-3">{{ characterLimit(transaction?.title, computedLimit) }}</span>
        <span class="sm:col-span-1 col-span-2" :class="transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'" >
          {{ formattedAmount(transaction.amount, transaction.type) }}
        </span>
      </aside>
      
      <aside class="flex items-center -mr-[140px] transition-all duration-300">
        <button class="p-[13px] bg-grayBlue" @click="showTransactionInfo(transaction?.id)"><ph-info :size="20" color="#E5E4E2" /></button>
        <button class="p-[13px] bg-orange-400"><ph-note-pencil :size="20" color="#E5E4E2" /></button>
        <button class="p-[13px] bg-burgundy rounded-r-md" @click="deleteTransaction(transaction?.id)"><ph-trash-simple :size="20" color="#E5E4E2" /></button>
      </aside>
    </li>
  </ul>

  <p v-else>No transactions available.</p>
</template>

<script setup>
import { defineProps, defineEmits, ref, watchEffect, onMounted } from "vue";
import moment from 'moment'
import { characterLimit } from '../utils/helpers'

const computedLimit = ref(window.innerWidth > 767 ? 20 : 10);

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
    default: () => [],
  },
  title: {
    type: String,
    required: true,
    default: "Transactions",
  },
  loadMoreBtn: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["transactionDeleted"]);

const deleteTransaction = (id) => {
  emit("transactionDeleted", id);
};


const handleResize = () => {
  computedLimit.value = window.innerWidth > 767 ? 20 : 10;
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

const formattedAmount = (amount, type) => {
  const formatted = new Intl.NumberFormat().format(Math.abs(amount).toFixed(2));
  return type === 'expense' ? `-$${formatted}` : `$${formatted}`;
};


</script>