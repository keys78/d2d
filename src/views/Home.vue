<template>
<div :class="['flex sm:flex-row flex-col sm:space-x-5 bg-veryDarkBlue', { 'sticky top-24 z-10 transition-all duration-200': isScrolled } ]">    
    <Balance :total="total" />
    <IncomeExpenses :income="income" :expenses="expenses" />
  </div>
  <Transactions
    :title="'Recent'"
    :load-more-btn="true"
    :transactions="transactions?.slice(0, 5)"
    @transactionDeleted="handleTransactionDeleted"
  />
</template>
  
  <script setup>
import Balance from "../components/Balance.vue";
import IncomeExpenses from "../components/IncomeExpenses.vue";
import Transactions from "../components/Transactions.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useToast } from "vue-toastification";
import { useTransactionStore } from '../store/transactions'

const toast = useToast();
const transactionStore = useTransactionStore();
const transactions = ref(transactionStore.allTransactions || []);
const isScrolled = ref(false);

onMounted(() => {
  transactionStore.getLocalStorageData()
  transactions.value = transactionStore.allTransactions
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 15;
};

window.addEventListener('scroll', handleScroll);
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});



// Get total
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});

// Get income
const income = computed(() => {
  return transactions.value
    .filter(
      (transaction) => transaction.type === "income" && transaction.amount > 0
    )
    .reduce((acc, transaction) => acc + transaction.amount, 0);
});

// Get expenses
const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
});

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id
  );

  saveTransactionsToLocalStorage();

  toast.success("Transaction deleted.");
};

// Saving transactions to local storage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
</script>
  
  