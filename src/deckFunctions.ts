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


export function setSeed(seed: number = -1) {
    if (seed === -1) {
        const ls = generator.int();
        generator.seed(ls);
        return ls;
    }
    generator.seed(seed);
    return seed;
}

export function shuffle(deck: ICard[], iterations: number = 1) {

    function internal() {
        const r = [];

        while (deck.length) {
            const i = Math.floor(generator.random() * deck.length);
            r.push(deck[i]);

            deck.splice(i, 1);
        }

        deck.push(...r);
    }

    for (let i = 0; i < iterations; i++) {
        internal();
    }
}


function different(v1: number, v2: number, v3: number): boolean {
    return v1 !== v2 && v2 !== v3 && v3 !== v1;
}

export function sameOrDifferent(v1: number, v2: number, v3: number): boolean {
    if (v1 === v2 && v2 === v3) {
        return true;
    }

    return different(v1, v2, v3);
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

export function getDifferingFeatureCount(c1: ICard, c2: ICard, c3: ICard): number {
    return (different(c1.shape, c2.shape, c3.shape) ? 1 : 0) +
        (different(c1.color, c2.color, c3.color) ? 1 : 0) +
        (different(c1.count, c2.count, c3.count) ? 1 : 0) +
        (different(c1.filling, c2.filling, c3.filling) ? 1 : 0);
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

    /* const cards1 = [...cards];
     const cards2 = [...cards];
     const cards3 = [...cards];

     shuffle(cards1);
     shuffle(cards2);
     shuffle(cards3);

     for (let c1 of cards1) {
         for (let c2 of cards2) {
             if (c1 === c2) {
                 continue;
             }
             for (let c3 of cards3) {
                 if (c1 === c3 || c2 === c3) {
                     continue;
                 }

                 if (isSet(c1, c2, c3)) {
                     return [c1, c2, c3];
                 }
             }
         }
     }*/

    const cards1 = [...cards];

    function get(cards: ICard[]) {
        return cards[Math.floor(generator.random() * cards.length)]
    }

    function rem(cards: ICard[], c: ICard) {
        cards.splice(cards.indexOf(c), 1);
    }


    while (cards1.length) {
        const c1 = get(cards1);
        const cards2 = [...cards];

        while (cards2.length) {
            const c2 = get(cards2);

            if (c1 !== c2) {
                const cards3 = [...cards];

                while (cards3.length) {
                    const c3 = get(cards3);

                    if (c1 !== c2 && c2 !== c3 && c1 !== c3) {
                        if (isSet(c1, c2, c3)) {
                            return [c1, c2, c3]
                        }
                    }
                    rem(cards3, c3);
                }
            }
            rem(cards2, c2);
        }
        rem(cards1, c1);
    }
    /*
        const indexes1 = Array.from(Array(cards.length)).map((_, i) => i);
        const indexes2 = [...indexes1];
        const indexes3 = [...indexes1];

        indexes1.sort(() => 0.5 - generator.random());
        indexes2.sort(() => 0.5 - generator.random());
        indexes3.sort(() => 0.5 - generator.random());

        for (let a of indexes1) {
            for (let b of indexes2) {
                if (a === b) {
                    continue;
                }

                for (let c of indexes3) {
                    if (a === b || b === c || a === c) {
                        continue;
                    }

                    const c1 = cards[a];
                    const c2 = cards[b];
                    const c3 = cards[c];

                    if (isSet(c1, c2, c3)) {
                        return [c1, c2, c3]
                    }
                }
            }
        }*/

    return [];
}