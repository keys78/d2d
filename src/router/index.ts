import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/index.vue'
import Transactions from '../views/transactions.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    },
  ]
})

export default router