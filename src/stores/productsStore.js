import axios from "axios";

export const productsStore = {
  state: () => ({
    isLoading: false,
    isUpdating: false,
    product: {},
    productList: [],
  }),

  mutations: {
    setProduct(state, product) {
      state.product = product;
    },

    setProductList(state, productList) {
      state.productList = productList;
    },

    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },

    setIsUpdating(state, isUpdating) {
      state.isUpdating = isUpdating;
    },
  },

  actions: {
    loadProduct({ commit }, productId) {
      commit("setIsLoading", true);

      axios
        .get(`/api/products/${productId}`)
        .then((res) => {
          commit("setProduct", res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          commit("setIsLoading", false);
        });
    },

    loadProductList({ commit }) {
      commit("setIsLoading", true);

      axios
        .get("/api/products")
        .then((res) => {
          commit("setProductList", res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          commit("setIsLoading", false);
        });
    },

    updateProduct({ commit }, product) {
      commit("setIsUpdating", true);

      axios
        .put(`/api/products/${product.id}`, product)
        .then((res) => {
          commit("setProduct", res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          commit("setIsUpdating", false);
        });
    },

    updateProductList({ commit }, productList) {
      commit("setIsUpdating", true);

      axios
        .put(`/api/products`, productList)
        .then((res) => {
          commit("setProductList", res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          commit("setIsUpdating", false);
        });
    },
  },
};
