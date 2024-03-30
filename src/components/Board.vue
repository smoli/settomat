<template>
      <svg>
          <pattern id="diaHatch" width="1" height="15" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
              <line x1="0" x2="100%" y1="0" y2="0" stroke-width="12" stroke="white" />
          </pattern>

      </svg>
  <div class="board">
      <Card :shape="0" :color="0" :filling="0" :count="1"></Card>
      <Card :shape="1" :color="1" :filling="1" :count="2"></Card>
      <Card :shape="2" :color="2" :filling="2" :count="3"></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
  </div>
</template>

<script setup lang="ts">
//import { ref } from 'vue'
import Card from "./Card.vue";
</script>

<style scoped>
  .board {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 1em;
      grid-gap: 1em;
  }
</style>