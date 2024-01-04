import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger"
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common"
import { BlogService } from "./service"
import { BlogCreateBodyRequest } from "./dto/blog-create.request"
import { IBlogUpdateInput } from "src/abstractions/blog"
import { BlogUpdateBodyRequest } from "./dto/blog-update.request"
import { IRequestUser } from "src/abstractions/user"
import { WebGuard } from "../auth/guard/guard"
import { User } from "../auth/guard/decorator"

@ApiTags("Blog")
@Controller("blog")
export class BlogController {
    constructor(
        private blogService: BlogService,
    ){}

    @ApiOperation({ summary:"Create blog"})
    @Post()
    @ApiBearerAuth()
    @UseGuards(WebGuard)
    async create(@Body() data: BlogCreateBodyRequest, @User() user: IRequestUser) {
        return this.blogService.create({ ...data, userId: user.id })
    }

    @ApiOperation({ summary:"Find all blogs"})
    @Get()
    async findAll() {
        return this.blogService.findAll()
    }

    @ApiOperation({ summary:"Find user blogs"})
    @ApiBearerAuth()
    @UseGuards(WebGuard)
    @Get('user/:id')
    async getUserBlogs(@User() user: IRequestUser) {
        return this.blogService.getUserBlogs(user.id)
    }

    @ApiOperation({ summary:"Find one blog"})
    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.blogService.findOne(id)
    }

    @ApiOperation({ summary:"Search blogs"})
    @Get("search/:title")
    async search(@Param("title") title: string) {
        return this.blogService.search(title)
    }

    @ApiOperation({ summary:"Update blog"})
    @Put(":id")
    async update(
        @Param("id") id: string, 
        @Body() data: BlogUpdateBodyRequest
    ) {
        return this.blogService.update(id, data)
    }

    @ApiOperation({ summary:"Delete blog"})
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.blogService.delete(id)
    }    
}