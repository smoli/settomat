import {ICard} from "./ICard.ts";


type Board = (ICard | boolean)[];

export function createEmptyBoard(size: number): Board {
    return Array.from(Array(size).keys()).map(() => false);
}

export function fillBoard(board: Board, deck: ICard[]): Board {
    return board.map(b => {
        if (typeof b === "boolean") {
            if (deck.length > 0) {
                return deck.pop() as ICard;
            }
        }

        return b;
    })
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

       return  0;
    });

    return r;
}

export function rearrangeBoard(b: Board): Board {
    return rearrangeArray(b, false);
}