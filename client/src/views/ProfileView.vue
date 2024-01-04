<template>
  <body>
      <div class="container">
        <h1>User information</h1>
        <b-form>
          <b-form-group label="Profile picture">
            <b-img 
            :src="getUserImage"
            width="250"
            height="250"
            class="p-3"></b-img>
              <file-uploader
              v-model="userFile"
              />
            </b-form-group>
          <b-form-group label="Email">
            <b-form-input v-model="user.email"></b-form-input>
          </b-form-group>
          <b-form-group label="Username">
            <b-form-input v-model="user.userName"></b-form-input>
          </b-form-group>
          <b-form-group label="Password">
            <b-form-input v-model="user.password"></b-form-input>
          </b-form-group>
        </b-form>
        <b-row class="d-flex justify-content-end">
          <b-button variant="success" class="mr-3" @click="userUpdate"> Save </b-button>
        </b-row>
      </div>
      <div class="container">
        <h2>My blogs</h2>
      <b-container> 
        <div v-if="blogs.length">
          <b-row>
              <b-col v-for="blog in blogs" :key="blog.id" class="mr-auto p-3" cols="4" >
                  <MyBlogCard
                  :blog="blog" />
              </b-col>
          </b-row>
        </div>
        <span v-else>There are no blogs exits.</span>
      </b-container>
      </div>
  </body>
    </template>

  
  <script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { UsersApi } from '@/api/users';
  import { BlogsApi } from '@/api/blogs';
  import { Blog } from './BlogsView.vue';
  import MyBlogCard from '@/components/blog/MyBlogCard.vue'
  import FileUploader from '@/components/FileUploader.vue';
  import { UploadApi } from '@/api/upload'
import { getImage } from '@/utils/image';

  export interface User {
        id?: string,
        userName?: string,
        email?: string,
        image?: string,
        createdAt?: Date,
        password?: string
  }



  @Component({components:{MyBlogCard, FileUploader}})
 export default class ProfileView extends Vue {
  public blogs: Blog[]=[]
  public user: User={}
  public userOriginal: User={}
  public userFile: File | null = null

  get isDataChanged() {
    return JSON.stringify(this.user) !== JSON.stringify(this.userOriginal)
  }

  async beforeMount() {
    this.user = await this.getUserInfo()   
    this.blogs = await this.getUserBlogs() 
  }

  get getUserImage() {
    if(!this.user.image) return
    return getImage(this.user.image);
  }

  async getUserInfo() {
    const user = await UsersApi.getUserInfo()
    this.userOriginal = {...user}
    return user
  }

  async getUserBlogs() {
    const test = this.user.id as string
    return await BlogsApi.getUserBlogs(test)
  }

  async userUpdate() {
    if (!this.isDataChanged && !this.userFile) {
      return
    }
    if (this.userFile) {
      const formData = new FormData()
      formData.append('file', this.userFile as Blob)
      const fileData = await UploadApi.fileUpload(formData)
      this.user.image = fileData.id
    }

    const user = await UsersApi.userUpdate(this.user.id as string, this.user) 
    this.userOriginal = {...user}
    this.$swal.fire('Saved!', '', 'success')
    this.userFile = null
    return user
  }
 }
  </script>
  