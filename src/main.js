import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import Maska from 'maska';

createApp(App).use(router).use(Maska).mount('#app')
