<template>
    <div v-if="testMode"><h1>TESTMODE TESTMODE TESTMODE TESTMODE TESTMODE TESTMODE TESTMODE TESTMODE</h1></div>
    <div class="info" v-if="!gameEnded">
        <span id="timer">Timer: {{ timer }}</span><br/>
        <span id="setCount">Gefunden: {{ setsFound }}</span>
        <span id="points">Punkte: {{ points }}</span>
        <span id="deckSize">Stapel: {{ deck.length }}</span>

        <button id="noset" v-if="!forceSet" class="button" @click="userSaysNoSet" :class="{ wrongSayingNoSet: wrongSayingNoSet }">
            Kein Set
        </button>
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
                      :correct="c.correct"
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

        <span id="forceHint" v-if="forceSet">Es gibt mindestens ein Set</span>
    </div>
    <div v-if="gameEnded">
        <h1>Geschafft!</h1>
        <h2>Du hast {{ setsFound }} Sets gefunden und {{ points }} Punkte.</h2>

        <!--        <div class="game-url">
                    <h2>Verschicke diesen Link und andere können diese Kartenreihenfolge auch spielen</h2>
                    <button class="button game-url" @click="copyGameLink()">
                        <img alt="Copy SVG Vector Icon" height="20pt" decoding="async" data-nimg="1" style="color:transparent;"
                             src="../assets/copy.svg">
                        <span>{{ gameLink }}</span></button>
                </div>-->


        <button class="button" @click="reset(true)">Noch mal!</button>
        <router-link class="button" to="/">Zum Menü</router-link>
        <h2>Deine Sets</h2>
        <div v-for="set of sets">
            <div class="board result">
                <div class="setFeatureCount"><span>{{ getDifferingFeatureCount(set[0], set[1], set[2]) }}</span></div>
                <div v-for="c of set">
                    <Card
                            :shape="c.shape"
                            :color="c.color"
                            :filling="c.filling"
                            :count="c.count"
                            :selected="false"
                            :error="false"
                            :tip="aSet.indexOf(c) !== -1"

                            :width="halfCardWidth"
                            :height="halfCardHeight"
                    ></Card>
                </div>
            </div>
        </div>
    </div>
    <PatternDef/>
</template>

<script setup lang="ts">
import Card from "./Card.vue";
import {computed, ref} from "vue";
import {ICard} from "../ICard.ts";
import {
    checkForSet,
    createDeck,
    createReducedDeck,
    getASet,
    getDifferingFeatureCount,
    isSet, setSeed,
    shuffle
} from "../deckFunctions.ts";
import {
    createEmptyBoard,
    fillEmptySlots,
    getEmptySlotCount,
    growBoard,
    pickCardsFromTop, pickCardsToFormSet,
    rearrangeBoard, removeCardsFromBoard, removeCardsFromDeck
} from "../boardFunctions.ts";
import PatternDef from "./PatternDef.vue";


const timerDefault = 120;

const boardSize = ref(0);
const setsFound = ref(0);
const timer = ref(timerDefault);
const points = ref(0);
const sets = ref<ICard[][]>([]);
const boardCards = ref<(ICard | boolean)[]>([]);
const seedUsed = ref(-1);
const testMode = ref(false);


const props = defineProps<{ features: string, guarantee: string, seed: string }>();

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


const halfCardWidth = computed(() => {
    if (window.innerWidth < 600) {
        return (44 / (boardSize.value / 3)) + "vw";
    }

    return "6vh";
});

const halfCardHeight = computed(() => {
    if (window.innerWidth < 600) {
        return ((5 / 6) * (88 / (boardSize.value / 3))) + "vw";
    }

    return "10vh";
})


function shuffleDeck(force: boolean = false) {
    if (props.seed && !force) {
        seedUsed.value = setSeed(Number(props.seed));
    }
    shuffle(deck.value, 1);
}

let selectionDisabled = false;

