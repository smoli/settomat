<template>
    <div class="card" :class="{ selected: selected, error: error }" @click="onClicked()">
        <svg v-if="!back" class="render" viewBox="-300 -500 600 1000">

            <g transform="translate(-200, -450) scale(10, 10) rotate(45)" v-if="tip">
                <polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2" fill="gold"/>
            </g>

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

        <svg v-if="back" class="render-back" viewBox="-300 -500 600 1000">
        </svg>

    </div>
</template>

<script setup lang="ts">
//import { ref } from 'vue'

import {computed} from "vue";

const props = defineProps<{
    shape?: number,
    color?: number,
    filling?: number,
    count?: number,
    selected?: boolean,
    error?: boolean,
    back?: boolean,
    tip?: boolean
}>();

const emits = defineEmits(["clicked"]);

const peanut = "M -98.57 -50.059 C -181.76 -49.871 -215.385 127.425 -100 60 C -100 60 -29.577 39.497 4.073 39.497 C 37.723 39.497 102.002 50.261 102.002 50.261 C 202.002 50.261 222.498 -151.646 100 -60 C 100 -60 35.648 -41.272 2.962 -40.377 C -37.019 -39.282 -98.57 -50.059 -98.57 -50.059 Z";
const pill = "M -100 -60 C -200 -60 -200 60 -100 60 L 100 60 C 200 60 200 -60 100 -60 Z";
const rombus = "M 0 -60 L -200 0 L 0 60 L 200 0  Z";


const shapes = [pill, rombus, peanut];
const colors = ["#FF0000", "#009800", "#7300ff"];

const hatchURL = "url(" + location.protocol + '//' + location.host + location.pathname + "#diaHatch)";
const fills = ["white", hatchURL, "none"];


const shape = computed(() => {
    return shapes[props.shape as number];
});

const color = computed(() => {
    return colors[props.color as number];
});


const fillType = computed(() => {
    return fills[props.filling as number];
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

function onClicked() {
    emits("clicked");
}


</script>

<style scoped>


.card.selected {
    border-color: cornflowerblue;
    /*box-shadow: 0.5em 0.5em 1em rgba(0, 0, 0, 0.3);*/
}

.card.error {
    border-color: red;
}

.render {
    display: block;
    width: 100%;
    height: 100%;
    background-color: white;
}

.render-back {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #207a96;
}

.icon {
    stroke-width: 0.5em;
}
</style>u