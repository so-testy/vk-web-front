<template>
  <v-app>
    <v-navigation-drawer permanent position="left">
      <template v-slot:prepend>
        <v-list-item
          two-line
          title="Пользователь"
          :subtitle="`#${this.$store.state.user.userId}`"
        ></v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item value="showcase" to="/">
          <v-list-item-icon>mdi-bulletin-board</v-list-item-icon>
          <v-list-item-content class="pl-6">
            <v-list-item-title>Витрина</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item value="basket" to="/basket"
          ><v-badge :content="countProductInBasket">
            <v-list-item-icon>mdi-basket</v-list-item-icon></v-badge
          >
          <v-list-item-content class="pl-6">
            <v-list-item-title>Корзина</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-container class="px-10" fluid>
          <v-switch
            color="primary"
            :label="`Администратор`"
            v-model="this.$store.state.user.isAdmin"
            @click="this.$store.dispatch('toggleIsAdmin')"
          ></v-switch>
        </v-container>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  data: () => ({
    admin: true,
  }),

  computed: {
    countProductInBasket() {
      return this.$store.state.user.productsInBasket.length;
    },
  },

  mounted() {
    this.$store.dispatch("initUserDataFromLS");
  },

  methods: {
    ...mapActions(["initUserDataFromLS", "toggleIsAdmin"]),
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
