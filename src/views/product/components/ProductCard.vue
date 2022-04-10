<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col cols="12" sm="6" md="8">
        <v-card class="pa-2">
          <v-img class="align-end text-white" :src="product.img"> </v-img>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-card class="pa-2">
          <v-card-header>
            <v-card-header-text>
              <v-card-title>{{ product.name }}</v-card-title>
            </v-card-header-text>
          </v-card-header>
          <div class="d-flex pl-2">
            <v-chip
              class="ma-2 font-weight-bold"
              color="primary"
              label
              text-color="white"
              size="large"
            >
              <v-icon start icon="mdi-currency-rub"></v-icon>
              {{ product.price }}
            </v-chip>
            <v-chip
              v-if="product.isOut"
              class="ma-2 font-weight-bold"
              color="red"
              label
              text-color="white"
              size="large"
            >
              Товар закончился
            </v-chip>
          </div>
          <v-card-text>
            <p class="text-justify">
              {{ product.description }}
            </p>
          </v-card-text>
          <v-card-actions class="d-flex flex-row-reverse">
            <v-btn
              v-if="!productInBasket && !product.isOut"
              color="primary"
              @click="this.$store.dispatch('addProductToBasket', product.id)"
              block
            >
              Добавить в корзину
            </v-btn>
            <v-btn v-if="productInBasket" disabled block>
              Продукт в корзине
            </v-btn>
          </v-card-actions>
          <EditProductModal v-if="this.$store.state.user.isAdmin" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

import EditProductModal from "./EditProductModal.vue";

export default defineComponent({
  name: "ProductCard",
  computed: {
    product() {
      return this.$store.state.products.product || {};
    },

    productInBasket() {
      return this.$store.state.user.productsInBasket.includes(this.product.id);
    },
  },

  methods: {
    ...mapActions(["addProductToBasket"]),
  },

  components: { EditProductModal },
});
</script>
