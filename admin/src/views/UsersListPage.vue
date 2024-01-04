<template>
    <body>  
      <b-form-group>
        <b-form-input placeholder="Search by title..." debounce="100" class="m-2" @input="searchUsers"></b-form-input>
      </b-form-group>
      <div v-if="users.length">  
          <b-container class="bv-example-row" v-for="user in users" :key="user.id">
            <div class="d-flex justify-content-center align-items-center">            
            <UserCard 
            :user="user"
            />
            </div>
          </b-container>
      </div>
    </body>
    </template>
    
    <script lang="ts">
    import { UsersApi } from '@/api/users';
    import UserCard from '@/components/UserCard.vue';
    import {Component, Vue} from 'vue-property-decorator';
    
    export interface User {
        id?: string,
        userName?: string,
        email?: string,
        image?: string,
        createdAt?: Date
      }
    
    @Component({components:{UserCard}})
    export default class UserListPage extends Vue {

      public users: User[]=[]
      
      loading: boolean = false

      async beforeMount() {
        this.loading = true
        this.users = await this.getUsers()
        this.loading = false   
      }
    
     
      async getUsers() {
        return await UsersApi.getUsers()
      }

      async searchUsers(value: string) {
        this.loading = true
        if (value?.length) {
          this.users = await UsersApi.searchUsers(value)
        } else {
          this.users = await this.getUsers()
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