import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { IBlogCreateInput } from "src/abstractions/blog";

export class BlogCreateBodyRequest {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    text: string
    
    @ApiProperty()
    @IsString()
    image: string   
}