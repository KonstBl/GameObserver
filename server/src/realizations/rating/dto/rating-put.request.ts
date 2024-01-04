import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import Decimal from "decimal.js";
import { IPutRating } from "src/abstractions/rating";

export class RatingPutBodyRequest {
    @ApiProperty()
    @IsString()
    gameId: string

    @ApiProperty({type: String})
    @Type(()=> String)
    rating: Decimal
}