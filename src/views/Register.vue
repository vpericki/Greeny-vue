<template>
  <v-container fluid class="limit-width" data-aos="fade-up">
    <v-card class="card">
        <v-form v-model="valid">
            <v-layout column class="center">
              <v-flex
                xs12
                md4
              >
                <h1>Register</h1>

                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  label="Username"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md4
              >
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md4
              >
                <v-text-field
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  required
                ></v-text-field>

              </v-flex>

              <v-flex
                xs12
                md4
              >
                <v-text-field
                  type="password"
                  v-model="repeatPassword"
                  :rules="passwordConfirmationRule"
                  label="Repeat password"
                  required
                ></v-text-field>

              </v-flex>
              <v-flex xs12 md4>
                <v-btn @click="submit">Register</v-btn>
              </v-flex>
            </v-layout>
        </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import User from '../api/User'
import router from '../router'

  export default Vue.extend({
    name: 'Register',

    data: () => ({
      valid: false,
      username: '',
      usernameRules: [
        (v: string) => !!v || 'Name is required',
        (v: string) => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        (v: string) => !!v || 'E-mail is required',
        (v: string) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        (v: string) => !!v || 'Password is required',
        (v: string) => v.length >= 8 || 'Password must be longer than 8 characters'
      ],
      repeatPassword: '',
      

    }),
    computed: {
      passwordConfirmationRule() {
        return [
          () => (this.password === this.repeatPassword) || 'Passwords must match',
          (v: string) => !!v || 'Please repeat your password'
        ]
      }
    },

    methods: {
      submit() {
        
        const user = {
          username: this.username,
          email: this.email,
          password: this.password,
          // eslint-disable-next-line @typescript-eslint/camelcase
          password_confirmation: this.repeatPassword
        }

        User.register(user)
          .then(() => {
            router.push({name: "Login"})
          })
          .catch(error => {
            if(error.response.status === 422) {
              console.log(error.response.data.errors);
              
            }
        })
        
        
      }
    }
  })
</script>

<style scoped>

.limit-width {
  max-width: 960px;
}

.card {
  padding: 12px;
  
}

.center {
  text-align: center;
}

</style>