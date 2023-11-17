<template>
  <div>
    <div
      :class="[
        'flex sm:flex-row flex-col sm:space-x-5 bg-veryDarkBlue',
        { 'sticky top-24 z-10 transition-all duration-200': isScrolled },
      ]"
    >
      <Balance :total="transactionStore.getTotalBalance()" />
      <IncomeExpenses
        :income="transactionStore.getIncomeTotal()"
        :expenses="transactionStore.getExpenseTotal()"
      />
    </div>
    <Transactions
      :title="'Recent'"
      :load-more-btn="true"
      :transactions="transactions?.slice(0, 5)"
    />
  </div>
</template>
  
<script setup>
import Balance from "../components/Balance.vue";
import IncomeExpenses from "../components/IncomeExpenses.vue";
import Transactions from "../components/Transactions.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useToast } from "vue-toastification";
import { useTransactionStore } from "../store/transactions";

const toast = useToast();
const transactionStore = useTransactionStore();
const transactions = ref(transactionStore.allTransactions || []);
const isScrolled = ref(false);

onMounted(() => {
  transactionStore.getLocalStorageData();
  transactions.value = transactionStore.allTransactions;
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 15;
};

window.addEventListener("scroll", handleScroll);
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
  
  