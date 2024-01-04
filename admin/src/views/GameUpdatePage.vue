<template>
<body>
    <div class="container">
      <h1>Update game information</h1>
      <h4>Game was added: {{game.createdAt}}</h4>
      <b-form @submit.prevent="saveChanges">
        <validation-provider rules="required" v-slot="{ errors }">
          <b-form-group label="Name" label-for="gameName">
            <b-form-input id="gameName" v-model="game.name"></b-form-input>
            <span>{{ errors[0] }}</span>
          </b-form-group>
        </validation-provider>
        <b-form-group label="Image (512x512)" label-for="gameName">
          <b-img 
          :src="getGameImage"
          width="250"
          height="250"
          class="p-3"></b-img>
          <file-uploader
          v-model="gameFile"
          />
        </b-form-group>
        <b-form-group label="Description" label-for="gameDescription">
          <b-form-textarea id="gameDescription" v-model="game.description" rows="5"></b-form-textarea>
        </b-form-group>
        <b-form-group label="Release date" label-for="gameReleaseDate">
          <b-form-datepicker id="gameReleaseDate" v-model="game.realizeDate"></b-form-datepicker>
        </b-form-group>
        <b-form-group label="Genre" label-for="gameGenre">
          <b-form-input id="gameGenre" v-model="game.genre"></b-form-input>
        </b-form-group>
        <b-form-group label="Age rating" label-for="gameAgeRating">
          <b-form-input id="gameAgeRating" v-model="game.age"></b-form-input>
        </b-form-group>
        <b-form-group label="Developer" label-for="gameDeveloper">
          <b-form-input id="gameDeveloper" v-model="game.developer"></b-form-input>
        </b-form-group>
        <b-form-group label="Country" label-for="gameCountry">
          <b-form-input id="gameCountry" v-model="game.country"></b-form-input>
        </b-form-group>
        <b-button variant="primary" @click="saveChanges">Save</b-button>
      </b-form>
    </div>
     <b-container class="bv-example-row">
      <b-row>
        <b-col cols=12>
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
import { Component, Vue } from 'vue-property-decorator' 
import { Game } from './GamesView.vue';
import { GamesApi } from '@/api/games';
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import ReviewsList from '@/components/game/ReviewsList.vue';
import { ReviewsApi } from '@/api/reviews';
import { getImage } from '@/utils/image';
import FileUploader from '@/components/FileUploader.vue';
import { UploadApi } from '@/api/upload';

extend('required', {
  ...required,
  message: 'This field is required'
});

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

@Component({components: {ValidationProvider, ReviewsList, FileUploader}})
  export default class GameUpdatePage extends Vue {
    public game: Game={}
    public reviews: Review[] = []
    public gameFile: File | null = null
    get gameId():string {
        return this.$router.currentRoute.params.id
    }
    async beforeMount() {
        this.game = await this.getGame() 
        await this.setGameReviews()       
    }

    get getGameImage() {
    if(!this.game.image) return
    return getImage(this.game.image);
  }

    async getGame() {
        return await GamesApi.getGame(this.gameId)
    }

    async saveChanges() {
      if (this.gameFile) {
        const formData = new FormData()
        formData.append('file', this.gameFile as Blob)
        const fileData = await UploadApi.fileUpload(formData)
        this.game.image = fileData.id
      }
      alert('Saved')
      return await GamesApi.updateGame(this.game.id as string, this.game)
    }

    async getGameReviews() {
      return await ReviewsApi.getGameReviews(this.gameId)
    }

    async setGameReviews() {
      this.reviews = await this.getGameReviews() as Review[]
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  body#main {
    background-color: #7798b0;
  }
  .bv-example-row {
    background-color: #b6c9ca;
    max-width: 70%;
    margin: 0 auto;
  }
  </style>