import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { IUserCreateInput } from "src/abstractions/user";

export class UserCreateBodyRequest implements IUserCreateInput {
    
    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    userName: string

    @ApiProperty()
    @IsString()
    email: string
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    image?: string
}