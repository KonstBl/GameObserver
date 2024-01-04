<template>
  <div>
    <b-card
      no-body
      :img-src="getBlogImage(blog.image)"
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
      <b-row>
        <b-col cols="1">
          <my-trash-icon
            :icon-target="blog"
            @on-click="onDeleteClick(blog.id)"
          ></my-trash-icon>
        </b-col>
        <b-col cols="1">
          <b-button :to="{ name: 'BlogUpdate', params: { id: blog.id } }" 
          variant="link"
          class="text-dark p-0">
          <my-edit-icon
            variant="warning"
          ></my-edit-icon>
        </b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { BImg, BCard, FormRatingPlugin, BIcon } from "bootstrap-vue";
import { Blog } from "@/views/BlogsView.vue";
import { User } from "@/views/ProfileView.vue";
import { BlogsApi } from "@/api/blogs";
import MyXIcon from "@/components/icons/MyXIcon.vue";
import MyEditIcon from "@/components/icons/MyEditIcon.vue";
import {getImage} from "../../utils/image";
import MyTrashIcon from "../icons/MyTrashIcon.vue";

@Component({ components: { MyXIcon, MyEditIcon, MyTrashIcon } })
export default class BlogCard extends Vue {
  @Prop({ default: () => ({}) }) blog!: Blog;
  @Prop({ default: () => ({}) }) user!: User;

  @Emit() refetchBlogs() {}

  loading = false;

  async beforeMount() {
    console.log(this.blog.id);
  }

  // async edit() {
  //   await this.$router.push({name: 'BlogUpdate', params:{id: this.blog.id} })
  // }

  getBlogImage(id: string) {
    return getImage(id);
  }

  async onDeleteClick(blogId: string | undefined) {
    await this.$swal
      .fire({
        title: "Do you want to delete this blog?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      })
      .then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.loading = true;
          await BlogsApi.deleteBlog(blogId);
          this.loading = false;
          this.$swal.fire("Saved!", "", "success");
          this.refetchBlogs();
        }
      });
  }
}
</script>
