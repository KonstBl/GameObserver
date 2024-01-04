import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Review} from "./entity";
import {ReviewService} from "./service";
import {ReviewController} from "./controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Review])
    ],
    controllers: [ReviewController],
    providers: [ReviewService],
    exports: [ReviewService]
})
export class ReviewModule {}