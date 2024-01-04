import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags} from "@nestjs/swagger";
import { UserService } from "./service";
import { UserCreateBodyRequest } from "./dto/user-create.request";
import { UserUpdateBodyRequest } from "./dto/user-update.request";
import { WebGuard } from "../auth/guard/guard";
import { User } from "../auth/guard/decorator";
import { IRequestUser } from "src/abstractions/user";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(
        private userService: UserService,
    ){}

    @ApiOperation({ summary:"Create user"})
    @Post()
    async create(@Body() data: UserCreateBodyRequest) {
        return this.userService.create(data)
    }

    @ApiOperation({summary: "Find all users"})
    @Get()
    async findAll() {
        return this.userService.findAll()
    }

    @ApiOperation({
        summary: 'Get user info',
      })
      @ApiBearerAuth()
      @UseGuards(WebGuard)
      @Get('profile')
      async getUserInfo(@User() user: IRequestUser) {
        return await this.userService.getById(user.id);
      }

    @ApiOperation({summary: "Get user by id"})
    @Get(":id")
    async getById(@Param("id") id: string) {
        return this.userService.getById(id)
    }

    @ApiOperation({summary: "Get user by email"})
    @Get(":email")
    async findByEmail(@Param("email") email: string) {
        return this.userService.getById(email)
    }

    @ApiOperation({summary: "Get user by username"})
    @Get(":username")
    async getByUsername(@Param("username") username: string) {
        return this.userService.getByUsername(username)
    }

    @ApiOperation({ summary:"Search users"})
    @Get("search/:userName")
    async search(@Param("userName") userName: string) {
        return this.userService.search(userName)
    }

    @ApiOperation({ summary:"Update user"})
    @Put(":id")
    async update(
        @Param("id") id: string, 
        @Body() data: UserUpdateBodyRequest
    ) {
        return this.userService.update(id, data)
    }

    @ApiOperation({ summary: "Delete user"})
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.userService.delete(id)
    }

    @Post('upload/avatar')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBearerAuth()
    @UseGuards(WebGuard)
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    uploadImage(@User() user: IRequestUser, @UploadedFile() file: Express.Multer.File) {
        return this.userService.uploadAvatar(user.id, file)
    }
}