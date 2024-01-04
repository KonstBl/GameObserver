<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" style="z-index: 1000000000;">
          <b-navbar-brand router-link to="/">Games Observer admin</b-navbar-brand>
      
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item  :to="{name: 'gamesAdm'}">Games</b-nav-item>
              <b-nav-item  :to="{name: 'blogsAdm'}">Blogs</b-nav-item>
              <b-nav-item  :to="{name: 'UsersListPage'}">Users</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
</template>    

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
@Component({})
export default class NavBar extends Vue {

}
</script>

<style scoped>

</style>