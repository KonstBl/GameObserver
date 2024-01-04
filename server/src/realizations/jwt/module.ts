import { Module } from "@nestjs/common";
import { UserModule } from "../user/module";
import { AuthTokensService } from "./service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [UserModule, ConfigModule],
    providers: [AuthTokensService],
    exports: [AuthTokensService]
})
export class JwtModule {}