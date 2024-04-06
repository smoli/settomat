import {describe, expect, test} from "vitest";
import {
    createEmptyBoard,
    fillEmptySlots, getEmptySlotCount,
    growBoard, pickCardsFromBottom, pickCardsFromTop, pickCardsToFormSet,
    rearrangeArray,
    rearrangeBoard,
    removeCardsFromDeck
} from "../src/boardFunctions";
import {checkForSet, createDeck, createReducedDeck, getASet, shuffle} from "../src/deckFunctions";
import {ICard} from "../src/ICard";

describe("board", () => {
    test("create an empty board", () => {
        expect(createEmptyBoard(12)).to.deep.eq([false, false, false, false, false, false, false, false, false, false, false, false])
    });


    test("grow", () => {
        const d = createDeck(12);
        let b = createEmptyBoard(4);

        b = fillEmptySlots(b, pickCardsFromTop(d, 4));

        b = growBoard(b, 3);

        expect(b.length).to.eq(7);
        expect(b[4]).to.eq(false);
        expect(b[5]).to.eq(false);
        expect(b[6]).to.eq(false);
    });

    test("rearrange", () => {
        const d = createDeck(12);
        let b = createEmptyBoard(6);

        b = fillEmptySlots(b, pickCardsFromTop(d, 6));

        const b2 = [...b];

        b[1] = false;
        b[2] = false;

        b = rearrangeBoard(b);

        expect(b[0]).to.eq(b2[0]);
        expect(b[1]).to.eq(b2[3]);
        expect(b[2]).to.eq(b2[4]);
        expect(b[3]).to.eq(b2[5]);
        expect(b[4]).to.eq(false);
        expect(b[5]).to.eq(false);
    });

    test("rearrange", () => {
        const b = [1, false, false, 4, 5, 6];
        const r = rearrangeArray(b, false);


        expect(r).to.deep.eq([1, 4, 5, 6, false, false]);

    });

    test("creating a deck with 4 features", () => {
        const d = createDeck();

        expect(d.length).to.eq(81);
    });

    test("removing cards from deck", () => {
        const d = createDeck();
        const c1: ICard = {
            shape: 1,
            color: 1,
            filling: 1,
            count: 1,
        }

        const d2 = removeCardsFromDeck(d, [c1]);

        expect(d2.length).to.eq(d.length - 1);

        const d3 = removeCardsFromDeck(d2, [c1]);
        expect(d3.length).to.eq(d2.length);
    });

    test("creating a deck with 3 features", () => {
        let d = createReducedDeck({color: null, shape: null, filling: null, count: 1});
        expect(d.length).to.eq(27);
        d.forEach(c => expect(c.count).to.eq(1));

        d = createReducedDeck({color: 0, shape: null, filling: null, count: null});
        expect(d.length).to.eq(27);
        d.forEach(c => expect(c.color).to.eq(0));

        d = createReducedDeck({color: null, shape: 2, filling: null, count: null});
        expect(d.length).to.eq(27);
        d.forEach(c => expect(c.shape).to.eq(2));
    });

    test("picking cards from top of deck", () => {
        const c1: ICard = {
            shape: 0,
            color: 0,
            filling: 0,
            count: 1,
        }

        const c2: ICard = {
            shape: 1,
            color: 0,
            filling: 0,
            count: 1,
        }

        const c3: ICard = {
            shape: 2,
            color: 0,
            filling: 0,
            count: 1,
        }

        const c4: ICard = {
            shape: 0,
            color: 1,
            filling: 0,
            count: 1,
        }

        const c5: ICard = {
            shape: 1,
            color: 1,
            filling: 0,
            count: 1,
        }

        const c6: ICard = {
            shape: 2,
            color: 1,
            filling: 0,
            count: 1,
        }

        const d = [c1, c2, c3, c4, c5, c6];
        const p = pickCardsFromTop(d, 2);

        expect(p).to.deep.eq([c1, c2]);
    });


    test("filling a board with guaranteed sets", () => {
        const c1: ICard = {
            shape: 0,
            color: 0,
            filling: 0,
            count: 1,
        }

        const c2: ICard = {
            shape: 1,
            color: 0,
            filling: 0,
            count: 1,
        }

        const c3: ICard = {
            shape: 2,
            color: 0,
            filling: 0,
            count: 1,
        }

        const c4: ICard = {
            shape: 0,
            color: 1,
            filling: 0,
            count: 1,
        }

        const c5: ICard = {
            shape: 1,
            color: 1,
            filling: 0,
            count: 1,
        }

        const c6: ICard = {
            shape: 2,
            color: 1,
            filling: 0,
            count: 1,
        }

        let board = [c1, c2, false, c4];
        let deck = [c5, c3, c6];

        const pick = pickCardsFromTop(deck, 1);

        const b2 = fillEmptySlots(board, pick);
        deck = removeCardsFromDeck(deck, pick);

        expect(checkForSet(b2 as ICard[])).to.eq(false);

        deck = [c5, c3, c6]

        const pick2 = pickCardsToFormSet(board, deck, 12);

        console.log("PICK2", pick2);

        const b3 = fillEmptySlots(board, pick2);

        console.log(b3);
        expect(checkForSet(b3 as ICard[])).to.eq(true);

    });


    test("filling from deck", () => {
        let d = createDeck(12);
        let b = createEmptyBoard(4);

        const l = getEmptySlotCount(b);
        const p = pickCardsFromTop(d, l);

        b = fillEmptySlots(b, p);

        d = removeCardsFromDeck(d, p);

        expect(b[0]).to.not.eq(false);
        expect(b[1]).to.not.eq(false);
        expect(b[2]).to.not.eq(false);
        expect(b[3]).to.not.eq(false);
    });

    test("shuffling with a different seed will always produce the different decks", () => {

        const seed = 12;
        let d1 = createDeck();
        let d2 = createDeck();

        shuffle(d1, seed);
        shuffle(d2, seed * 2);

        expect(d1).to.not.deep.eq(d2);
    });

    test("shuffling without a seed will always produce the different decks", () => {

        let d1 = createDeck();
        let d2 = createDeck();

        shuffle(d1);
        shuffle(d2);

        expect(d1).to.not.deep.eq(d2);

        // test to first use a seed and then not

        shuffle(d1, 12);

        d1 = createDeck();
        d2 = createDeck();

        shuffle(d1);
        shuffle(d2);

        expect(d1).to.not.deep.eq(d2);
    });


    test("shuffling with the same seed will always produce the same deck", () => {

        const seed = 12;
        let d1 = createDeck();
        let d2 = createDeck();

        shuffle(d1, seed);
        shuffle(d2, seed, true);

        expect(d1).to.deep.eq(d2);
    });


    test("theres no significant bias where sets are on the board during a game with guaranteed sets", () => {

    });
});