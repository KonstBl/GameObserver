import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { IUserUpdateInput } from "src/abstractions/user";

export class UserUpdateBodyRequest implements IUserUpdateInput {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    userName?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    email?: string
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    image?: string
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    password?: string
}