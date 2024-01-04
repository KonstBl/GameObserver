<template>
  <div>
    <b-card class="fixed-size-card m-1">
      <div>
      <b-card-title>{{ game.name }}</b-card-title>
      </div>
      <div class="d-flex justify-content-end">
        <b-button :to="{name: 'GameUpdate', params: { id : game.id } }" size="sm" style="margin: 2px;">Update</b-button>
        <b-button size="sm" style="margin: 2px;" @click="deleteGame">Delete</b-button>
      </div>
    </b-card>
  </div>
</template>
  
  <script lang="ts">
import { BCard} from 'bootstrap-vue'
import {Component, Prop, Vue} from 'vue-property-decorator' 
import { Game } from '../views/GamesView.vue'
import { GamesApi } from '@/api/games'

  @Component({})
  export default class GameCard extends Vue {
    @Prop() game!: Game


    async deleteGame() {
      if (confirm("Confirm delete")) {
        await GamesApi.deleteGame(this.game.id as string)
} else {
  return
}
    window.location.reload()
  } 

  }

  </script>
  
  <style>
.fixed-size-card {
  width: 500px;
  height: 100px;
}
</style>