import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import Board from "./components/Board.vue";
import Menu from "./components/Menu.vue";
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    { path: "/play/:features/:guarantee", component: Board, props: true },
    { path: "/play/:features", component: Board, props: true },
    { path: "/", component: Menu},

];

const router = createRouter({
    history: createWebHashHistory(), routes
});


createApp(App)
    .use(router)
    .mount('#app')
