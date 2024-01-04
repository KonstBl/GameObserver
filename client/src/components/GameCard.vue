<template>
  <b-card
    :img-src="getGameImage(game.image)"
    no-body
    img-height="300"
    img-width="200"
    bg-variant="light"
    border-variant="secondary"
    tag="article"
    style="width: 300px; height: 500px"
    class="d-flex"
  >
    <template #header>
      <b-button
        :to="{ name: 'GamePage', params: { id: game.id } }"
        variant="link"
        style="text-decoration: none; color: black"
        >{{ game.name }}</b-button
      >
    </template>
    <b-card-body style="padding: 0.5rem">
      <b-card-text
        style="width: 285px; overflow: hidden; text-overflow: ellipsis"
      >
        <b-list-group flush>
          <b-list-group-item class="p-0" style="background-color: inherit"
            >Genre: {{ game.genre }}</b-list-group-item
          >
          <b-list-group-item class="p-0" style="background-color: inherit"
            >Release date:
            {{ game.realizeDate | date("short") }}</b-list-group-item
          >
        </b-list-group>
        <!-- {{game.description | truncate(100, '...')}} -->
      </b-card-text>
    </b-card-body>
    <template #footer class="p-0">
      <em>
        <b-form-rating
          id="rating-10"
          class="p-0"
          v-model="game.rating"
          stars="10"
          disabled
          no-border
          show-value
          precision="2"
          style="background-color: inherit"
        ></b-form-rating>
      </em>
    </template>
  </b-card>
</template>

<script lang="ts">
import { BImg, BCard, BCardText, FormRatingPlugin } from "bootstrap-vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { getImage } from "../utils/image";
import { Game } from "../views/GamesView.vue";

@Component({})
export default class GameCard extends Vue {
  @Prop() game!: Game;

  getGameImage(id: string) {
    return getImage(id);
  }
}
</script>


<style scoped>
.card-footer {
  padding: 0;
}

.card-header {
  padding: 0;
}
</style>