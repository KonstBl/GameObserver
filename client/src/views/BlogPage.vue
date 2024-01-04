<template>
  <body>
    <b-container
      class="bv-example-row justify-content-center align-items-center"
    >
      <b-row class="d-flex justify-content-center flex-column">
        <b-row class="d-flex">
          <b-col cols="12" class="d-flex justify-content-center">
            <b-img
              class="mt-4"
              :src="getBlogImage(blog.image)"
              style="z-index: 0; max-width: 500px; max-height: 500px"
            />
          </b-col>
          <b-col cols="12" class="d-flex justify-content-center">
            <span class="h3 mt-4 font-weight-bolder">{{ blog.name }}</span>
          </b-col>
          <b-col v-if="user" cols="12" class="d-flex justify-content-center">
            <span class="h5"
              >By
              <span class="font-weight-bold">{{ user.userName }}</span></span
            >
          </b-col>
        </b-row>
      </b-row>
      <b-row>
        <b-container>
          <b-col cols="12" class="mt-4" style="text-align: justify">
            <b-row v-html="blog.text"></b-row>
          </b-col>
        </b-container>
      </b-row>
    </b-container>
  </body>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Blog } from "./BlogsView.vue";
import { BlogsApi } from "@/api/blogs";
import { UsersApi } from "@/api/users";
import { User } from "./ProfileView.vue";
import {getImage} from "../utils/image";

@Component({ components: {} })
export default class BlogPage extends Vue {
  public blog: Blog = {};
  public user: User | null = null;
  get blogId(): string {
    return this.$router.currentRoute.params.id;
  }
  async beforeMount() {
    this.blog = await this.getBlog();
    this.user = await this.getUser(this.blog.userId);
  }

  getBlogImage(id: string) {
    return getImage(id);
  }

  async getBlog() {
    return await BlogsApi.getBlog(this.blogId);
  }

  async getUser(userId: string | undefined) {
    if (!userId) {
      return;
    }
    const user = await UsersApi.getUserById(userId);
    return user;
  }
}
</script>
