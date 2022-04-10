import { createApp } from "vue";
import axios from "axios";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { store } from "./stores";
import router from "./router";

loadFonts();

axios.defaults.baseURL = "http://localhost:3000";

createApp(App).use(router).use(vuetify).use(store).mount("#app");
