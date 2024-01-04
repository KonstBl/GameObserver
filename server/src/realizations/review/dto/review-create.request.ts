import {IReviewCreateInput} from "../../../abstractions/review";
import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class ReviewCreateBodyRequest implements Partial<IReviewCreateInput> {
    @ApiProperty()
    @IsString()
    gameId: string

    @ApiProperty()
    @IsString()
    content: string
}