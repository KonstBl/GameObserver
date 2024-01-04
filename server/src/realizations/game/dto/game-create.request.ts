import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import Decimal from "decimal.js";
import { IGameCreateInput } from "src/abstractions/game";

export class GameCreateBodyRequest implements IGameCreateInput {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    description: string

    // @ApiProperty({type: String})
    // @Type(()=> String)
    // @IsOptional()
    // rating?: Decimal
    
    @ApiProperty()
    @IsString()
    image: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    genre?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    age?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    country?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    developer?: string
    
    @ApiProperty()
    @IsString()
    @Type(() => String)
    realizeDate: Date
}