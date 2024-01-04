import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {IRequestUser} from "../../../abstractions/user";
import {AuthTokensService} from "../../jwt/service";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private authService: AuthTokensService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(payload: IRequestUser & any): Promise<unknown> {
    try {
      const user = await this.authService.verifyUserAuthByRefreshToken(
          payload.refreshToken,
          payload.id,
      )
      payload.user = user
      return payload
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
