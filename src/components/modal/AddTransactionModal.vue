<template>
  <!-- <button @click="openModal">Open Modal 1</button> -->
  <modal
  >
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
    <Loader v-if="transactionStore.loadingState" />
  </modal>
</template>

<script setup>
import Modal from "./../modal/index.vue";
import { ref, onMounted } from "vue";
import AddTransaction from "./../AddTransaction.vue";
import { useTransactionStore } from '../../store/transactions';
import { useToast } from "vue-toastification";
import Loader from '../shared/Loader.vue'


const toast = useToast();
const transactionStore = useTransactionStore();
const showAddTransactionModal = ref(false);
const transactions = ref(transactionStore.allTransactions || []);


const handleTransactionSubmitted = async (transactionData) => {
  await transactionStore.addTransactions(transactionData)
  setTimeout(() => {
    handleModalVisibility.value = false
  }, 3000)
};


</script>