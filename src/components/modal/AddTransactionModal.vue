<template>
  <!-- <button @click="openModal">Open Modal 1</button> -->
  <modal
  
    :show="show" @update:show="handleModalVisibility"
  >
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </modal>
</template>

<script setup>
import Modal from "./../modal/index.vue";
import { ref, onMounted } from "vue";
import AddTransaction from "./../AddTransaction.vue";

const handleModalVisibility = ref('')
const show = ref('')
const showAddTransactionModal = ref(false);

const openModal = () => {
  showAddTransactionModal.value = true;
};


import { useToast } from "vue-toastification";

const toast = useToast();

const transactions = ref([]);

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem("transactions"));

  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
});

const handleTransactionSubmitted = (transactionData) => {
  transactions.value.unshift({
    id: generateUniqueId(),
    title: transactionData.title,
    description: transactionData.description,
    category: transactionData.category,
    amount: transactionData.amount,
    type: transactionData.type,
    date: transactionData.date,
  });

  saveTransactionsToLocalStorage();

  toast.success("Transaction added.");
};

// Generate unique ID
function generateUniqueId() {
  let id = "";
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  id += letters.charAt(Math.floor(Math.random() * letters.length));
  id += letters.charAt(Math.floor(Math.random() * letters.length));
  id += String(Math.random()).slice(2, 6);
  return id;
}

const saveTransactionsToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
</script>



  <!-- :show="showAddTransactionModal"
    @update:show="showAddTransactionModal = $event" -->