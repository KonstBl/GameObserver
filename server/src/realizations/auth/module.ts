import { Module } from "@nestjs/common";
import { UserModule } from "../user/module";
import { JwtModule } from "../jwt/module";
import { AuthService } from "./service";
import { AuthController } from "./controller";
import { WebGuard } from "./guard/guard";
import { ConfigModule } from "@nestjs/config";
import { User } from "../user/entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import {JwtStrategy} from "./guard/strategy";

@Module({
    imports: [UserModule, JwtModule, ConfigModule, TypeOrmModule.forFeature([User])],
    providers: [AuthService, JwtStrategy, WebGuard],
    exports: [AuthService, JwtStrategy, WebGuard],
    controllers: [AuthController]
})
export class AuthModule {}