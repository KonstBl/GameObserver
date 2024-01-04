<template>
  <div>
    <b-form>
      <div class="form-group">
        <label for="content" style="font-size: 40px">Your Review:</label>
        <b-form-textarea
          v-model="newReview.content"
          id="textarea-large"
          size="lg"
          placeholder="Type here..."
        ></b-form-textarea>
      </div>
      <div class="text-right">
        <b-button
          class="btn btn-primary"
          :disabled="loading"
          v-on:click="addReview"
          >Send!</b-button
        >
      </div>
    </b-form>

    <div class="mb-5">
      <span style="font-size: 40px">Users Reviews</span>
      <div v-for="review in reviews" :key="review.id">
        <b-row class="ml-1 mr-1 mb-4 p-2 bg-white border border-dark">
          <b-col
            cols="1"
            class="d-flex justify-content-cneter align-items-center"
          >
            <b-avatar
              size="4rem"
              variant="info"
              :src="getUserImage(review.user.image)"
            ></b-avatar>
          </b-col>
          <b-col cols="10">
            <b-row class="d-flex flex-wrap">
              <b-col cols="1">
                <span class="ml-3 font-weight-bold">{{
                  review.user.userName
                }}</span>
              </b-col>
              <b-col cols="11" class="ml-3 text-break">
                <div v-html="review.content"></div>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            cols="1"
            class="d-flex jsutify-content center align-items-center"
          >
            <my-trash-icon
              v-if="isUserReview(review)"
              :icon-target="review"
              @on-click="onDeleteClick(review.id)"
            ></my-trash-icon>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BAvatar, BButton, BForm } from "bootstrap-vue";
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import { VueEditor } from "vue2-editor";
import { Game, Review } from "@/views/GamesView.vue";
import { ReviewsApi } from "@/api/reviews";
import MyXIcon from "@/components/icons/MyXIcon.vue";
import { UserData } from "@/utils/auth";
import {getImage} from "@/utils/image";
import MyTrashIcon from "../icons/MyTrashIcon.vue";

interface NewReview {
  content: string;
}

@Component({ components: { MyXIcon, MyTrashIcon, VueEditor } })
export default class ReviewsList extends Vue {
  @Prop() reviews!: Review[];
  @Prop() game!: Game;

  @Emit() refetchReviews() {}

  loading = false;

  newReview: NewReview = {
    content: "",
  };

  isUserReview(review: Review) {
    return UserData.id === review.userId;
  }

  async addReview() {
    this.loading = true;
    const newReview = await ReviewsApi.createReview({
      gameId: this.game.id,
      content: this.newReview.content,
    });
    this.reviews.unshift({ ...newReview });
    this.newReview = {
      content: "",
    };
    this.loading = false;
  }

  getUserImage(id: string) {
    return getImage(id)
  }

  async onDeleteClick(reviewId: string | undefined) {
    await this.$swal
      .fire({
        title: "Do you want to delete this review?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      })
      .then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.loading = true;
          await ReviewsApi.deleteReview(reviewId);
          this.loading = false;
          this.$swal.fire("Saved!", "", "success");
          this.refetchReviews();
        }
      });
  }
}
</script>

<style scoped>
.review {
  margin-bottom: 20px;
  border: 1px solid #000000;
  padding: 10px;
  background-color: aliceblue;
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
  width: 1000px;
  white-space: pre-line;
}
</style>
