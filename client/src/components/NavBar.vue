<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" style="z-index: 1000000000;">
          <b-navbar-brand router-link to="/">Games Observer</b-navbar-brand>
      
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item router-link :to="{name: 'games'}">Games</b-nav-item>
              <b-nav-item router-link :to="{name: 'blogs'}">Blogs</b-nav-item>
            </b-navbar-nav>
      
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form>
                <b-button v-if="isUserLogedIn==false" size="sm" class="my-2 mr-1 my-sm-2" style="color: chartreuse;" type="submit" router-link :to="{name:'Login'}">Login</b-button>
                <b-button v-if="isUserLogedIn==false" size="sm" class="my-2 mr-1 my-sm-2" style="color: chartreuse;" type="submit" router-link :to="{name:'SignUp'}">SignUp</b-button>
              </b-nav-form>
      
              <b-nav-item-dropdown v-if="isUserLogedIn" right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <em>User</em>
                </template>
                <b-dropdown-item :to="{name: 'profile' }">Profile</b-dropdown-item>
                <b-dropdown-item v-on:click="logOut">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
</template>    

<script lang="ts">
import { UsersApi } from '@/api/users';
import { isLogedIn } from '@/utils/auth';
import { User } from '@/views/ProfileView.vue';
import {Component, Prop, Vue} from 'vue-property-decorator';

  

@Component({})
export default class NavBar extends Vue {
  
  get isUserLogedIn() {
    return isLogedIn
  }

  async logOut() {
    localStorage.removeItem("accessToken")
    window.location.reload()
  }
}
</script>

<style scoped>

</style>