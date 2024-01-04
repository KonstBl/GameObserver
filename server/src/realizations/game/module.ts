import { Module } from '@nestjs/common';
import { GameService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entity';
import { GameController } from './controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game])
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService]
})
export class GameModule {}