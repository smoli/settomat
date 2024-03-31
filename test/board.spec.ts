import {describe, expect, test} from "vitest";
import {createEmptyBoard, fillBoard, growBoard, rearrangeArray, rearrangeBoard} from "../src/boardFunctions";
import {createDeck} from "../src/deckFunctions";

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

        console.log("B", b);
        b = rearrangeBoard(b);

        console.log("B", b);
        console.log("B2", b2);

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

       console.log(b);
       console.log(r);

       expect(r).to.deep.eq([1, 4, 5, 6, false, false]);

    });
});