import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { IRegisterUser } from "src/abstractions/auth/register.interface";

export class RegisterUserRequest implements IRegisterUser{
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    userName: string;
}