<template>
  {{ heatMapData.length }} rounds
    <div class="heatMap">
        <div v-for="(h, i) in heatMap"
             :style="{
            fontWeight: 'bold',
            color: `hsl(${180 + heatMapHues[i]} 100% 50%)`,
            backgroundColor: `hsl(${heatMapHues[i]} 100% 50%)`
            }"
        ><span>{{ h }} | {{ (h / heatMapData.length * 100).toFixed(1)}} %</span>
        </div>
    </div>

</template>

<script setup lang="ts">

import {createDeck, getASet, shuffle} from "../deckFunctions.ts";
import {
    createEmptyBoard, fillEmptySlots,
    getEmptySlotCount,
    pickCardsFromTop,
    pickCardsToFormSet, removeCardsFromBoard,
    removeCardsFromDeck
} from "../boardFunctions.ts";
import {ICard} from "../ICard.ts";
import {computed, ref} from "vue";
import Board from "./Board.vue";

const rounds = ref(0);


interface logEntry {
    id: number,
    deckSize: number,
    setFound: ICard[]
    board: Board,
    boardAfter: Board,
    pick: ICard[]
}

const log = ref<logEntry[]>([]);
const heatMapData = ref([]);


const heatMap = computed(() => {
    const ret = Array.from(Array(12)).map(c => 0);

    heatMapData.value.forEach(l => {
        ret[l[0]] += 1;
        ret[l[1]] += 1;
        ret[l[2]] += 1;
    })

    return ret;
});

const heatMapMinMax = computed((): { min: number, max: number } => {
    let min = Math.min(...heatMap.value.flat());
    let max = Math.max(...heatMap.value.flat());

    return {
        min, max
    }
});

const heatMapHues = computed(() => {
    return heatMap.value.map(v => 120 - 120 * (v - heatMapMinMax.value.min) / (heatMapMinMax.value.max - heatMapMinMax.value.min))
});

function simulate(id: number) {


    let d = createDeck();
    let b = createEmptyBoard(12);
    const seed = Math.floor(Math.random() * 784651);

    shuffle(d, seed);

    function fill() {
        const empties = getEmptySlotCount(b);
        let pick = [];

            pick = pickCardsToFormSet(b, d, seed)

            if (pick.length < empties) {
                d = removeCardsFromDeck(d, pick);
                pick = [...pickCardsFromTop(d, empties - pick.length), ...pick]
            }

        b = fillEmptySlots(b, pick);

        d = removeCardsFromDeck(d, pick);

        return pick;
    }

    fill();

    const l: logEntry = {
        id, board: [...b], boardAfter: [...b], deckSize: d.length, setFound: [], pick: []
    }
    log.value.push(l);

    rounds.value = 0;
    while (getASet(b as ICard[]).length) {


        rounds.value += 1;
        let s = getASet(b as ICard[]);


        const before = [...b];

        const hl = [];
        for (let c of s) {
            hl.push(b.indexOf(c));
        }

        heatMapData.value.push(hl);


        b = removeCardsFromBoard(b as ICard[], s);


        let pick = []
        const empties = getEmptySlotCount(b);
        if (d.length >= empties) {
            pick = fill();
        }

        const l: logEntry = {
            id, board: [...before], boardAfter: [...b], deckSize: d.length, setFound: s, pick
        }
        log.value.push(l);

    }
}

let max = 1000;

while (max--) {
    simulate(100 - max);
}

</script>

<style scoped>
.heatMap {
    display: grid;
    gap: 1px;
    grid-gap: 1px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.heatMap div {
    display: flex;
    width: 10em;
    height: 10em;
    justify-content: center;
    align-items: center;
}
</style>
