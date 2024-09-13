import { createApp } from 'vue';
import { createPinia } from 'pinia'
import './style.css';
import Vant from 'vant';
import App from './App.vue';
import 'vant/lib/index.css';
import 'amfe-flexible';
import router from './routes';

const app = createApp(App);
app.use(router).use(createPinia()).use(Vant).mount('#app');