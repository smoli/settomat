import {describe, expect, test} from "vitest";
import {createEmptyBoard, fillBoard, growBoard, rearrangeArray, rearrangeBoard} from "../src/boardFunctions";
import {createDeck, createReducedDeck} from "../src/deckFunctions";

describe("board", () => {
    test("create an empty board", () => {
        expect(createEmptyBoard(12)).to.deep.eq([false, false, false, false, false, false, false, false, false, false, false, false])
    });

    test("filling from deck", () => {
        const d = createDeck(12);
        let b = createEmptyBoard(4);

        b = fillBoard(b, d);

        expect(b[0]).to.not.eq(false);
        expect(b[1]).to.not.eq(false);
        expect(b[2]).to.not.eq(false);
        expect(b[3]).to.not.eq(false);
    });

    test("grow", () => {
        const d = createDeck(12);
        let b = createEmptyBoard(4);

        b = fillBoard(b, d);

        b = growBoard(b, 3);

        expect(b.length).to.eq(7);
        expect(b[4]).to.eq(false);
        expect(b[5]).to.eq(false);
        expect(b[6]).to.eq(false);
    });

    test("rearrange", () => {
        const d = createDeck(12);
        let b = createEmptyBoard(6);

        b = fillBoard(b, d);

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

    test("creating a deck with 3 features", () => {
        let d = createReducedDeck({ color: null, shape: null, filling: null, count: 1 });
        expect(d.length).to.eq(27);
        d.forEach(c => expect(c.count).to.eq(1));

        d = createReducedDeck({ color: 0, shape: null, filling: null, count: null });
        expect(d.length).to.eq(27);
        d.forEach(c => expect(c.color).to.eq(0));

        d = createReducedDeck({ color: null, shape: 2, filling: null, count: null });
        expect(d.length).to.eq(27);
        d.forEach(c => expect(c.shape).to.eq(2));
    });
});