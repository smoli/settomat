<template>
    <div v-if="!gameEnded">

        <span>Timer: {{ timer }}</span><br/>
        <button @click="userSaysNoSet" :class="{ wrongSayingNoSet: wrongSayingNoSet }">Da ist kein Set</button>
        <!--    <button @click="shrink">Shrink {{ boardSize}}</button>-->
        <br>
        <span>Sets gefunden: {{ setsFound }}</span>
        <span>Punkte: {{ points }}</span>
        <!--        <span>Gibt's eins: {{ hasASet ? 'Ja' : 'Nein' }}</span>-->
        <span>Stapel: {{ deck.length }}</span>

        <div class="board" :style="{ gridTemplateColumns: boardColumns}">
            <div v-for="c of boardCards">
                <Card v-if="typeof c !== 'boolean'"
                      :shape="c.shape"
                      :color="c.color"
                      :filling="c.filling"
                      :count="c.count"
                      :selected="c.selected"
                      :error="c.error"

                      @clicked="onCardSelected(c)"
                ></Card>
                <Card v-else :back="true"></Card>
            </div>
        </div>

        <svg width="1" height="1">
            <defs>
                <pattern id="diaHatch" viewBox="0,0,30,10" width="10%" height="10%" patternTransform="rotate(45)">
                    <line x1="0"  y1="0" x2="20"  y2="0" stroke-width="25" stroke="white"/>
                </pattern>
            </defs>

        </svg>
    </div>
    <div v-if="gameEnded">
        <h1>Fertig</h1>
        <p>Du hast {{ setsFound }} Sets gefunden und {{ points }} Punkte.</p>
        <button @click="reset">Noch mal!</button>
    </div>
</template>

<script setup lang="ts">
import Card from "./Card.vue";
import {computed, ref} from "vue";
import {ICard} from "../ICard.ts";
import {checkForSet, createDeck, isSet, shuffle} from "../deckFunctions.ts";
import {createEmptyBoard, fillBoard, growBoard, rearrangeBoard} from "../boardFunctions.ts";


const boardSize = ref(0);
const setsFound = ref(0);
const timer = ref(120);
const points = ref(0);
const boardCards = ref<(ICard | boolean)[]>([]);


const deck = ref<ICard[]>([]);
const selection = ref<ICard[]>([]);

boardSize.value = 12;

function resetDeck() {
    deck.value = createDeck(81);
}

const boardColumns = computed(() => {
    return Array.from(Array(boardSize.value / 3).keys()).map(() => "1fr").join(" ");
});


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
            points.value += timer.value;
            timer.value = 120;
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
    timer.value = 120;
    interval = setInterval(() => {
        if (timer.value > 1) {
            timer.value -= 1;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
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
        grow();
    }
}

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
.board {
    margin-top: 1em;
    display: grid;
    gap: 1em;
    grid-gap: 1em;
    width: 40em;
}

@media (max-width: 600px) {
    .board {
        margin-top: 1em;
        display: grid;
        grid-gap: 0.2em;
        width: 100%;
        padding: 1em;
    }
}

span {
    margin: 1em;
    white-space: nowrap;
}

.wrongSayingNoSet {
    background-color: red;
}


button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
}

button:hover {
    border-color: #646cff;
}

button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}

</style>