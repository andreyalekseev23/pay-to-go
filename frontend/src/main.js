import { createApp } from 'vue';
import App from './App.vue';
import store from "@/store/store";
import vuetify from "@/vuetify.plugin";

import './assets/main.css'

createApp(App).use(store).use(vuetify).mount('#app');
