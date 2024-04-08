<template>
    <h1>Settomat</h1>
    <nav>
      <router-link class="button" to="/play/all">Klassisch &ndash; 81 Karten</router-link>
      <router-link class="button" to="/play/all/on">Klassisch &ndash; 81 Karten mit garantiertem Set</router-link>
      <router-link class="button" to="/play/3">Einfach &ndash; 21 Karten</router-link>
        <router-link class="button howto" to="/how">Wie gespielt wird</router-link>
    </nav>
</template>

<script setup lang="ts">
//import { ref } from 'vue'
</script>

<style scoped>
  h1 {
      font-size: 3em;
  }

  .button {
      display: block;
  }

  .howto {
      background-color: cornflowerblue;
      color: white;
      border-color: cornflowerblue;
  }

  .howto:hover {
      border-color: white;
  }


</style>