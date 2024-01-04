import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RatingService } from "./service";
import { WebGuard } from "../auth/guard/guard";
import { User } from "../auth/guard/decorator";
import { IRequestUser } from "src/abstractions/user";
import { RatingPutBodyRequest } from "./dto/rating-put.request";
import Decimal from "decimal.js";
import { Rating } from "./entity";

@ApiTags("Rating")
@Controller("rating")
export class RatingController {
constructor(private ratingService: RatingService) {}

    @ApiOperation({ summary: "Rate a game" })
    @ApiBearerAuth()
    @UseGuards(WebGuard)
    @Post()
    async rate(
    @User() user: IRequestUser,
    @Body() data: RatingPutBodyRequest
    ) {
        return await this.ratingService.rate({
        ...data,
        userId: user.id,
        });
    }

    @ApiOperation({summary:"Find calculated rating"})
    @Get(":id")
    async CalculateGameRating(@Param("id") id:string) {
        return {result: await this.ratingService.calculateRating(id)}
    }

    @ApiOperation({summary:"Check is user already rate a game"})
    @Get("game/:gameId")
    @ApiBearerAuth()
    @UseGuards(WebGuard)
    async IsUserRatedAGame(
        @Param("gameId") gameId: string,
        @User() user: IRequestUser,
    ) {
        return {result: await this.ratingService.isUserRatedAGame(user.id, gameId)}
    }
}