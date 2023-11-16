import { createApp } from 'vue'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './assets/style.css'
import { createPinia } from 'pinia'
import PhosphorVue from "phosphor-vue";
import router from './router/index'
import App from './App.vue'

// createApp(App).mount('#app')

const pinia = createPinia()
const app = createApp(App);


app.use(router)
app.use(Toast);
app.use(PhosphorVue);
app.use(pinia);


app.mount('#app');
