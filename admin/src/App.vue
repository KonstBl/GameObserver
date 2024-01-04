<template>
  <div id="app">
    <nav v-if="hideNavBar">
      <NavBar />
    </nav>
    <router-view class="page-body" />
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import NavBar from '@/components/NavBar.vue'
  import GameCard from '@/components/GameCard.vue'
  import BlogCard from '@/components/BlogCard.vue'

  @Component({components:{NavBar, GameCard, BlogCard}})
  export default class App extends Vue {
    pagesWithoutNavBar: any=['SignUp']
    get getCurrentRouteName() {
      return this.$route.name;
    }
    get hideNavBar() {
      return !this.pagesWithoutNavBar.includes(this.getCurrentRouteName)
    }
  }
</script>

<style>
@import '@/assets/style.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

div#app {
  margin: 0 auto;
  color: #947425;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}


</style>
