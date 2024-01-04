<template>
  <div class="mb-5">
    <span style="font-size: 40px;">Users Reviews</span>
    <div v-for="review in reviews" :key="review.id">
      <b-row class="ml-1 mr-1 mb-4 p-2 bg-white border border-dark">      
        <b-col cols="1" class="d-flex justify-content-cneter align-items-center">
          <b-avatar size="4rem" variant="info" :src="review.user.image"></b-avatar>              
        </b-col>
        <b-col cols="10">
          <b-row class="d-flex flex-wrap">
            <b-col cols=1>
              <span class="ml-3 font-weight-bold">{{ review.user.userName }}</span>
            </b-col>
            <b-col cols="11" class="ml-3 text-break">
              <div v-html="review.content"></div>
            </b-col>                    
          </b-row>
        </b-col>
        <b-col cols="1" class="d-flex jsutify-content center align-items-center"> 
          <b-button  v-on:click="onDeleteClick(review.id)">delete</b-button>                 
        </b-col>
      </b-row>
    </div>
  </div>  
     
</template>
  
  <script lang="ts">
import { BAvatar, BButton } from 'bootstrap-vue'
import {Component, Prop, Vue, Emit} from 'vue-property-decorator'
import { Game } from '@/views/GamesView.vue'
import { ReviewsApi } from '@/api/reviews'


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

  @Component({})
  export default class ReviewsList extends Vue {
    @Prop() reviews!: Review[]
    @Prop() game!: Game

    @Emit() refetchReviews() {}

    loading: boolean = false

    async onDeleteClick(reviewId: string | undefined) {
      await ReviewsApi.deleteReview(reviewId)
      this.refetchReviews()
  } 
}
  </script>
  
  <style scoped>
.review {
  margin-bottom: 20px;
  border: 1px solid #000000;
  padding: 10px;
  background-color: aliceblue;
  max-width: 80%;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-weight: bold;
  font-size: 20px;
}

.comment-content {
  white-space: pre-line;
}
</style>