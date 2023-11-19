import { defineStore } from "pinia";
import { generateUniqueId } from "../utils/helpers";
import { nextTick, computed } from "vue";
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

    getIncomeTotal() {
      return this.transactions.filter((transaction) =>
        transaction.type === "income" && transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    },

    getExpenseTotal() {
      return this.transactions.filter((transaction) =>
        transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    },

    getTotalBalance() {
      const total = this.transactions.reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0);

      return total;
    },


    addTransactions(transaction) {
      //set timeout to mimic an api respone time here
      this.isLoading = true
      setTimeout(() => {
        nextTick(() => {
          this.transactions.unshift({ ...transaction, id: generateUniqueId() })
          this.saveTransactionsToLocalStorage()
          this.isLoading = false
          toast.success("Transaction added.");
        })
      }, 1000)
    },

    editTransaction(val) {
      this.isLoading = true;
      setTimeout(() => {
        nextTick(() => {
          const index = this.transactions.findIndex(
            (transaction) => transaction.id === val.id
          );
          if (index !== -1) {
            this.transactions.splice(index, 1, val);
            this.saveTransactionsToLocalStorage();
            this.isLoading = false;
            toast.success("Transaction updated.");
          }
        })
      }, 1000)
    },


    deleteTransaction(id) {
      this.isLoading = true;
      setTimeout(() => {
        nextTick(() => {
          const index = this.transactions.findIndex(
            (transaction) => transaction.id === id
          );
          if (index !== -1) {
            this.transactions.splice(index, 1);
            this.saveTransactionsToLocalStorage();
            toast.success("Transaction deleted.");
            this.isLoading = false;
          }
        });
      }, 1000);
    },

   
    getSingleTransaction(id) {
      return this.transactions.find((transaction) => transaction.id === id);
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