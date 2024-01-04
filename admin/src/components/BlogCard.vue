<template>
  <div>
    <b-card :title="blog.name" class="fixed-size-card m-1">
      <div class="d-flex justify-content-end">
        <b-button @click="deleteBlog" size="sm" style="margin: 2px;">Delete</b-button>
      </div>
    </b-card>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BCard } from 'bootstrap-vue'
import { Blog } from '@/views/BlogsView.vue';
import { BlogsApi } from '@/api/blogs';

@Component({})
export default class BlogCard extends Vue {
    @Prop({default: () => ({})}) blog!: Blog

    async deleteBlog() {
      if (confirm("Confirm delete")) {
        await BlogsApi.deleteBlog(this.blog.id as string)
        window.location.reload()
      } else { return }
    }
}
</script>

<style>
.fixed-size-card {
  width: 500px;
  height: 100px;
}
</style>