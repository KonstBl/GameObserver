<template>
  <div>
    <b-card class="fixed-size-card m-1">
      <b-button :to="{name: 'UserInfoPage', params: { id : user.id } }" variant="link" style="text-decoration: none; font-size:20px; color: black;">{{user.userName}}</b-button>
      <div class="d-flex justify-content-end align-items-center">
        <b-button @click="deleteUser" size="sm" style="margin: 2px;">Delete</b-button>
      </div>
    </b-card>
  </div>
</template>

  <script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { BCard } from 'bootstrap-vue'
import { User } from '@/views/UsersListPage.vue'
import { UsersApi } from '@/api/users'

  @Component({})
  export default class UserCard extends Vue {
      @Prop({default: () => ({})}) user!: User
  
      async deleteUser() {
        if (confirm("Confirm delete")) {
          await UsersApi.deleteUser(this.user.id as string)
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