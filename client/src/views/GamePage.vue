<template>
  <body>
    <!-- <div>
      <review-list :game="game" :reviews="reviews"></review-list>
    </div> -->
    <b-container
      class="bv-example-row d-flex justify-content-center align-items-center"
    >
      <b-row>
        <b-col md="5">
          <b-img
            class="mt-4"
            :src="getGameImage(game.image)"
            :alt="game.name"
            width="300"
            height="300"
            style="z-index: 0"
          />
          <ul class="pl-3">
            <li>
              <strong
                >Date of release: {{ game.realizeDate | date("short") }}</strong
              >
            </li>
            <li>
              <strong>Genre: {{ game.genre }}</strong>
            </li>
            <li>
              <strong>Age rating: {{ game.age }}</strong>
            </li>
            <li>
              <strong>Country: {{ game.country }}</strong>
            </li>
            <li>
              <strong>Developer: {{ game.developer }}</strong>
            </li>
          </ul>
          <GameRating
            v-model="gameRating"
            :disabled="isRatingDisabled"
            @handle-rating-change="onRatingChange"
          />
        </b-col>
        <b-col md="6" class="text-left mt-4" style="text-align: justify">
          <h3>{{ game.name }}</h3>
          <p>{{ game.description }}</p>
          <!-- Add more product details or any other content as needed -->
        </b-col>
      </b-row>
    </b-container>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="12">
          <ReviewsList
            :game="game"
            :reviews="reviews"
            @refetch-reviews="setGameReviews"
          />
        </b-col>
      </b-row>
    </b-container>
  </body>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { GamesApi } from "@/api/games";
import { Game, Review } from "@/views/GamesView.vue";
import { ReviewsApi } from "@/api/reviews";
import ReviewsList from "@/components/game/ReviewsList.vue";
import GameRating from "@/components/game/Rating.vue";
import { RatingApi } from "@/api/rating";
import {getImage} from "@/utils/image";

@Component({ components: { ReviewsList, GameRating } })
export default class GamePage extends Vue {
  public game: Game = {};
  public reviews: Review[] = [];
  public gameRating = 0;
  public isRatingDisabled = true;

  get gameId(): string {
    return this.$router.currentRoute.params.id;
  }

  async beforeMount() {
    this.game = await this.getGame();
    await this.setGameReviews();
    this.gameRating = await this.getCalculatedGameRating();
    this.isRatingDisabled = await this.isUserAlreadyRateAGame();
  }

  async setGameReviews() {
    this.reviews = (await this.getGameReviews()) as Review[];
  }

  async getGame() {
    return await GamesApi.getGame(this.gameId);
  }

  async getGameReviews() {
    return await ReviewsApi.getGameReviews(this.gameId);
  }

  async getCalculatedGameRating() {
    return await RatingApi.getGameRating(this.gameId);
  }

  async isUserAlreadyRateAGame() {
    return await RatingApi.isUserRatedAGame(this.gameId);
  }

  async rateGame(rating: number) {
    await RatingApi.rateGame({ gameId: this.gameId, rating });
  }

  getGameImage(id: string) {
    return getImage(id);
  }

  async onRatingChange(newRating: number) {
    debugger;
    await this.rateGame(newRating);
    this.gameRating = await this.getCalculatedGameRating();
    this.isRatingDisabled = true;
  }
}
</script>
