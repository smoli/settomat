import {ICard} from "./ICard.ts";

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

export function shuffle(deck: ICard[]) {
    deck.sort(() => 0.5 - Math.random());
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