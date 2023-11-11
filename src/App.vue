<template>
    <Header />
    <div class="container">
        <Balance :total="total" />
        <IncomeExpenses :income="income" :expenses="expenses" />
        <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
        <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
    </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';

import { ref, computed, onMounted } from 'vue';

import { useToast } from 'vue-toastification';

const toast = useToast();

const transactions = ref([]);

onMounted(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

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
    .filter((transaction) => transaction.type === "income" && transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
});

// Get expenses
const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.type === "expense" && transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
});



// Submit transaction
const handleTransactionSubmitted = (transactionData) => {
    transactions.value.push({
        id: generateUniqueId(),
        text: transactionData.text,
        amount: transactionData.amount,
        type: transactionData.type,
        date: transactionData.date
    });

    saveTransactionsToLocalStorage();

    toast.success('Transaction added.');
};

// Generate unique ID
function generateUniqueId() {
    let id = ''
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    id += letters.charAt(Math.floor(Math.random() * letters.length))
    id += letters.charAt(Math.floor(Math.random() * letters.length))
    id += String(Math.random()).slice(2, 6)
    return id
}

// Delete transaction
const handleTransactionDeleted = (id) => {
    transactions.value = transactions.value.filter(
        (transaction) => transaction.id !== id
    );

    saveTransactionsToLocalStorage();

    toast.success('Transaction deleted.');
};

// Save transactions to local storage
const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
};
</script>




