import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./service";
import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { RegisterUserRequest } from "./dto/register.request";
import { LoginUserRequest } from "./dto/login.request";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @ApiOperation({ summary:"SignUp"})
    @Post('sign-up')
    async signUp(@Body() data: RegisterUserRequest) {
        try {
        await this.authService.register(data)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Error',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            })
        }
    }  
    
    @ApiOperation({ summary:"Login"})
    @Post('login')
    async login(@Body() data: LoginUserRequest) {
        return this.authService.login(data)
    } 
}