<template>
    <div class="info" v-if="!gameEnded">
        <span id="timer">Timer: {{ timer }}</span><br/>
        <button class="button" @click="userSaysNoSet" :class="{ wrongSayingNoSet: wrongSayingNoSet }">Kein Set
        </button>
        <!--    <button @click="shrink">Shrink {{ boardSize}}</button>-->
        <br>
        <span id="setCount">Gefunden: {{ setsFound }}</span>
        <span id="points">Punkte: {{ points }}</span>
        <span id="deckSize">Stapel: {{ deck.length }}</span>
    </div>

    <div v-if="!gameEnded">

        <div class="board" :style="{ gridTemplateColumns: boardColumns}">
            <div v-for="c of boardCards">
                <Card v-if="typeof c !== 'boolean'"
                      :shape="c.shape"
                      :color="c.color"
                      :filling="c.filling"
                      :count="c.count"
                      :selected="c.selected"
                      :error="c.error"
                      :tip="aSet.indexOf(c) !== -1"

                      :width="cardWidth"
                      :height="cardHeight"

                      @clicked="onCardSelected(c)"
                ></Card>
                <Card v-else :back="true" :width="cardWidth"
                      :height="cardHeight"></Card>
            </div>
        </div>

        <svg width="1" height="1">
            <defs>
                <pattern id="diaHatch" viewBox="0,0,30,10" width="10%" height="10%" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="20" y2="0" stroke-width="25" stroke="white"/>
                </pattern>
            </defs>

        </svg>
    </div>
    <div v-if="gameEnded">
        <h1>Fertig</h1>
        <h2>Du hast {{ setsFound }} Sets gefunden und {{ points }} Punkte.</h2>
        <button class="button" @click="reset">Noch mal!</button>
        <h2>Deine Sets</h2>
        <div v-for="set of sets">
            <div class="board" style="grid-template-columns: 1fr 1fr 1fr">
                <div v-for="c of set">
                    <Card
                          :shape="c.shape"
                          :color="c.color"
                          :filling="c.filling"
                          :count="c.count"
                          :selected="false"
                          :error="false"
                          :tip="aSet.indexOf(c) !== -1"

                          :width="cardWidth"
                          :height="cardHeight"
                    ></Card>
                </div>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import Card from "./Card.vue";
import {computed, ref} from "vue";
import {ICard} from "../ICard.ts";
import {checkForSet, createDeck, createReducedDeck, getASet, isSet, shuffle} from "../deckFunctions.ts";
import {createEmptyBoard, fillBoard, growBoard, rearrangeBoard} from "../boardFunctions.ts";

const timerDefault = 120;

const boardSize = ref(0);
const setsFound = ref(0);
const timer = ref(120);
const points = ref(0);
const sets = ref<ICard[][]>([]);
const boardCards = ref<(ICard | boolean)[]>([]);


const props = defineProps<{ features: string }>();

const deck = ref<ICard[]>([]);
const selection = ref<ICard[]>([]);

boardSize.value = 12;

function resetDeck() {

    if (props.features === "all") {
        deck.value = createDeck(81);
    }

    if (props.features === "3") {
        deck.value = createReducedDeck({color: null, count: null, filling: 2, shape: null})
    }

}

const boardColumns = computed(() => {
    return Array.from(Array(boardSize.value / 3).keys()).map(() => "1fr").join(" ");
});

const cardWidth = computed(() => {
    if (window.innerWidth < 600) {
        return (88 / (boardSize.value / 3)) + "vw";
    }

    return "12vh";
});

const cardHeight = computed(() => {
    if (window.innerWidth < 600) {
        return ((10 / 6) * (88 / (boardSize.value / 3))) + "vw";
    }

    return "20vh";
})


function shuffleDeck() {
    shuffle(deck.value);
}