function onCardSelected(c: ICard) {
    if (selectionDisabled) {
        return;
    }

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
            selectionDisabled = true;
            selection.value[0].correct = selection.value[1].correct = selection.value[2].correct = true;
            stopTimer();
            setTimeout(() => {
                timer.value = timerDefault;
                startTimer();
                sets.value.push([selection.value[0], selection.value[1], selection.value[2]]);
                removeCards(selection.value);
                shrink(12);
                fill();
                selection.value = []
                lastSetFound = [];
                selectionDisabled = false;
            }, 1000);


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

function removeCards(cards: ICard[]) {
    boardCards.value = removeCardsFromBoard(boardCards.value, cards)
    deck.value = removeCardsFromDeck(deck.value, cards);
}


function fill() {
    const empties = getEmptySlotCount(boardCards.value);
    if (empties > deck.value.length) {
        return;
    }

    let pick: ICard[];

    if (forceSet.value) {
        pick = pickCardsToFormSet(boardCards.value, deck.value, seedUsed.value);

        if (pick.length < empties) {
            deck.value = removeCardsFromDeck(deck.value, pick);
            pick = [...pick, ...pickCardsFromTop(deck.value, empties - pick.length)]
        }

        shuffle(pick);

    } else {
        pick = pickCardsFromTop(deck.value, empties);
    }

    boardCards.value = fillEmptySlots(boardCards.value, pick);
    deck.value = removeCardsFromDeck(deck.value, pick);
}

let interval: (number | NodeJS.Timeout) = -1;

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


const forceSet = computed(() => {
    return props.guarantee === "on";
})

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

let lastSetFound:ICard[] = [];


const aSet = computed(() => {
    if (timer.value > 20 && !testMode.value) {
        lastSetFound = [];
        return lastSetFound;
    }

    let r = [...lastSetFound];

    if (r.length === 0) {
        lastSetFound = getASet(boardCards.value.filter(c => typeof c !== "boolean") as ICard[]);
        r = [...lastSetFound];
    }

    if (testMode.value) {
        return r;
    }

    if (r.length === 3) {
        r.pop();
    }

    if (timer.value > 10 && r.length === 2) {
        r.pop();
    }

    return r;
})

const gameEnded = computed(() => {
    if (hasASet.value) {
        // If we still have a set, game continues
        return false;
    }

    if (forceSet.value) {
        // If we try to guarantee a set and there is none, game ends
        return true;
    }

    if (deck.value.length > 0) {
        // If there are still cards on the deck, game continues if we can create a set with cards from the deck.
        const pick = pickCardsToFormSet(boardCards.value, deck.value, seedUsed.value);

        if (pick.length === 0) {
            return true;
        }
        return false;
    }

    return true;
});

/*
const gameLink = computed(() => {
    return window.location.protocol + "//" + window.location.host + "/#/play/" + props.features + (forceSet.value ? "/on" : "") + "/d/" + seedUsed.value;
});

async function copyGameLink() {
    const type = "text/plain";
    const blob = new Blob([gameLink.value], {type});
    const data = [new ClipboardItem({[type]: blob})];
    await navigator.clipboard.write(data);
}
*/


function reset(force: boolean = false) {
    points.value = 0;
    setsFound.value = 0;
    lastSetFound = [];

    stopTimer();
    boardSize.value = 12;
    resetDeck();
    // shuffleDeck(force);
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
    border-color: red;
    color: white;
}

.info {
    display: grid;
    grid-template: "a a a" auto "b c d" auto "e e e";
    justify-items: center;
}

#timer, #setCount, #points, #deckSize, #forceHint {
    font-size: 1.5em;
    font-weight: bold;
    color: #4d4d4d;
}

#timer {
    grid-area: a;
}

#setCount {
    grid-area: b;
}

#points {
    grid-area: c;
}

#deckSize {
    grid-area: d;
}

#noset {
    grid-area: e;
    margin-bottom: -1em;
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

.button:active {
    border-color: cornflowerblue;
}

.button.game-url {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 1em;
}

button.game-url span {
    pointer-events: all !important;
}

div.game-url {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 1em;
}

div.game-url h2 {
    margin: 0;
}

div.setFeatureCount {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    text-align: center;
}

button.noset {
    display: block;
}


div.result {
    padding: 1em;
    border-radius: 1em;
    grid-template-columns: 1fr 1fr 1fr 1fr
}


</style>