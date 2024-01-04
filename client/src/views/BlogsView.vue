<template>
<body>
  <b-container class="bv-example-row"> 
    <div v-if="blogs.length">
    <b-row>
      <b-form-input placeholder="Search by title..." debounce="100" class="m-2" @input="searchBlogs"></b-form-input>
    </b-row>
    <b-row class="d-flex justify-content-end">
      <b-button
          class="mr-5 mt-3" v-if="showButton"
          :to="{name: 'BlogCreatePage'}"
          variant="success"
        >
        Create Blog
      </b-button>
    </b-row>
      <b-row>
          <b-col v-for="blog in blogs" :key="blog.id" class="mr-auto p-3" cols="4" >
              <BlogCard
              :blog="blog" />
          </b-col>
      </b-row>
    </div>
    <span v-else>
      <p>There are no blogs exits.</p>
      <b-button
          class="mr-5 mt-3" v-if="showButton"
          :to="{name: 'BlogCreatePage'}"
          variant="success"
        >
        Create Blog
      </b-button>
    </span>
    
  </b-container>   
</body>
</template>

<script lang="ts">
 import { BButton } from 'bootstrap-vue'
import BlogCard from '@/components/BlogCard.vue';
import {Component, Vue} from 'vue-property-decorator';
import { BlogsApi } from '@/api/blogs';
import { UserData, AccessToken } from '@/utils/auth';

export interface Blog {
    id?:  string | undefined,
    userId?: string,
    name?: string,
    text?: string,
    image?: string,
    user?: UserBlog,
    createdAt?: Date
  }

export interface UserBlog {
  userName?: string,
  image?: string
}

@Component({components:{BlogCard}})
export default class BlogsView extends Vue {
  public blogs: Blog[]=[]

  get showButton() {
    return UserData.id && AccessToken
  }

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
    min-height: 100vh;
    background-color: #b6c9ca;
    max-width: 70%;
    margin: 0 auto;
}
</style>