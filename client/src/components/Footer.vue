<template>
    <footer class="footer bg-dark text-light py-4">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h4>Contacts</h4>
            <p>+380 67 649 11 05</p>
            <p>GameObserver@gmail.com</p>
            <p>Telegram: @GameObserver</p>
          </div>
          <div class="col-md-6">
            <h4>Navigate</h4>
            <ul class="list-unstyled">
              <li><router-link :to="{name: 'games'}">Games</router-link></li>
              <li><router-link :to="{name: 'blogs'}">Blogs</router-link></li>
              <li><router-link :to="{name: 'main'}">About us</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class Footer extends Vue {}
</script>