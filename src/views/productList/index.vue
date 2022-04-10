<template>
  <div v-if="!isLoading">
    <ProductList />
  </div>
  <div v-else class="d-flex justify-center mt-6">
    <v-progress-circular
      :size="50"
      :width="5"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

import ProductList from "./components/ProductList.vue";

export default defineComponent({
  name: "ProductListPage",
  components: { ProductList },
  computed: {
    isLoading() {
      return (
        this.$store.state.products.isUpdating ||
        this.$store.state.products.isLoading
      );
    },
  },

  mounted() {
    this.$store.dispatch("loadProductList");
  },

  methods: {
    ...mapActions(["loadProductList"]),
  },
});
</script>
