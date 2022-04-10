<template>
  <v-container class="grey lighten-5">
    <EditProductListModal v-if="this.$store.state.user.isAdmin" />
    <v-row>
      <v-col
        v-for="product in this.showedProductList"
        :key="product.id"
        cols="12"
        sm="12"
        md="3"
      >
        <v-card class="pa-2" outlined tile>
          <v-img
            class="align-end text-white"
            height="250"
            :src="product.img"
            cover
          >
          </v-img>

          <v-card-header>
            <v-card-header-text>
              <v-card-title>{{ product.name }}</v-card-title>
            </v-card-header-text>
          </v-card-header>

          <div class="d-flex">
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
              Закончился
            </v-chip>
          </div>
          <v-card-actions class="d-flex flex-row-reverse">
            <v-btn color="primary" @click="toProductPage(product.id)">
              Перейти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import EditProductListModal from "./EditProductListModal.vue";

export default defineComponent({
  name: "ProductList",
  computed: {
    showedProductList() {
      return this.$store.state.products.productList.filter(
        (product) => product.show
      );
    },
  },
  methods: {
    toProductPage(productId) {
      this.$router.push({ path: `/products/${productId}` });
    },
  },
  components: { EditProductListModal },
});
</script>
