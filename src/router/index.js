
import { createWebHistory, createRouter } from "vue-router";
import MainLayout from '../layouts/MainLayout.vue'; 


const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/transactions",
        name: "Transactions",
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
