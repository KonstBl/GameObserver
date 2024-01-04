<template>
<body id="main">
  <b-overlay :show="loading" rounded="sm">
    <div id="content">
      <div class="container">
          <b-row>
            <b-form-input placeholder="Search by title..." debounce="100" class="m-2" @input="searchGames"></b-form-input>
          </b-row>
          <b-row class="d-flex justify-content-end">
            <my-trending-up-icon class="m-1" @on-click="sortByRatingUp()"></my-trending-up-icon>
            <my-trending-down-icon class="m-1" @on-click="sortByRatingDown()"></my-trending-down-icon>
            <my-filter-icon v-b-toggle.sidebar-filter>Filter</my-filter-icon>
            <b-sidebar id="sidebar-filter" title="Sidebar" shadow>
              <div class="px-3 py-2">
                <b-col class="text-right">
                <my-x-icon v-b-toggle.sidebar-filter></my-x-icon>
                </b-col>
                <h2>Filter by genre:</h2>
                <b-button class="m-1" v-on:click="disableFilter()">None</b-button>
               <b-button class="m-1" v-on:click="sortByGenre('fps')">Fps</b-button>
               <b-button class="m-1" v-on:click="sortByGenre('survival')">Survival</b-button>
               <b-button class="m-1" v-on:click="sortByGenre('rpg')">Rpg</b-button>
               <b-button class="m-1" v-on:click="sortByGenre('adventure')">Adventure</b-button>
               <b-button class="m-1" v-on:click="sortByGenre('horror')">Horror</b-button>
               <b-button class="m-1" v-on:click="sortByGenre('simulator')">Simulator</b-button>

              </div>
            </b-sidebar>
          </b-row>
      </div>
    <div v-if="games.length">
      <b-container class="bv-example-row">
        <b-row id="row">
          <b-col v-for="game in games" :key="game.id" class="mr-auto p-3" cols="4" >
            <div class="d-flex justify-content-center align-items-center">
            <GameCard
            style="width:300px; height: 500px;"
            :game="game"
            />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div v-else>
      Loading...
    </div>
    </div>
  </b-overlay>
</body>
</template>

<script lang="ts">
import { BButton } from 'bootstrap-vue'
 import GameCard from '@/components/GameCard.vue'
 import {Component, Vue} from 'vue-property-decorator';
 import { GamesApi } from '@/api/games';
 import MyFilterIcon from '@/components/icons/MyFilterIcon.vue';
 import MyTrendingUpIcon from '@/components/icons/MyTrendingUpIcon.vue'
 import MyTrendingDownIcon from '@/components/icons/MyTrendingDownIcon.vue'
import MyXIcon from '@/components/icons/MyXIcon.vue';

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
    realizeDate?: string,
    createdAt?: string,
  }

  export interface Review {
    id?: string,
    userId?: string,
    gameId?: string,
    content?: string,
    user: ReviewUser
  }

  export interface ReviewUser {
    userName: string,
    email: string,
    image: string
  }

  interface Search {
    title: string
  }

 @Component({components:{GameCard, MyXIcon, MyFilterIcon, MyTrendingUpIcon, MyTrendingDownIcon}})
 export default class GamesView extends Vue {
  
  public games: Game[]=[]
  public reviews: Review[]=[]

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

  async sortByRatingUp() {
    this.loading = true
    this.games = await GamesApi.sortByRatingUp()
    this.loading = false
  }

  async sortByRatingDown() {
    this.loading = true
    this.games = await GamesApi.sortByRatingDown()
    this.loading = false
  }

  async disableFilter() {
    return this.games = await this.getGames()
  }

  async sortByGenre(genre: string) {
    this.loading = true
    if (genre?.length) {
      this.games = await GamesApi.sortByGenre(genre)
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