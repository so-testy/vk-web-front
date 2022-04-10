<template>
  <v-dialog v-model="visible" persistent max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex flex-row-reverse pb-6">
        <v-btn
          color="primary"
          v-if="this.$store.state.user.isAdmin"
          v-bind="attrs"
          v-on="on"
          @click="onOpenModal"
        >
          Редактировать
        </v-btn>
      </div>
    </template>
    <v-card>
      <draggable
        v-model="updatedProductList"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <v-list-item>
            <v-list-item-content>
              <div class="d-flex pl-2">
                <v-img
                  height="100"
                  class="rounded-lg"
                  :src="element.img"
                  contain
                  width="100"
                ></v-img>

                <div class="pl-6">
                  <v-card-header-text>
                    <v-card-title>{{ element.name }}</v-card-title>
                  </v-card-header-text>

                  <div class="d-flex pl-2">
                    <v-chip
                      class="ma-2 font-weight-bold"
                      color="primary"
                      label
                      text-color="white"
                    >
                      <v-icon start icon="mdi-currency-rub"></v-icon>
                      {{ element.price }}
                    </v-chip>
                  </div>
                </div>
              </div>
            </v-list-item-content>

            <v-spacer></v-spacer>

            <v-list-item-action class="ml-6 pr-5">
              <v-switch
                color="primary"
                label="Доступеность"
                v-model="element.show"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
        </template>
      </draggable>
    </v-card>
    <v-footer>
      <v-spacer></v-spacer>
      <v-btn text @click="onCancel"> Отменить </v-btn>
      <v-btn color="primary" class="ml-4" text @click="onSubmit">
        Сохранить
      </v-btn>
    </v-footer>
  </v-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import draggable from "vuedraggable";

export default defineComponent({
  name: "EditProductListModal",

  data: () => ({
    drag: false,
    visible: false,
    updatedProductList: [],
  }),

  computed: {
    isUpdating() {
      return this.$store.state.products.isUpdating;
    },
  },

  methods: {
    onOpenModal() {
      this.visible = true;
      this.updatedProductList = JSON.parse(
        JSON.stringify(this.$store.state.products.productList)
      );
    },

    onCancel() {
      this.visible = false;
    },

    onSubmit() {
      this.visible = false;
      this.$store.dispatch("updateProductList", this.updatedProductList);
      this.$router.go();
    },

    ...mapActions(["updateProductList"]),
  },

  components: {
    draggable,
  },
});
</script>
