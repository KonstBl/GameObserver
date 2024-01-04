import {IAuthTokens} from "./tokens.interface";
import {IRegisterUser} from "./register.interface";
import {ILoginUser} from "./login.interface";
import { IUser } from "../user";

export class IAuthService {
    register: (data: IRegisterUser) => Promise<IUser>
    login: (data: ILoginUser) => Promise<IUser & IAuthTokens>
}