import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import Decimal from "decimal.js";
import { IGameUpdateInput } from "src/abstractions/game";

export class GameUpdateBodyRequest implements IGameUpdateInput {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string

    // @ApiProperty({type: String})
    // @Type(()=> String)
    // @IsOptional()
    // rating?: Decimal
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    image?: string

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
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @Type(() => String)
    realizeDate?: Date
}