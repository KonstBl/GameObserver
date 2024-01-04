export interface IReview {
    id: string,
    userId: string,
    content: string,
    createdAt: Date
}

export interface IReviewCreateInput {
    userId: string,
    gameId: string,
    content: string
}

export interface IReviewUpdateInput {
    content?: string
}