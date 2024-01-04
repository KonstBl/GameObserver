<template>
<body>  
  <b-form>
      <b-form-group>
        <b-form-input placeholder="Search by title..." debounce="100" class="m-2" @input="searchBlogs"></b-form-input>
      </b-form-group>
    </b-form>
  <div v-if="blogs.length">  
      <b-container class="bv-example-row" v-for="blog in blogs" :key="blog.id">
        <div class="d-flex justify-content-center align-items-center">            
        <BlogCard
        :blog="blog" 
        />
        </div>
      </b-container>
  </div>
</body>
</template>

<script lang="ts">
import BlogCard from '@/components/BlogCard.vue';
import {Component, Vue} from 'vue-property-decorator';
import { BlogsApi } from '@/api/blogs';

export interface Blog {
    id?: string,
    userId?: string,
    name?: string,
    text?: string,
    image?: string,
    createdAt?: Date
  }

@Component({components:{BlogCard}})
export default class BlogsView extends Vue {
   
    public blogs: Blog[]=[]
  
    loading: boolean = false

    async beforeMount() {
    this.loading = true
    this.blogs = await this.getBlogs() 
    this.loading = false  
  }

 
  async getBlogs() {
    return await BlogsApi.getBlogs()
  }

  async searchBlogs(value: string) {
    this.loading = true
    if (value?.length) {
      this.blogs = await BlogsApi.searchBlogs(value)
    } else {
      this.blogs = await this.getBlogs()
    }
    this.loading = false
    await this.$nextTick()
  }
}
</script>

<style scoped>
body {
    background-color: #7798b0;
  }

.container {
  background-color: #b6c9ca;
    max-width: 70%;
    margin: 0 auto;
}
</style>