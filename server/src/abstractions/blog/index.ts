export interface IBlog {
    id: string,
    name: string,
    image: string,
    userId: string,
    text: string,
    createdAt: Date
}

export interface IBlogCreateInput {
    name: string,
    image: string,
    text: string,
    userId: string
}

export interface IBlogUpdateInput {
    name?: string,
    image?: string,
    text?: string
}