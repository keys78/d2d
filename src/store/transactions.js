import { defineStore } from "pinia";
import { generateUniqueId } from "../utils/helpers";
import { nextTick } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast()

export const useTransactionStore = defineStore("transactions", {
  state: () => ({
    transactions: [],
    isLoading: false,
  }),

  actions: {
    saveTransactionsToLocalStorage() {
      localStorage.setItem("transactions", JSON.stringify(this.transactions));
    },

    getLocalStorageData() {
      const transactionData = JSON.parse(localStorage.getItem("transactions"));
      if (transactionData) {
        this.transactions = transactionData
      }
    },

    addTransactions(transaction) {
      this.isLoading = true
      setTimeout(() => {
        nextTick(() => {
          this.transactions.unshift({ ...transaction, id: generateUniqueId() })
          this.saveTransactionsToLocalStorage()
          this.isLoading = false
          toast.success("Transaction added.");
        })
      }, 3000)
    },

  },


  getters: {
    allTransactions: (state) => {
      return state.transactions
    },
    loadingState: (state) => {
      return state.isLoading
    }
  }
});