import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ILoginUser } from "src/abstractions/auth/login.interface";

export class LoginUserRequest implements ILoginUser{
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;    
}