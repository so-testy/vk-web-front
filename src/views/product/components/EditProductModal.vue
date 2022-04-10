<template>
  <v-dialog v-model="visible" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        v-if="this.$store.state.user.isAdmin"
        block
        v-bind="attrs"
        v-on="on"
        @click="onOpenModal"
      >
        Редактировать
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Название"
                v-model="updatedProduct.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="number"
                label="Цена"
                v-model="updatedProduct.price"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="number"
                label="Количество на складе"
                v-model="updatedProduct.amount"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Ссылка на изображение"
                v-model="updatedProduct.img"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Описание"
                v-model="updatedProduct.description"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="onCancel"> Отменить </v-btn>
        <v-btn color="primary" text @click="onSubmit"> Сохранить </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "EditProductModal",

  data: () => ({
    visible: false,
    updatedProduct: {},
  }),

  computed: {
    isUpdating() {
      return this.$store.state.products.isUpdating;
    },
    product() {
      return this.$store.state.products.product || {};
    },
  },

  methods: {
    onOpenModal() {
      this.visible = true;
      this.updatedProduct = JSON.parse(JSON.stringify(this.product));
    },

    onCancel() {
      this.visible = false;
    },

    onSubmit() {
      this.$store.dispatch("updateProduct", this.updatedProduct);
      this.visible = false;
      this.$router.go();
    },

    ...mapActions(["updateProduct"]),
  },
});
</script>
