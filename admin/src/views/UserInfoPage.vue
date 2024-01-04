<template>
    <body>
        <div class="container">
          <h1>User information</h1>
          <b-form>
            <b-form-group label="Email">
              <b-form-input disabled="true" v-model="user.email"></b-form-input>
            </b-form-group>
            <b-form-group label="Username">
              <b-form-input disabled="true" v-model="user.userName"></b-form-input>
            </b-form-group>
            <b-form-group label="Profile picture">
              <b-form-input disabled="true" v-model="user.image"></b-form-input>
            </b-form-group>
            <b-form-group label="Date of registration">
              <b-form-input disabled="true" v-model="user.createdAt"></b-form-input>
            </b-form-group>
          </b-form>
        </div>
    </body>
      </template>
      
      <script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator' 
    import { User } from './UsersListPage.vue';
import { UsersApi } from '@/api/users';
    
    @Component({})
      export default class UserInfoPage extends Vue {
        @Prop({default: () => ({})}) user!: User
        
        get userId():string {
        return this.$router.currentRoute.params.id
    }
        async beforeMount() {
            this.user = await this.getUserById()
        }

        async getUserById() {
          const user = await UsersApi.getUserById(this.userId)
          return user
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
      