import axios from "axios";

export const userStore = {
  state: () => ({
    userId: "",
    isAdmin: true,
    productsInBasket: [],
  }),

  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },

    setIsAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    },

    setProductsInBasket(state, productsInBasket) {
      state.productsInBasket = productsInBasket;
    },
  },

  actions: {
    addProductToBasket({ commit, state, dispatch }, productId) {
      if (!state.productsInBasket.includes(productId)) {
        commit("setProductsInBasket", [...state.productsInBasket, productId]);

        axios
          .post(`/api/products/${productId}/reservation/users/${state.userId}`)
          .catch((err) => {
            console.log(err);
          });

        dispatch("saveUserDataToLS");
      }
    },

    deleteProductFromBasket({ commit, state, dispatch }, productId) {
      if (state.productsInBasket.includes(productId)) {
        const index = state.productsInBasket.indexOf(productId);

        if (index > -1) {
          commit("setProductsInBasket", [
            ...state.productsInBasket.slice(0, index),
            ...state.productsInBasket.slice(index + 1),
          ]);

          axios
            .delete(
              `/api/products/${productId}/reservation/users/${state.userId}`
            )
            .catch((err) => {
              console.log(err);
            });

          dispatch("saveUserDataToLS");
        }
      }
    },

    toggleIsAdmin({ commit, state, dispatch }) {
      commit("setIsAdmin", !state.isAdmin);

      dispatch("saveUserDataToLS");
    },

    initUserDataFromLS({ commit, dispatch }) {
      const userId = Number(localStorage.getItem("userId"));
      const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
      const productsInBasket = localStorage.getItem("productsInBasket");

      if (userId) {
        commit("setUserId", userId);
        commit("setIsAdmin", isAdmin);
        commit("setProductsInBasket", JSON.parse(productsInBasket));
      } else {
        const userId = Math.round(Math.random() * 100000);

        commit("setUserId", userId);
        commit("setIsAdmin", true);
        commit("setProductsInBasket", []);
      }

      dispatch("saveUserDataToLS");
    },

    saveUserDataToLS({ state }) {
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("isAdmin", state.isAdmin);
      localStorage.setItem(
        "productsInBasket",
        JSON.stringify(state.productsInBasket)
      );
    },
  },
};
