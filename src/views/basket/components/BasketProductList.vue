<template>
  <v-container class="grey lighten-5">
    <v-list-item v-for="product in productInBasket" :key="product.id">
      <v-list-item-content>
        <div class="d-flex pl-2">
          <v-img
            height="100"
            class="rounded-lg"
            :src="product.img"
            contain
            width="100"
          ></v-img>

          <div class="pl-6">
            <v-card-header-text>
              <v-card-title>{{ product.name }}</v-card-title>
            </v-card-header-text>

            <div class="d-flex pl-2">
              <v-chip
                class="ma-2 font-weight-bold"
                color="primary"
                label
                text-color="white"
              >
                <v-icon start icon="mdi-currency-rub"></v-icon>
                {{ product.price }}
              </v-chip>
            </div>
          </div>
        </div>
      </v-list-item-content>

      <v-spacer></v-spacer>

      <v-list-item-action>
        <v-btn
          icon
          depressed
          @click="this.$store.dispatch('deleteProductFromBasket', product.id)"
        >
          <v-icon color="primary">mdi-delete-forever</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <p v-if="this.isEmptyBasket" class="text-justify">Ваша корзана пустая</p>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "BasketProductList",
  computed: {
    productInBasket() {
      const {
        user: { productsInBasket },
        products: { productList },
      } = this.$store.state;

      return productList.filter((product) =>
        productsInBasket.includes(product.id)
      );
    },
    isEmptyBasket() {
      return this.productInBasket.length === 0;
    },
  },
  methods: {
    ...mapActions(["deleteProductFromBasket"]),
  },
});
</script>
