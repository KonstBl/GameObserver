import { Module } from '@nestjs/common';
import { GameModule } from './realizations/game/module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './realizations/blog/module';
import { AuthModule } from './realizations/auth/module';
import {ReviewModule} from "./realizations/review/module";
import {UserModule} from "./realizations/user/module";
import { RatingModule } from './realizations/rating/module';
import {UploadModule} from "./realizations/upload/module";
import {ImageModule} from "./realizations/image/module";

const ormConfig = require("../ormconfig.js")

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_STRING,
      entities: [__dirname + '/**/entity{.ts,.js}'],
      synchronize: true
    }),
    UserModule, GameModule, BlogModule, AuthModule, ReviewModule, RatingModule, UploadModule, ImageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
