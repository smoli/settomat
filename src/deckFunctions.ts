import {ICard} from "./ICard.ts";

export function createDeck(max: number = 81): ICard[] {
    const r: ICard[] = [];

    for (let shape = 0; shape < 3; shape++) {
        for (let color = 0; color < 3; color++) {
            for (let filling = 0; filling < 3; filling++) {
                for (let count = 1; count < 4; count++) {
                    r.push({
                        shape, color, filling, count, selected: false
                    })

                    if (r.length === max) {
                        return r;
                    }
                }
            }
        }
    }

    return r;
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