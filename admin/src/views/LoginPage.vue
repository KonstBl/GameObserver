<template>
    <div>
      <h2>Авторизация</h2>
      <b-form>
        <b-form-group label="Электронная почта" label-for="email-input">
          <b-form-input id="email-input" type="email" v-model="form.email" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Пароль" label-for="password-input">
          <b-form-input id="password-input" type="password" v-model="form.password" required></b-form-input>
        </b-form-group>
  
        <b-button variant="primary" v-on:click="login">Войти</b-button>
      </b-form>
    </div>
  </template>

  <script lang="ts">
 import {BButton, IconsPlugin} from 'bootstrap-vue'
 import {Component, Vue} from 'vue-property-decorator';
 import {LoginApi} from '../api/login/index'

 @Component({ components: { BButton } } )
export default class LoginPage extends Vue {
  form = {
      email: '',
      password: ''
    }

    async login() {

        const userData = await LoginApi.login({email: this.form.email, password: this.form.password})
        localStorage.setItem("accessToken", userData.data.access_token)
    }

}
</script>