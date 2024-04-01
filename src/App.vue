<template>
    <div>

        <h1>Settomat</h1>
        <RouterView></RouterView>
    </div>
</template>

<script setup lang="ts">
//import { ref } from 'vue'
import Board from "./components/Board.vue";
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        align-items: center;
    }
</style>