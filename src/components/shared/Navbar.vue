<template>
  <section class="h-[100px]">
    <div class="fixed -bottom-4 left-0 w-full mt-10 py-8 backdrop-blur-[2px]">
    <div class="flex item-center justify-around bg-darkBlue max-w-[300px] mx-auto rounded-md">
      <router-link to="/">
        <div class="cursor-pointer w-[150px] flex item-center justify-center py-3 rounded-md">
          <ph-house :size="28" color="#848884" />
        </div>
      </router-link>
      <div class="absolute flex flex-col items-center z-10 ">
        <div class="rounded-full h-16 w-16 bg-veryDarkBlue -mt-8"></div>
        <div 
        @click="showModal = true" 
          class="bg-accent-3 rounded-full h-12 w-12 flex items-center justify-center -mt-14 cursor-pointer">
          <ph-plus :size="28" color="#f0f0f0" :class="[showModal === true ? 'rotate-45 transition-all duration-300' : 'rotate-180 transition-all duration-300']"/>
        </div>
      </div>
      <router-link to="/transactions">
        <div class="cursor-pointer w-[150px] flex item-center justify-center py-3 rounded-md">
          <ph-coins :size="28" color="#848884" />
        </div>
      </router-link>
    </div>
  </div>
  <Modal :show="showModal"
  >
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </Modal>
  </section>
</template>

<script setup>
import { ref } from "vue"
import AddTransaction from '../AddTransaction.vue'
import Modal from '../modal/index.vue'
import { useTransactionStore } from '../../store/transactions';

const transactionStore = useTransactionStore();
const transactions = ref(transactionStore.allTransactions || []);
const showModal = ref(false);

// const openAddTransactionModal = () => {
//   showModal.value = true;
// };

const handleTransactionSubmitted = async (transactionData) => {
  await transactionStore.addTransactions(transactionData)
  setTimeout(() => {
    showModal.value = false
  }, 1000)
};
</script>



<style scoped>
a.router-link-exact-active {
  background: var(--grayBlue); border-radius: 6px; backdrop-filter: blur(20px);
}
a.router-link-exact-active svg {
  mix-blend-mode: color-dodge;
}
</style>