function onCardSelected(c: ICard) {
    if (!c.selected && selection.value.length >= 3) {
        return;
    }

    c.selected = !c.selected;

    if (c.selected) {
        selection.value.push(c);
    } else {
        selection.value = selection.value.filter(a => a !== c);
    }

    if (selection.value.length === 3) {
        if (isSet(selection.value[0], selection.value[1], selection.value[2])) {
            setsFound.value += 1;
            rewardPoints();
            timer.value = 120;
            sets.value.push([selection.value[0], selection.value[1], selection.value[2]]);
            removeCardsFromBoard(selection.value);
            shrink(12);
            fill();
            selection.value = []
        } else {
            deductPoints(timer.value);

            selection.value.forEach(c => {
                c.selected = false;
                c.error = true;
            })

            setTimeout(() => {
                selection.value.forEach(c => {
                    c.error = false;
                });
                deselectAll();
            }, 1000);
        }
    }
}


function deselectAll() {
    boardCards.value.forEach(c => {
        if (typeof c !== "boolean") {
            c.selected = false;
        }
    });
    selection.value = [];
}

function rewardPoints() {
    points.value += timer.value;
}

function deductPoints(amount: number) {
    points.value = Math.max(points.value - amount, 0);
}

function removeCardsFromBoard(cards: ICard[]) {

    boardCards.value = boardCards.value.map(c => {

        if (typeof c === "boolean") {
            return c;
        }

        if (cards.indexOf(c) !== -1) {
            return false;
        } else {
            return c;
        }
    })

    deck.value = deck.value.filter(a => cards.indexOf(a) === -1);
    console.log(deck.value.length);
}


function fill() {
    boardCards.value = fillBoard(boardCards.value, deck.value);

    boardCards.value.forEach(c => {
        if (typeof c === "boolean") {
            return;
        }
        console.log(c.shape, c.filling, c.color, c.count);
    });

}

let interval: number = -1;

function startTimer() {
    timer.value = timerDefault;
    interval = setInterval(() => {
        if (timer.value > 1) {
            timer.value -= 1;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
}

function resetTimer() {
    timer.value = timerDefault;
}

const hasASet = computed(() => {
    return checkForSet(boardCards.value.filter(c => typeof c !== "boolean") as ICard[]);
});


function grow() {
    boardSize.value += 3;
    boardCards.value = growBoard(boardCards.value, 3);
    fill();
}

function shrink(min: number = 12) {

    if (boardCards.value.length <= min) {
        return;
    }

    boardCards.value = rearrangeBoard(boardCards.value);
    boardCards.value = boardCards.value.filter(c => c !== false);

    if (boardCards.value.length < min) {
        boardCards.value = growBoard(boardCards.value, min - boardCards.value.length);
    }

    boardSize.value = Math.ceil(boardCards.value.length / 3) * 3;
}


function clearBoard() {
    boardCards.value = createEmptyBoard(boardSize.value);
}


const wrongSayingNoSet = ref(false);

function userSaysNoSet() {
    if (hasASet.value) {

        deductPoints(timer.value);

        wrongSayingNoSet.value = true;
        setTimeout(() => {
            wrongSayingNoSet.value = false;
        }, 1000);

    } else {
        rewardPoints();
        resetTimer();
        grow();
    }
}


const aSet = computed(() => {
    if (timer.value > 20) {
        return [];
    }

    const r = getASet(boardCards.value.filter(c => typeof c !== "boolean") as ICard[]);

    r.pop();

    if (timer.value > 10) {
        r.pop();
    }


    return r;
})

const gameEnded = computed(() => {
    if (hasASet.value) {
        return false;
    }

    if (deck.value.length > 0) {
        return false;
    }

    return true;
});

function reset() {
    points.value = 0;
    setsFound.value = 0;

    stopTimer();
    boardSize.value = 12;
    resetDeck();
    shuffleDeck();
    clearBoard();
    fill();
    startTimer();
}

reset();

</script>

<style scoped>


span {
    margin: 1em;
    white-space: nowrap;
}

.wrongSayingNoSet {
    background-color: red;
}

#timer, #setCount, #points, #deckSize {
    display: inline-block;
    font-size: 1.5em;
    font-weight: bold;
    color: #4d4d4d;
}

@media (max-width: 600px) {
    #timer, #setCount, #points, #deckSize {
        font-size: 1em;
    }
}

.button {
    margin: 0.5em;
    font-size: 1em;
}


</style>