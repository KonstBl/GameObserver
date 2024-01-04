<template>
<div class="registration-page">
  <b-modal v-if="showAlert==true" 
  ok-only 
  hide-footer 
  id="modal-1" 
  title="Error"
  header-bg-variant="danger"
  >
    wrong email or password
  </b-modal>
    <h2 class="registration-title" style="color:black">Login</h2>
    <b-form class="registration-form">
      <b-form-group label="Email" label-for="email-input" style="color:rgb(123, 121, 121)">
        <b-form-input id="email-input" placeholder="Email" type="email" v-model="form.email" required></b-form-input>
      </b-form-group>
  <b-form-group label="Password" label-for="password-input" style="color:rgb(123, 121, 121)">
    <b-input-group>
    <b-form-input id="password-input" placeholder="Password" :type="showPassword ? 'text' : 'password'" v-model="form.password" required></b-form-input>
    <b-input-group-append>
      <b-button v-if="!showPassword" variant="outline-success" @click="showPassword = !showPassword">
      <my-eye-icon></my-eye-icon>
      </b-button>
      <b-button v-else variant="success" @click="showPassword = !showPassword">
        <my-eye-off-icon></my-eye-off-icon>
        </b-button>
    </b-input-group-append>
  </b-input-group>
  </b-form-group>

  <b-button variant="primary" v-on:click="login" v-b-modal.modal-1>Submit</b-button>
  <br>
  <b-button variant="link" :to="{name: 'SignUp'}">Registration</b-button>
</b-form>
</div>
</template>

  <script lang="ts">
 import { BButton, BAlert } from 'bootstrap-vue'
 import {Component, Vue} from 'vue-property-decorator';
 import {LoginApi} from '../api/login/index'
 import MyEyeIcon from '@/components/icons/MyEyeIcon.vue';
 import MyEyeOffIcon from '@/components/icons/MyEyeOffIcon.vue';

 @Component({ components: { BButton, MyEyeIcon, MyEyeOffIcon } } )
export default class LoginPage extends Vue {
  form = {
      email: '',
      password: ''
    }

    showPassword = false
    showAlert = false

    async login() {
      console.log(this.form.email);

      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if(this.form.email.match(validRegex)) {
        const userData = await LoginApi.login({email: this.form.email, password: this.form.password})
        localStorage.setItem("accessToken", userData.data.access_token)      
        const user: any = {};
        const unnecessaryKeys = ['access_token', 'access_token_ttl', 'refresh_token', 'refresh_token_ttl', 'password']
        for (const key in userData.data) {
          if (!unnecessaryKeys.includes(key)) {
            user[key] = userData.data[key];
          }
        }        
        localStorage.setItem("userData", JSON.stringify(user))
        await this.$router.push({name: 'games'})
        window.location.reload()
    } else {
      this.showAlert = true
      console.log(this.showAlert);
    }
  }

}
</script>

<style scoped>
.registration-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.registration-title {
  text-align: center;
  margin-bottom: 20px;
}

.registration-form {
  margin-bottom: 20px;
}

.b-form-group {
  margin-bottom: 20px;
}

.b-button {
  width: 100%;
}
</style>