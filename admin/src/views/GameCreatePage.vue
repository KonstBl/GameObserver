<template>
    <body>
        <div class="container">
          <h1>Input game information</h1>
          <b-form @submit.prevent="createGame">
            <validation-provider rules="required" v-slot="{ errors }">
              <b-form-group label="Name" label-for="gameName">
                <b-form-input id="gameName" v-model="game.name"></b-form-input>
                <span>{{ errors[0] }}</span>
              </b-form-group>
            </validation-provider>
            <b-form-group label="Image (512x512)" label-for="gameImage">
              <file-uploader
              v-model="gameFile"
              />
            </b-form-group>
            <b-form-group label="Description" label-for="gameDescription">
              <b-form-textarea id="gameDescription" v-model="game.description" rows="5"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Release date" label-for="gameReleaseDate">
              <validation-provider rules="required" v-slot="{ errors }">
                <b-form-datepicker id="gameReleaseDate" v-model="game.realizeDate"></b-form-datepicker>
                <span>{{ errors[0] }}</span>
              </validation-provider>
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
            <b-button variant="primary" @click="createGame">Save</b-button>
          </b-form>
        </div>
    </body>
      </template>
      
      <script lang="ts">
    import { Component, Vue } from 'vue-property-decorator' 
    import { Game } from './GamesView.vue';
    import { GamesApi } from '@/api/games';
    import { ValidationProvider, extend } from 'vee-validate';
    import { required } from 'vee-validate/dist/rules';
    import FileUploader from '@/components/FileUploader.vue';
    import { UploadApi } from '@/api/upload';
    
    extend('required', {
      ...required,
      message: 'This field is required'
    });
    
    @Component({components: {ValidationProvider, FileUploader}})
      export default class GameCreatePage extends Vue {
        public game: Game={}
        public gameFile: File | null = null
    
      async createGame() {
        if (this.gameFile) {
        const formData = new FormData()
        formData.append('file', this.gameFile as Blob)
        const fileData = await UploadApi.fileUpload(formData)
        this.game.image = fileData.id
      }
      const game = await GamesApi.createGame(this.game)
      await this.$router.push({name: 'gamesAdm'})
      window.location.reload()
      return game
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
      