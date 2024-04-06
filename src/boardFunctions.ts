import {ICard} from "./ICard.ts";
import {getASet, getMissing, shuffle} from "./deckFunctions.ts";


type Board = (ICard | boolean)[];

export function createEmptyBoard(size: number): Board {
    return Array.from(Array(size).keys()).map(() => false);
}


export function growBoard(b: Board, add: number): Board {
    return [...b, ...Array.from(Array(add).keys()).map(() => false)];
}


export function rearrangeArray(b: any[], emptyValue: any = false): any[] {
    const r = [...b];

    r.sort((a, b) => {
        if (a === emptyValue) {
            return 1;
        }

        if (b === emptyValue) {
            return -1;
        }

        return 0;
    });

    return r;
}

export function rearrangeBoard(b: Board): Board {
    return rearrangeArray(b, false);
}

export function removeCardsFromDeck(deck: ICard[], cards: ICard[]) {
    return deck.filter(c => cards.findIndex(r => c.shape === r.shape && c.color === r.color && c.filling === r.filling && c.count === r.count) === -1);
}

export function removeCardsFromBoard(board: Board, cards: ICard[]): Board {
    return board.map(c => {
        if (typeof c === "boolean") {
            return c;
        }

        if (cards.indexOf(c) !== -1) {
            return false;
        } else {
            return c;
        }
    })
}

export function pickCardsFromTop(deck: ICard[], count: number): ICard[] {
    if (deck.length < count) {
        throw  new Error("Not enough cards");
    }

    const r = [];
    for (let i = 0; i < count; i++) {
        r.push(deck[i]);
    }

    return r;
}

export function pickCardsFromBottom(deck: ICard[], count: number): ICard[] {
    if (deck.length < count) {
        throw  new Error("Not enough cards");
    }

    const r = [];
    for (let i = 0; i < count; i++) {
        r.push(deck[deck.length - i - 1]);
    }

    return r;
}

export function getMissingCard(c1: ICard, c2: ICard, otherCards: ICard[]): number {
    const m = getMissing(c1, c2);
    return otherCards.findIndex(r => r.color === m.color && r.count === m.count && r.shape === m.shape && r.filling === m.filling);
}


function pickMissing(cards1: ICard[], cards2: ICard[]): ICard[] {
    const pick: ICard[] = []

    for (let c1 of cards1) {
        for (let c2 of cards1) {
            if (c1 === c2) {
                continue;
            }

            const m = getMissingCard(c1, c2, cards2);

            if (m !== -1) {
                pick.push(c1);
                pick.push(c2);
                pick.push(cards2[m]);
                break;
            }
        }
        if (pick.length) {
            break;
        }
    }

    return pick;
}

export function pickCardsToFormSet(board: Board, deck: ICard[], seed:number): ICard[] {
    const empties = getEmptySlotCount(board);
    const cards: ICard[] = board.filter(c => typeof c !== "boolean") as ICard[];

    if (getASet(cards).length === 3) {
        return [];
    }


    // Shuffling here should reduce the top left bias of sets when laying out the board
    shuffle(cards, seed);

    let set = pickMissing(cards, deck);

    if (!set.length) {
        set = pickMissing(deck, cards);
    } else {
        return [set[2]];
    }

    if (set.length) {
        return [set[0], set[1]];
    }

    if (empties >= 3) {
        return getASet(deck);
    }

    return [];

}

export function getEmptySlotCount(board: Board): number {
    return board.filter(c => typeof c === "boolean").length
}

export function fillEmptySlots(board: Board, cards: ICard[]): Board {
    let i = 0;

    return board.map(c => {
        if (typeof c === "boolean") {
            return cards[i++];
        } else {
            return c;
        }
    })
}