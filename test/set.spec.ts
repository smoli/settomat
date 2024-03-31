import {describe, expect, test} from "vitest";
import {ICard} from "../src/ICard";
import {checkForSet, isSet, sameOrDifferent} from "../src/deckFunctions";

describe("sets", () => {

    test("same of different", () => {
        expect(sameOrDifferent(1, 1, 1)).to.eq(true);
        expect(sameOrDifferent(1, 2, 1)).to.eq(false);
        expect(sameOrDifferent(1, 2, 3)).to.eq(true);
    })

    test("checking for set", () => {
        const c1: ICard = {
            shape: 1,
            color: 1,
            filling: 1,
            count: 1,
        }

        const c2: ICard = {
            shape: 2,
            color: 1,
            filling: 1,
            count: 1,
        }

        const c3: ICard = {
            shape: 3,
            color: 1,
            filling: 1,
            count: 1,
        }

        expect(isSet(c1, c2, c3)).to.eq(true);

        c2.count = 2;
        expect(isSet(c1, c2, c3)).to.eq(false);

        c3.count = 3
        expect(isSet(c1, c2, c3)).to.eq(true);
    });


    test("checkForASet", () => {
        const c1: ICard = {
            shape: 1,
            color: 1,
            filling: 1,
            count: 1,
        }

        const c2: ICard = {
            shape: 2,
            color: 1,
            filling: 1,
            count: 1,
        }

        const c3: ICard = {
            shape: 3,
            color: 1,
            filling: 1,
            count: 1,
        }

        const c4: ICard = {
            shape: 1,
            color: 2,
            filling: 1,
            count: 1,
        }

        const c5: ICard = {
            shape: 2,
            color: 2,
            filling: 1,
            count: 1,
        }

        const c6: ICard = {
            shape: 3,
            color: 1,
            filling: 1,
            count: 1,
        }

        expect(checkForSet([c1, c2, c3, c4, c5, c6])).to.eq(true);
        expect(checkForSet([c1, c4, c5, c6])).to.eq(false);


    });
})