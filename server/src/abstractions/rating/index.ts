import Decimal from "decimal.js";

export interface IRating {
    id: string,
    userId: string,
    gameId: string,
    rating: Decimal,
    createdAt: Date
}

export interface IPutRating {
    userId: string,
    gameId: string,
    rating: Decimal
}