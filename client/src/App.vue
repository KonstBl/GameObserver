<template>
  <div id="app">
    <nav v-if="hideNavBar">
      <NavBar  />
    </nav>
    <router-view class="page-body" >    
    </router-view>
    <Footer v-if="hideFooter"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import NavBar from '@/components/NavBar.vue'
  import Footer from './components/Footer.vue';

  @Component({components:{NavBar, Footer}})
  export default class App extends Vue {
    pagesWithoutNavBar: any=['SignUp', 'Login']
    pagesWithoutFooter: any=['SignUp', 'Login', 'profile']
    get getCurrentRouteName() {
      return this.$route.name;
    }
    get hideNavBar() {
      return !this.pagesWithoutNavBar.includes(this.getCurrentRouteName)
    }

    get hideFooter() {
      return !this.pagesWithoutFooter.includes(this.getCurrentRouteName)
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
