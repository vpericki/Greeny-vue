<template>
    <v-app-bar
      app
      color="#2b463c"
      dark
    >
      <router-link to="/" class="no-style">
        <v-btn text class="align-center vline" data-aos="fade-down">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2 align-middle"
            contain
            :src="require('../assets/greeny_logo.png')"
            transition="scale-transition"
            width="40"
          />

          <span
            alt="Green Name"
            class="shrink mt-1 hidden-sm-and-down not-clickable appname"
            contain
            min-width="100"
            width="100"
          >
          Greeny
          </span>
        </v-btn>
      </router-link>

      <router-link to="/achievements" class="no-style first-item" v-if="isLoggedIn">
        <v-btn text data-aos="flip-up">
          <span class="mr-2">Achievements</span>
        </v-btn>
      </router-link>

      <v-spacer></v-spacer>

      <div>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Dropdown
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>First item</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

        <router-link to="/dashboard" class="no-style first-item" v-if="isLoggedIn">
          <v-btn text data-aos="flip-up">
            <span class="mr-2">Dashboard</span>
          </v-btn>
        </router-link>

        <router-link to="/login" v-if="! isLoggedIn">
          <v-btn text data-aos="flip-up">
            <span class="mr-2">Login</span>
          </v-btn>
        </router-link>

        <router-link to="/register" v-if="! isLoggedIn">
          <v-btn text data-aos="flip-up">
            <span class="mr-2">Register</span>
          </v-btn>
        </router-link>


        <v-btn text @click="logout" v-if="isLoggedIn" :loading="logoutLoading" data-aos="flip-up">
          <span class="mr-2">Logout</span>
        </v-btn>

      </div>


    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import router from '../router'

  export default Vue.extend({
    name: 'Navbar',

    data: () => ({
      logoutLoading: false
    }),

    methods: {
      logout() {
        this.logoutLoading = true

        this.$store.dispatch('logout')
          .then(() => {
            this.logoutLoading = false

            router.push({name: "Home"})
          })
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      }
    }
  })
</script>

<style>

.not-clickable {
  pointer-events: none;
}

.appname {
  font-size: 26pt;
}

.no-style {
  text-decoration: none;
  color: #f4f1e9;
}

.no-style:visited {
  text-decoration: none;
  color: #f4f1e9;
}

.align-middle {
  vertical-align: middle;
}

.vline {
  padding-right: 25px;
  border-right: 2px solid white;
}

.first-item {
  margin-left: 15px;
}

</style>