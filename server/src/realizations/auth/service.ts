import {Injectable} from "@nestjs/common";
import {IRegisterUser} from "../../abstractions/auth/register.interface";
import {IAuthService} from "../../abstractions/auth/service.interface";
import {ILoginUser} from "../../abstractions/auth/login.interface";
import {IAuthTokens} from "../../abstractions/auth/tokens.interface";
import {AuthTokensService} from "../jwt/service";
import { UserService } from "../user/service";
import { IUser } from "src/abstractions/user";

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private userService: UserService,
        private jwtService: AuthTokensService
    ) {}

    async register(data: IRegisterUser): Promise<IUser> {
        return this.userService.create(data)
    }

    async login(data: ILoginUser): Promise<IUser & IAuthTokens> {
        const user = await this.userService.getByEmail(data.email)
        if (data.password !== user.password)
            throw new Error('Invalid email or password')
        const tokens = await this.jwtService.generateAuthTokensForUser(user.id)
        return {
            ...user,
            ...tokens
        }
    }
}