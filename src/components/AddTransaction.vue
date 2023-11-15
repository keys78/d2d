<template>
  <h3 class="text-xl font-bold mb-4">Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="mb-4">
      <label for="title" class="block text-sm font-medium text-gray-700"
        >Title</label
      >
      <input
        type="text"
        id="title"
        placeholder="Enter transaction title"
        v-model="title"
        @blur="validateField('title')"
        class="mt-1 p-2 border rounded-md w-full"
      />
      <span v-if="!title && titleBlurred" class="text-red-500 text-xs"
        >Title is required</span
      >
    </div>
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700"
        >Description</label
      >
      <input
        type="text"
        id="description"
        placeholder="Enter transaction description"
        v-model="description"
        @blur="validateField('description')"
        class="mt-1 p-2 border rounded-md w-full"
      />
      <span
        v-if="!description && descriptionBlurred"
        class="text-red-500 text-xs"
        >Description is required</span
      >
    </div>
    <div class="mb-4">
      <label for="category" class="block text-sm font-medium text-gray-700"
        >Category</label
      >
      <select
        id="category"
        v-model="category"
        @blur="validateField('category')"
        class="mt-1 p-2 border rounded-md w-full"
      >
      <option value="">Select category</option>
        <option v-for="(category, index) in categories" :key="index" :value="category.value">
          <span class="flex items-center">
            <span v-html="getIcon(category.value, category.color)" class="mr-2"></span>
            {{ category.name }}
          </span>
        </option>
      </select>
      <span v-if="!category && categoryBlurred" class="text-red-500 text-xs"
        >Category is required</span
      >
    </div>


    <div class="mb-4">
      <label for="amount" class="block text-sm font-medium text-gray-700"
        >Amount</label
      >
      <input
        type="number"
        id="amount"
        placeholder="Enter amount"
        v-model="amount"
        @blur="validateField('amount')"
        class="mt-1 p-2 border rounded-md w-full"
      />
      <span v-if="!amount && amountBlurred" class="text-red-500 text-xs"
        >Amount is required</span
      >
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700"
        >Select transaction type</label
      >
      <div>
        <label for="income" class="inline-flex items-center">
          <input
            type="radio"
            v-model="type"
            value="income"
            id="income"
            name="transaction-type"
          />
          <span class="ml-2">Income</span>
        </label>
        <label for="expense" class="inline-flex items-center ml-6">
          <input
            type="radio"
            v-model="type"
            value="expense"
            id="expense"
            name="transaction-type"
          />
          <span class="ml-2">Expense</span>
        </label>
      </div>
      <span v-if="!type && typeBlurred" class="text-red-500 text-xs"
        >Transaction type is required</span
      >
    </div>
    <button class="btn bg-accent-3 text-white p-2 rounded-md w-full">
      Add transaction
    </button>
  </form>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { ref } from "vue";

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

const toast = useToast();

const emit = defineEmits(["transactionSubmitted"]);

const categories = [
  { name: 'Home', value: 'home', color: '#2bc021', icon: 'ph-pencil-slash' },
  { name: 'School', value: 'school', color: '#ff9900', icon: 'ph-pentagram' },
  { name: 'Church', value: 'church', color: '#663399', icon: 'ph-note-pencil' },
  { name: 'Others', value: 'others', color: '#e74c3c', icon: 'ph-linux-logo' },
  { name: 'Misc', value: 'misc', color: '#1abc9c', icon: 'ph-files' },
];


const validateField = (fieldName) => {
  switch (fieldName) {
    case "title":
      titleBlurred.value = true;
      break;
    case "description":
      descriptionBlurred.value = true;
      break;
    case "category":
      categoryBlurred.value = true;
      break;
    case "amount":
      amountBlurred.value = true;
      break;
    case "type":
      typeBlurred.value = true;
      break;
    default:
      break;
  }
};

const onSubmit = () => {
  if (!title || !amount || !type || !category) {
    toast.error("Fill all fields.");
    return;
  }

  const transactionData = {
    title,
    description,
    amount:
      type === "expense" ? -parseFloat(amount.value) : parseFloat(amount.value),
    type,
    category,
    date: new Date(),
  };

  emit("transactionSubmitted", transactionData);

  // Clear form fields
  title.value = "";
  description.value = "";
  amount.value = "";
  type.value = "";
  category.value = "";
};

const getIcon = (iconName, iconColor) => {
  return `<svg width="24" height="24" fill="${iconColor}"><use xlink:href="#${iconName}"/></svg>`;
};
</script>
