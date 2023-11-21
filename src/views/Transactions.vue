<template>
  <div>
    <div class="sticky top-[70px] bg-veryDarkBlue z-10 py-2">
      <router-link to="/" title="Back To Homepage">
        <ph-arrow-left :size="28" color="#848884" />
      </router-link>
    </div>
    <Transactions :title="'Transactions'" :showTabs="true" :showListTotal="true" :transactions="transactions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Transactions from "../components/Transactions.vue";
import { useToast } from "vue-toastification";
import { useTransactionStore } from "../store/transactions";

const toast = useToast();
const transactionStore = useTransactionStore();
const transactions = ref(transactionStore.allTransactions || []);

onMounted(() => {
  transactionStore.getLocalStorageData();
  transactions.value = transactionStore.allTransactions;
});
</script>