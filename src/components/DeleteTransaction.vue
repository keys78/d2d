<template>
    <h3 class="text-xl font-bold mb-4 text-red-400">Delete transaction</h3>
    <p>
      Are you sure you want to delete transaction ID <span :class="[
          'capitalize', 'font-medium', selectedTransaction?.type === 'income'
            ? 'text-green-400'
            : 'text-red-400',
        ]">#{{ selectedTransaction?.id }}</span> ?, this action can not be reversed.
    </p>
    <div class="flex items-center justify-between pt-6">
      <button @click="handleDeleteTransaction" class="py-2 px-3 bg-red-400 text-white rounded-md ">
        <Loader v-if="transactionStore.loadingState" />
        <p class="flex items-center" v-else><ph-trash-simple :size="18" color="#E5E4E2" /> &nbsp; Delete</p>
    </button>
      <button @click="closeEditModal" class="py-2 px-3 bg-darkBlue rounded-md flex items-center"><ph-prohibit :size="18" color="#808080" /> &nbsp; Cancel</button>
    </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
import Loader from './shared/Loader.vue'
import { useTransactionStore } from "../store/transactions";

const emit = defineEmits(["update:show"]);

const props = defineProps({
  transactionId: {
    type: String,
    required: true,
    default: "",
  },
});

const selectedTransaction = ref(null);
const transactionStore = useTransactionStore();

selectedTransaction.value = transactionStore.getSingleTransaction(props.transactionId);

const closeEditModal = () => {
  emit("update:show", false); 
};

const handleDeleteTransaction = () => {
  transactionStore.deleteTransaction(props.transactionId);
  setTimeout(() => {
    closeEditModal(); 
  }, 1000);
};

</script>