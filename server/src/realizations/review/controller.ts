import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {ReviewService} from "./service";
import {WebGuard} from "../auth/guard/guard";
import {ReviewCreateBodyRequest} from "./dto/review-create.request";
import {User} from "../auth/guard/decorator";
import {IRequestUser} from "../../abstractions/user";
import {ReviewUpdateBodyRequest} from "./dto/review-update.request";

@ApiTags("Review")
@Controller("review")
export class ReviewController {
    constructor(
        private reviewService: ReviewService,
    ){}

    @ApiOperation({ summary: "Create review" })
    @ApiBearerAuth()
    @UseGuards(WebGuard)
    @Post()
    async create(@User() user: IRequestUser, @Body() data: ReviewCreateBodyRequest) {
        return this.reviewService.create({ userId: user.id, ...data })
    }

    @ApiOperation({ summary: "Find all reviews" })
    @Get()
    async findAll() {
        return this.reviewService.findAll()
    }

    @ApiOperation({ summary: "Get game reviews"})
    @Get("game/:gameId")
    async getGameReviews(@Param("gameId") gameId: string) {
        return this.reviewService.getGameReviews(gameId)
    }

    @ApiOperation({ summary: "Find one review"})
    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.reviewService.findOne(id)
    }

    @ApiOperation({ summary: "Update review"})
    @ApiBearerAuth()
    @UseGuards(WebGuard)
    @Put(":id")
    async update(
        @Param("id") id: string,
        @Body() data: ReviewUpdateBodyRequest
    ) {
        return this.reviewService.update(id, data)
    }

    @ApiOperation({ summary: "Delete review"})
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.reviewService.delete(id)
    }
}