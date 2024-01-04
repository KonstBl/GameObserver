import {IAuthTokens} from "../auth/tokens.interface";
import { IRequestUser, IUser } from "../user";

export interface IAuthTokenService {
    generateAuthTokensForUser: (userId: string) => Promise<IAuthTokens>
    verifyUserAuthByAccessToken: (accessToken: string) => Promise<IUser & IRequestUser>
    verifyUserAuthByRefreshToken: (refreshToken: string, userId: string) => Promise<IUser>
}