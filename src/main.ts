import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import Board from "./components/Board.vue";
import Menu from "./components/Menu.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import Simulator from "./components/Simulator.vue";
import Howto from "./components/Howto.vue";

const routes = [
    { path: "/play/:features/:guarantee/d/:seed", component: Board, props: true },
    { path: "/play/:features/:guarantee", component: Board, props: true },
    { path: "/play/:features/d/:seed", component: Board, props: true },
    { path: "/play/:features", component: Board, props: true },
    { path: "/sim", component: Simulator},
    { path: "/how", component: Howto},
    { path: "/", component: Menu},

];

const router = createRouter({
    history: createWebHashHistory(), routes
});


createApp(App)
    .use(router)
    .mount('#app')
