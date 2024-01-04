import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { IBlogUpdateInput } from "src/abstractions/blog";

export class BlogUpdateBodyRequest implements IBlogUpdateInput {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    image?: string
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    text?: string;
}