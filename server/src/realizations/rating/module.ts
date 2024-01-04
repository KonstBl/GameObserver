import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from "./entity";
import { RatingController } from "./controller";
import { RatingService } from "./service";
import { GameModule } from '../game/module';

@Module({
    imports: [
      TypeOrmModule.forFeature([Rating]),
      GameModule
    ],
    controllers: [RatingController],
    providers: [RatingService],
  })
  export class RatingModule {}