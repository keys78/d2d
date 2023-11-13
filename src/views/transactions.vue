<template>
  <div>
    <RecentTransactions
      :title="'All Transactions'"
      :transactions="transactions"
      @transactionDeleted="handleTransactionDeleted"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RecentTransactions from "../components/Transactions.vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const transactions = ref([]);

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem("transactions"));

  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
});

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id
  );

  saveTransactionsToLocalStorage();

  toast.success("Transaction deleted.");
};

const saveTransactionsToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
</script>