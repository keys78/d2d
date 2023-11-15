<template>
  <div class="flex sm:flex-row flex-col sm:space-x-5 sticky top-0 pt-20">
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
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const transactions = ref([]);

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem("transactions"));

  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
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
  
  