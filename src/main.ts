import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import vuetifyPlugin from './vue-plugins/vuetify';

import App from './App.vue';
import router from './router';

createApp(App).use(router).use(createPinia()).use(vuetifyPlugin).mount('#app');
