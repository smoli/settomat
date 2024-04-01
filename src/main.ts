import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import Board from "./components/Board.vue";
import {createMemoryHistory, createRouter} from "vue-router";

const routes = [
    { path: "/", component: Board}
];

const router = createRouter({
    history: createMemoryHistory(), routes
});


createApp(App)
    .use(router)
    .mount('#app')
