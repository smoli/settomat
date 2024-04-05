import {ICard} from "./ICard.ts";
// @ts-ignore
import MT from "mersennetwister"


const generator = new MT();

export interface IFeatrues {
    color: null | 0 | 1 | 2;
    shape: null | 0 | 1 | 2;
    filling: null | 0 | 1 | 2;
    count: null | 1 | 2 | 3;
}

export function createDeck(max: number = 81): ICard[] {
    const r: ICard[] = [];

    for (let shape = 0; shape < 3; shape++) {
        for (let color = 0; color < 3; color++) {
            for (let filling = 0; filling < 3; filling++) {
                for (let count = 1; count < 4; count++) {
                    r.push({
                        shape, color, filling, count, selected: false
                    });

                    if (r.length >= max) {
                        return r;
                    }

                }
            }
        }
    }

    return r;
}


export function createReducedDeck(features: IFeatrues): ICard[] {
    return createDeck().filter(c => {
        let r = true;

        if (typeof features.count === "number") {
            r = r && (c.count === features.count)
        }
        if (typeof features.shape === "number") {
            r = r && (c.shape === features.shape)
        }
        if (typeof features.color === "number") {
            r = r && (c.color === features.color)
        }
        if (typeof features.filling === "number") {
            r = r && (c.filling === features.filling)
        }

        return r;
    });
}

export function shuffle(deck: ICard[], seed: number = -1) {

    let lSeed = seed;

    if (seed === -1) {
        lSeed = generator.int();
    }
    generator.seed(lSeed);

    deck.sort(() => 0.5 - generator.random());
    deck.sort(() => 0.5 - generator.random());
    deck.sort(() => 0.5 - generator.random());

    return lSeed;
}


export function sameOrDifferent(v1: number, v2: number, v3: number): boolean {
    if (v1 === v2 && v2 === v3) {
        return true;
    }

    if (v1 !== v2 && v2 !== v3 && v3 !== v1) {
        return true;
    }

    return false;
}


export function isSet(c1: ICard, c2: ICard, c3: ICard): boolean {
    return sameOrDifferent(c1.shape, c2.shape, c3.shape) &&
        sameOrDifferent(c1.color, c2.color, c3.color) &&
        sameOrDifferent(c1.filling, c2.filling, c3.filling) &&
        sameOrDifferent(c1.count, c2.count, c3.count);
}


export function getMissing(c1: ICard, c2: ICard): ICard {
    let color: number;
    let shape: number;
    let filling: number;
    let count: number;

    if (c1.color === c2.color) {
        color = c1.color
    } else {
        color = 3 - c1.color - c2.color;
    }

    if (c1.shape === c2.shape) {
        shape = c1.shape
    } else {
        shape = 3 - c1.shape - c2.shape;
    }

    if (c1.filling === c2.filling) {
        filling = c1.filling
    } else {
        filling = 3 - c1.filling - c2.filling;
    }

    if (c1.count === c2.count) {
        count = c1.count
    } else {
        count = 6 - c1.count - c2.count;
    }

    return {color, count, filling, shape}

}

export function checkForSet(cards: ICard[]): boolean {

    for (let c1 of cards) {
        for (let c2 of cards) {
            if (c1 === c2) {
                continue;
            }
            for (let c3 of cards) {
                if (c1 === c3 || c2 === c3) {
                    continue;
                }

                if (isSet(c1, c2, c3)) {
                    return true;
                }
            }
        }
    }
    return false;
}

export function getASet(cards: ICard[]): ICard[] {

    for (let c1 of cards) {
        for (let c2 of cards) {
            if (c1 === c2) {
                continue;
            }
            for (let c3 of cards) {
                if (c1 === c3 || c2 === c3) {
                    continue;
                }

                if (isSet(c1, c2, c3)) {
                    return [c1, c2, c3];
                }
            }
        }
    }
    return [];
}