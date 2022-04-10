<template>
  <div v-if="!isLoading">
    <div class="d-flex pl-5">
      <v-btn to="/" class="ma-2" elevation="0">
        <v-icon dark left> mdi-arrow-left </v-icon>Назад
      </v-btn>
    </div>
    <ProductCard />
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

import ProductCard from "./components/ProductCard.vue";

export default defineComponent({
  name: "ProductPage",
  components: { ProductCard },
  computed: {
    isLoading() {
      return (
        this.$store.state.products.isUpdating ||
        this.$store.state.products.isLoading
      );
    },
  },
  mounted() {
    this.$store.dispatch("loadProduct", this.$route.params.id);
  },
  methods: {
    ...mapActions(["loadProduct"]),
  },
});
</script>
