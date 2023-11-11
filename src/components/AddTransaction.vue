<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
        <label for="text">Text</label>
        <input type="text" id="text" placeholder="Enter transaction name" v-model="text" />
        <span>transaction </span>
      </div>
      <div class="form-control">
        <label for="amount"
          >Amount <br />
          </label
        >
        <input
          type="number"
          id="amount"
          placeholder="Enter amount"
          v-model="amount"
        />
      </div>
    <div>
      <label for="expense-type">Select transaction type</label>
      <input type="radio" v-model="type" value="income" name="transaction-type"> income
      <input type="radio" v-model="type" value="expense" name="transaction-type"> expense
    </div>
    <button class="btn">Add transaction</button>
  </form>
</template>

<script setup>
import { useToast } from 'vue-toastification';
import { ref } from 'vue';

const text = ref('');
const amount = ref('');
const type = ref('');

const toast = useToast();

const emit = defineEmits(['transactionSubmitted']);

const onSubmit = () => {
  if (!text.value || !amount.value || !type.value) {
    toast.error('Fill all fields.');
    return;
  }

  const transactionData = {
    text: text.value,
    amount: type.value === "expense" ? -parseFloat(amount.value) : parseFloat(amount.value),
    type: type.value,
    date: new Date()
  };

  emit('transactionSubmitted', transactionData);

  // Clear form fields
  text.value = '';
  amount.value = '';
  type.value = ''; 
};

</script>

