<template>
    <body>      
        <div class="container">
          <h1>Input your blog</h1>
          <b-form>
              <b-form-group label="Name" label-for="blogName">
                <b-form-input id="blogName" v-model="blog.name"></b-form-input>
              </b-form-group>
            <b-form-group label="Image (link)" label-for="blogName">
              <file-uploader
              v-model="blogFile"
              />
            </b-form-group>
            <b-form-group label="Blog text" label-for="BlogText">
              <blog-text-editor
                v-model="blog.text"
              />              
            </b-form-group>
            <b-button variant="primary" @click="createBlog">Save</b-button>
          </b-form>
        </div>
    </body>
</template>
      
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Blog } from './BlogsView.vue';
import { BlogsApi } from '@/api/blogs';
import { VueEditor } from 'vue2-editor';
import BlogTextEditor from '@/components/blog/BlogTextEditor.vue';
import FileUploader from '@/components/FileUploader.vue';
import { UploadApi } from '@/api/upload';
    
@Component({
  components: {
    VueEditor,
    BlogTextEditor,
    FileUploader
  },
})
  export default class BlogCreatePage extends Vue {
    public blog: Blog={}
    public blogFile: File | null = null

    async createBlog() {
      if (this.blogFile) {
      const formData = new FormData()
      formData.append('file', this.blogFile as Blob)
      const fileData = await UploadApi.fileUpload(formData)
      this.blog.image = fileData.id
    }
    
      await BlogsApi.createBlog(this.blog)
      await this.$router.push({name: 'blogs'})
      window.location.reload()
    }
  }
</script>
      
      <style scoped>
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
    
      body#main {
        background-color: #7798b0;
      }
      .bv-example-row {
        background-color: #b6c9ca;
        max-width: 70%;
        margin: 0 auto;
      }
      </style>
      