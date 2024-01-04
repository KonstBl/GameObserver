import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WebGuard extends AuthGuard("jwt") {}

export class OptionalJwtGuard extends WebGuard {
    handleRequest(_err, user) {
        return user
    }
}

