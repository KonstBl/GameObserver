export interface IUser {
    id: string,
    userName: string,
    email: string,
    password: string,
    image?: string,
    createdAt: Date
}

export interface IUserCreateInput {
    userName: string,
    email: string,
    password: string,
    image?: string,
}

export interface IUserUpdateInput {
    userName?: string,
    email?: string,
    password?: string,
    image?: string,
}

export interface IRequestUser {
    id: string,
    refreshToken: string,
}