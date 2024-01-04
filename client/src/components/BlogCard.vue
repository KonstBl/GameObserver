<template>
  <div>
    <b-card
      :img-src="getBlogImage(blog.image)"
      no-body
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-2"
    >
      <template #header>
        <b-button
          :to="{ name: 'BlogPage', params: { id: blog.id } }"
          variant="link"
          style="text-decoration: none; color: black"
          >{{ blog.name }}</b-button
        >
      </template>
      <b-list-group>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="primary" :src="getUserImage(blog.user.image)" class="align-baseline"></b-avatar>
          <span class="pl-2">{{ blog.user.userName }}</span>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BCard } from "bootstrap-vue";
import { Blog } from "@/views/BlogsView.vue";
import { getImage } from "../utils/image";

@Component({})
export default class BlogCard extends Vue {
  @Prop({ default: () => ({}) }) blog!: Blog;

  getBlogImage(id: string) {
    return getImage(id);
  }

  getUserImage(id: string) {
    return getImage(id)
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
