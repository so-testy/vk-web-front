<template>
  <div v-if="!this.$store.state.products.isLoading">
    <div class="d-flex pl-5">
      <v-btn to="/" class="ma-2" elevation="0">
        <v-icon dark left> mdi-arrow-left </v-icon>Назад
      </v-btn>
    </div>
    <BasketProductList />
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

import BasketProductList from "./components/BasketProductList.vue";

export default defineComponent({
  name: "BasketPage",
  components: { BasketProductList },
  mounted() {
    this.$store.dispatch("loadProductList");
  },
  methods: {
    ...mapActions(["loadProductList"]),
  },
});
</script>
