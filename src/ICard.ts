
export interface ICard {
    shape: number,
    color: number,
    filling: number,
    count: number,
    selected?: boolean,
    correct?: boolean,
    error?: boolean
}