export interface IGame {
    id: string,
    name: string,
    description?: string,
    // rating: string,
    genre?: string,
    age?: string,
    developer?: string,
    country?: string,
    image?: string,
    realizeDate?: Date,
    createdAt: Date
}

export interface IGameCreateInput {
    name: string,
    description: string,
    // rating: string,
    genre?: string,
    age?: string,
    developer?: string,
    country?: string,
    image: string,
    realizeDate: Date
}

export interface IGameUpdateInput {
    name?: string,
    description?: string,
    rating?: string,
    genre?: string,
    age?: string,
    developer?: string,
    country?: string,
    image?: string,
    realizeDate?: Date
}