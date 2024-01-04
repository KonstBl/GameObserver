<template>
<body id="main">
  <div id="content">
    <b-button :to="{name: 'GameCreate'}" size="md" style="margin: 2px;">Add a game</b-button>
    <b-form>
      <b-form-group>
        <b-form-input placeholder="Search by title..." debounce="100" class="m-2" @input="searchGames"></b-form-input>
      </b-form-group>
    </b-form>
    <div v-if="games.length">
    <b-container class="bv-example-row" v-for="game in games" :key="game.id">  
      <!-- <b-col v-for="game in games" :key="game.id" class="mr-auto p-3" cols="4" > -->
          <div class="d-flex justify-content-center align-items-center">
            <GameCard
            :game="game"
          />
          </div>
    </b-container>
  </div>
  <div v-else>
    Loading...
  </div>
</div>
</body>
</template>

<script lang="ts">
 import GameCard from '@/components/GameCard.vue'
 import {Component, Vue, Prop} from 'vue-property-decorator';
 import { GamesApi } from '@/api/games';
import { ReviewsApi } from '@/api/reviews';



  export interface Game {
    id?: string,
    name?: string,
    description?: string,
    genre?: string,
    age?: string,
    developer?: string,
    country?: string,
    rating?: string,
    image?: string,
    reviews?: Review[],
    realizeDate?: Date,
    createdAt?: Date
  }

  export interface Review {
    userId?: string,
    gameId?: string,
    content?: string
  }

  interface Search {
    title: string
  }

 @Component({components:{GameCard}})
 export default class GamesView extends Vue {
  
  public games: Game[]=[]

  loading: boolean = false

  async beforeMount() {
    this.loading = true
    this.games = await this.getGames()
    this.loading = false
  }

  async getGames() {
    return await GamesApi.getGames()
  }

  async searchGames(value: string) {
    this.loading = true
    if (value?.length) {
      this.games = await GamesApi.searchGames(value)
    } else {
      this.games = await this.getGames()
    }
    this.loading = false
    await this.$nextTick()
  }
}
</script>

<style scoped>
  body#main {
    background-color: #7798b0;
  
  }
  .bv-example-row {
    background-color: #b6c9ca;
    max-width: 70%;
    margin: 0 auto;
  }
</style>