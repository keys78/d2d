
import { createWebHistory, createRouter } from "vue-router";
import MainLayout from '../layouts/MainLayout.vue'; 


const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/transactions",
        name: "transactions",
        component: () => import("../views/Transactions.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
