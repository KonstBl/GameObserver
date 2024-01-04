import {ForbiddenException, Injectable} from "@nestjs/common";
import {IAuthTokens} from "../../abstractions/auth/tokens.interface";
import {v4} from "uuid";
import * as jwt from 'jsonwebtoken'
import {ConfigService} from "@nestjs/config";
import {JwtPayload} from "jsonwebtoken";
import {IAuthTokenService} from "../../abstractions/jwt/service.interface";
import { UserService } from "../user/service";
import { IRequestUser, IUser } from "src/abstractions/user";

@Injectable()
export class AuthTokensService implements IAuthTokenService {
    constructor(
        private configService: ConfigService,
        private userService: UserService
    ) {}

    private jwtAccessTokenTTL = this.configService.get('ACCESS_TOKEN_TTL_SEC')
    private jwtRefreshTokenTTL = this.configService.get('REFRESH_TOKEN_TTL_SEC')
    private jwtSecret = this.configService.get('JWT_SECRET')

    async generateAuthTokensForUser(userId: string): Promise<IAuthTokens> {
        const refresh_token_id = v4();
        const userPayload = {
            id: userId,
            refresh_token_id,
        };

        const refreshToken = jwt.sign(userPayload, this.jwtSecret, {
            expiresIn: `${this.jwtRefreshTokenTTL}s`,
        });
        const accessToken = jwt.sign(
            {
                ...userPayload,
                refreshToken,
            },
            this.jwtSecret,
            {
                expiresIn: `${this.jwtAccessTokenTTL}s`,
            },
        );
        const now = Date.now()
        return {
            access_token: accessToken,
            access_token_ttl: now + this.jwtAccessTokenTTL * 1000,
            refresh_token: refreshToken,
            refresh_token_ttl: now + this.jwtRefreshTokenTTL * 1000,
        };
    }

    async verifyUserAuthByAccessToken(accessToken: string): Promise<IUser & IRequestUser> {
        try {
            const { refreshToken, id } = jwt.verify(accessToken, this.jwtSecret) as JwtPayload;
            const user = await this.verifyUserAuthByRefreshToken(refreshToken, id);
            return {
                ...user,
                refreshToken,
            };
        } catch (e) {
            throw new ForbiddenException();
        }
    }

    async verifyUserAuthByRefreshToken(refreshToken: string, userId: string): Promise<IUser> {
        try {
            const payload = jwt.decode(refreshToken);
            if (payload['id'] !== userId) throw Error();
            return this.userService.getById(userId)
        } catch (e) {
            throw new ForbiddenException();
        }
    }
}