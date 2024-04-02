import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import Board from "./components/Board.vue";
import Menu from "./components/Menu.vue";
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    { path: "/", component: Menu},
    { path: "/play/:features", component: Board, props: true },

];

const router = createRouter({
    history: createWebHashHistory(), routes
});


createApp(App)
    .use(router)
    .mount('#app')
