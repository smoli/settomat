<template>
<div class="card">
    <svg class="render" viewBox="-300 -500 600 1000">


        <g v-for="y in yPosition" :transform="`translate(0, ${y})`">
        <path class="icon" :d="shape" :style="{
            stroke: color,
            fill: color
        }"/>
        <path class="icon" :d="shape" :style="{
            stroke: color,
            fill: fillType
        }"/>
        </g>
    </svg>
</div>
</template>

<script setup lang="ts">
//import { ref } from 'vue'

import {computed} from "vue";

const props = defineProps<{
    shape: number,
    color: number,
    filling: number,
    count: number
}>();

const peanut = "M -98.57 -50.059 C -181.76 -49.871 -215.385 127.425 -100 60 C -100 60 -29.577 39.497 4.073 39.497 C 37.723 39.497 102.002 50.261 102.002 50.261 C 202.002 50.261 222.498 -151.646 100 -60 C 100 -60 35.648 -41.272 2.962 -40.377 C -37.019 -39.282 -98.57 -50.059 -98.57 -50.059 Z";
const pill = "M -100 -60 C -200 -60 -200 60 -100 60 L 100 60 C 200 60 200 -60 100 -60 Z";
const rombus = "M 0 -60 L -200 0 L 0 60 L 200 0  Z";


const shapes = [pill, rombus, peanut];
const colors = ["#FF0000", "#009800", "#7300ff"];
const fills = ["white", "url(#diaHatch)", "none"];


const shape = computed(() => {
    return shapes[props.shape];
});

const color = computed(() => {
    return colors[props.color];
});


const fillType = computed(() => {
    return fills[props.filling];
})

const yPosition = computed(() => {
   if (props.count === 2) {
       return [-80, 80];
   }

   if (props.count === 3) {
    return [-160, 0, 160];
   }

   return [0];

});


</script>

<style scoped>
  .card {
      display: inline-block;
      width: 6em;
      height: 10em;
      border-radius: 1em;
      padding: 0;
      overflow: clip;
  }

  .render {
      display: block;
      width: 100%;
      height: 100%;
      background-color: white;
  }

  .icon {
      stroke-width: 0.5em;
  }
</style>u