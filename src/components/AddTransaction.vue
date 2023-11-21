<template>
  <h3 class="text-xl font-bold mb-4">Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <Input label="Title" placeholder="Enter transaction title" :value="title" id="title" @update:value="title = $event" />
    <Textarea label="Description" placeholder="Enter a description" :value="description" id="description"
      @update:value="description = $event" />

    <div class="mb-4">
      <label for="category" class="block text-sm font-medium text-paleBlue">Category</label>
      <select id="category" v-model="category" @blur="validateField('category')"
        class="mt-1 p-2 border rounded-md w-full bg-darkBlue border-darkBlue">
        <option value="">Select category</option>
        <option v-for="(category, index) in categories" :key="index" :value="category.value">
          <span class="flex items-center">
            {{ category.name }}
          </span>
        </option>
      </select>
      <span v-if="!category && categoryBlurred" class="text-red-500 text-xs">Category is required</span>
    </div>

    <Input label="Amount" placeholder="Enter amount" type="text" :value="amount" id="amount"
      @update:value="amount = $event" />

    <div class="mb-10">
      <label class="block text-sm font-medium text-paleBlue pb-2">Select transaction type</label>
      <div>
        <label for="income" class="inline-flex items-center">
          <input type="radio" v-model="type" value="income" id="income" name="transaction-type" />
          <span class="ml-2">Income</span>
        </label>
        <label for="expense" class="inline-flex items-center ml-6">
          <input type="radio" v-model="type" value="expense" id="expense" name="transaction-type" />
          <span class="ml-2">Expense</span>
        </label>
      </div>
      <span v-if="!type && typeBlurred" class="text-red-500 text-xs">Transaction type is required</span>
    </div>
    <button class="btn bg-accent-3 text-white p-2 rounded-md w-full flex items-center justify-center">
      <Loader v-if="transactionStore.loadingState" />
      <p v-else>Add Transaction</p>
    </button>
  </form>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { ref } from "vue";
import Input from "./shared/Input.vue";
import Textarea from "./shared/Textarea.vue";
import { useTransactionStore } from "../store/transactions";
import Loader from "./shared/Loader.vue";

const transactionStore = useTransactionStore();
const emit = defineEmits(["transactionSubmitted"]);
const toast = useToast();

const title = ref("");
const amount = ref("");
const type = ref("");
const description = ref("");
const category = ref("");
const titleBlurred = ref(false);
const descriptionBlurred = ref(false);
const categoryBlurred = ref(false);
const amountBlurred = ref(false);
const typeBlurred = ref(false);

const categories = [
  { name: "Home", value: "home" },
  { name: "School", value: "school" },
  { name: "Office", value: "office" },
  { name: "Religious", value: "religious" },
  { name: "Others", value: "others" },
];

const validateField = (fieldName) => {
  switch (fieldName) {
    case "category":
      categoryBlurred.value = true;
      break;
    case "type":
      typeBlurred.value = true;
      break;
    default:
      break;
  }
};

const onSubmit = () => {
  if (!title.value || !description.value || !amount.value || !type.value || !category.value) {
    toast.error("All field must be filled.");
    return;
  }

  // handling input when its a number and you want to use decximal wirhin
  const parsedAmount = parseFloat(amount.value);
  if (isNaN(parsedAmount)) {
    toast.error("Please enter a valid amount.");
    return;
  }

  const transactionData = {
    title: title.value,
    description: description.value,
    amount:
      type.value === "expense"
        ? -parseFloat(amount.value)
        : parseFloat(amount.value),
    type: type.value,
    category: category.value,
    date: new Date(),
  };

  emit("transactionSubmitted", transactionData);

};
</script>