import { createStore } from "vuex";

import { userStore } from "./userStore";
import { productsStore } from "./productsStore";

// Create a new store instance.
export const store = createStore({
  modules: {
    user: userStore,
    products: productsStore,
  },
});
