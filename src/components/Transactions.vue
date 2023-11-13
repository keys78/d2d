<template>
   <div>
    <h3>{{ title }}</h3>
    <a v-if="loadMoreBtn" href="/transactions">View all</a>
   </div>
    <ul>
      <li
        v-for="transaction in transactions"
        :key="transaction.id"
        :class="transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'"
      >
      {{ transaction?.id }} {{ transaction?.date }} {{ transaction?.text }} <span>${{ transaction?.amount }}</span
        ><button class="delete-btn" @click="deleteTransaction(transaction?.id)">
          x
        </button>
      </li>
    </ul>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    transactions: {
      type: Array,
      required: true,
      default: () => []
    },
    title: {
      type: String,
      required: true,
      default: "Transactions"
    },
    loadMoreBtn: {
      type: Boolean,
      required: false,
      default: false
    }
  });
  
  const emit = defineEmits(['transactionDeleted']);
  
  const deleteTransaction = (id) => {
    emit('transactionDeleted', id);
  };
  </script>