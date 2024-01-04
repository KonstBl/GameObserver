import {IReviewUpdateInput} from "../../../abstractions/review";
import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class ReviewUpdateBodyRequest implements Partial<IReviewUpdateInput> {
    @ApiProperty()
    @IsString()
    content: string
}