<template>
    <h3>Recent Transactions</h3>
    <ul id="list" class="list">
      <li
        v-for="transaction in transactions"
        :key="transaction.id"
        :class="transaction.type === 'expense' ? 'bg-red-500' : 'bg-green-500'"
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
    },
  });
  
  const emit = defineEmits(['transactionDeleted']);
  
  const deleteTransaction = (id) => {
    emit('transactionDeleted', id);
  };
  </script>