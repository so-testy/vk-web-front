import { createRouter, createWebHashHistory } from "vue-router";

import ProductListPage from "../views/productList/index.vue";
import ProductPage from "../views/product/index.vue";
import BasketPage from "../views/basket/index.vue";

const routes = [
  {
    path: "/",
    name: "ProductListPage",
    component: ProductListPage,
    meta: { transition: "fade" },
  },
  {
    path: "/basket",
    name: "BasketPage",
    component: BasketPage,
    meta: { transition: "fade" },
  },
  {
    path: "/products/:id",
    name: "ProductPage",
    component: ProductPage,
    meta: { transition: "fade" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
