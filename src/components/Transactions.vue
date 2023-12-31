<template>
  <section>
    <div :class="['flex items-center justify-between', !showListTotal ? 'pt-10 pb-4' : 'pb-4']">
      <h3 class="font-medium">{{ title }} <span v-if="showListTotal">({{ filteredTransactions?.length }})</span></h3>
      <router-link to="/transactions"><span class="" v-if="loadMoreBtn">View all</span> </router-link>
    </div>


    <span v-if="showTabs">
      <Tabs :filterTransactions="filterTransactions" />
      <span>
        <SearchFilter :filteredTransactions="filteredTransactions" @updateSearch="handleSearch" />
        <Chart :filteredTransactions="filteredTransactions" />
      </span>
    </span>


    <TransitionGroup name="list" tag="ul" v-if="filteredTransactions.length > 0">
      <li v-for="transaction in filteredTransactions" :key="transaction.id"
        class=" flex items-center group overflow-x-hidden mb-4 hover:cursor-pointer sm:text-[16px] text-[14px] shadow">
        <aside
          class="w-full group-hover:-ml-[140px] transition-all duration-300 grid sm:grid-cols-8 grid-cols-11 items-center justify-between py-3 px-3 bg-darkBlue rounded-l-md">
          <span class="sm:col-span-2 col-span-3 font-bold text-gray-500"> #{{ transaction?.id }}</span>
          <span class="sm:col-span-2 col-span-3"> {{ moment(transaction?.date).format('l') }}</span>
          <span class="sm:col-span-3 col-span-3">{{ characterLimit(transaction?.title, computedLimit) }}</span>
          <span class="sm:col-span-1 col-span-2"
            :class="transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'">
            {{ formattedAmount(transaction.amount, transaction.type) }}
          </span>
        </aside>

        <aside class="flex items-center -mr-[140px] transition-all duration-300">
          <button class="p-[13px] bg-grayBlue" @click="handleOpenDetailsModal(transaction?.id)"><ph-info :size="20"
              color="#E5E4E2" /></button>
          <button class="p-[13px] bg-orange-400" @click="handleShowEditModal(transaction?.id)"><ph-note-pencil :size="20"
              color="#E5E4E2" /></button>
          <button class="p-[13px] bg-burgundy rounded-r-md"
            @click="handleOpenDeleteModal(transaction?.id)"><ph-trash-simple :size="20" color="#E5E4E2" /></button>
        </aside>
      </li>
    </TransitionGroup>
    <p v-else-if="!searchTerm.trim() && transactions.length === 0">No transactions available.</p>
    <p v-else>No matching transactions found.</p>


    <!-- Interactive Modals  -->
    <Modal :show="showDetailsModal" @update:show="showDetailsModal = $event">
      <TransactionDetails :transactionId="transactionId" />
    </Modal>

    <Modal :show="showEditModal" @update:show="showEditModal = $event">
      <EditTransaction :transactionId="transactionId" @update:show="showEditModal = $event" />
    </Modal>

    <Modal :show="showDeleteModal" @update:show="showDeleteModal = $event">
      <DeleteTransaction :transactionId="transactionId" @update:show="showDeleteModal = $event" />
    </Modal>
    
  </section>
</template>

<script setup>
import { defineProps, defineEmits, ref, watchEffect, onMounted, computed } from "vue";
import moment from 'moment';
import Modal from '../components/modal/index.vue';
import CountUp from "./shared/CountUp.vue";
import { characterLimit, formattedAmount } from '../utils/helpers';
import { useTransactionStore } from "../store/transactions";
import TransactionDetails from "./TransactionDetails.vue";
import EditTransaction from "./EditTransaction.vue";
import DeleteTransaction from "./DeleteTransaction.vue";
import Tabs from '../components/ui/Tabs.vue'
import SearchFilter from '../components/ui/SearchFilter.vue'
import Chart from '../components/ui/Chart.vue'


onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});
const handleResize = () => {
  computedLimit.value = window.innerWidth > 767 ? 20 : 10;
};
const computedLimit = ref(window.innerWidth > 767 ? 20 : 10);


const transactionStore = useTransactionStore();
const showDeleteModal = ref(false);
const showDetailsModal = ref(false);
const showEditModal = ref(false);
const transactionId = ref('')
const activeTab = ref('all');
const searchTerm = ref('');


const handleOpenDeleteModal = (id) => {
  showDeleteModal.value = true;
  transactionId.value = id
};

const handleOpenDetailsModal = (id) => {
  showDetailsModal.value = true;
  transactionId.value = id
};

const handleShowEditModal = (id) => {
  showEditModal.value = true;
  transactionId.value = id
};


const handleCloseDeleteModal = () => {
  showDeleteModal.value = false;
};


const props = defineProps({
  transactions: {
    type: Array,
    required: true,
    default: () => [],
  },
  title: {
    type: String,
    required: true,
    default: "Transactions",
  },
  showTabs: {
    type: Boolean,
    required: false,
    default: false,
  },
  showListTotal: {
    type: Boolean,
    required: false,
    default: false,
  },
  loadMoreBtn: {
    type: Boolean,
    required: false,
    default: false,
  },
});




const filterTransactions = (tab) => {
  activeTab.value = tab;
};


const handleSearch = (value) => {
  searchTerm.value = value.toLowerCase();
};

const filteredTransactions = computed(() => {
  let filtered = props.transactions;

  if (searchTerm.value.trim() !== '') {
    filtered = filtered.filter(transaction =>
      transaction.title.toLowerCase().includes(searchTerm.value)
    );
  }

  if (activeTab.value === 'income') {
    return filtered.filter(transaction => transaction.type === 'income');
  } else if (activeTab.value === 'expense') {
    return filtered.filter(transaction => transaction.type === 'expense');
  }

  return filtered;
});
</script>


<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>