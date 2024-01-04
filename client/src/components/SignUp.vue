<template>
  <div class="registration-page">
     <h2 class="registration-title" style="color:black">Registration</h2>
    <b-input-group size="sm" class="registration-input-group">
      <b-form-input v-model="form.email" type="email" placeholder="Email"></b-form-input>
    </b-input-group>
<b-input-group size="sm" class="registration-input-group">
    <b-form-input id="password-input" placeholder="Password" :type="showPassword ? 'text' : 'password'" v-model="form.password" required></b-form-input>
    <b-input-group-append>
      <b-button v-if="!showPassword" variant="outline-success" @click="showPassword = !showPassword">
      <my-eye-icon></my-eye-icon>
      </b-button>
      <b-button v-else variant="success" @click="showPassword = !showPassword">
        <my-eye-icon></my-eye-icon>
        </b-button>
    </b-input-group-append>
  </b-input-group>
<b-input-group size="sm" class="registration-input-group">
  <b-form-input v-model="form.userName" type="userName" placeholder="Username"></b-form-input>
</b-input-group>
<b-button v-on:click="signUp" variant="primary">Confirm</b-button>
<br>
<b-button variant="link" :to="{name: 'Login'}">Login</b-button>
  </div>
</template>

<script lang="ts">
import {BButton} from 'bootstrap-vue'
import {Component, Vue} from 'vue-property-decorator'
import {SignUpApi} from '../api/sign-up/index'
 import MyEyeIcon from '@/components/icons/MyEyeIcon.vue';

@Component({ components: { BButton, MyEyeIcon } } )
export default class SignUp extends Vue {
form = {
    email: '',
    password: '',
    userName: ''
  }

    showPassword = false

  $refs!: {
    loginForm: Vue & {
      validate: () => Promise<any>
    }
  }

  async signUp() {
    const userData = await SignUpApi.signUp({email: this.form.email, password: this.form.password, userName: this.form.userName})   
    this.$router.push({name: 'Login'})
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

.registration-input-group {
  margin-bottom: 20px;
}

.b-button {
  width: 100%;
}
</style>
