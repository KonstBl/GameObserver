<template>
    <b-form-rating
    v-model="rating"
    :disabled="disabled" 
    style="background-color: inherit;"
    id="rating-10"    
    show-value precision="2"
    no-border
    inline
    variant="warning" 
    bg-variant="light"
    size="sm" 
    stars="10"    
    @change="onRatingChange"
    >
</b-form-rating>
</template>

<script lang="ts">
import { RatingApi } from '@/api/rating';
import {Component, Prop, ModelSync, Emit, Vue} from 'vue-property-decorator';

export interface Rating {
        id: string,
        userId: string,
        gameId: string,
        rating: number,
        createdAt: Date
    }

@Component({})
 export default class GameRating extends Vue {
    @ModelSync('input', 'input') rating!: Rating

    @Prop() disabled!: boolean

    @Emit() handleRatingChange(value: number) {}


    async getRating() {
        return await RatingApi.getRating()
    }

    async rateGame() {    
        await RatingApi.rateGame({gameId: this.rating.gameId})
    }

    onRatingChange(value: number) {
        this.handleRatingChange(value)
    }
  }
</script>