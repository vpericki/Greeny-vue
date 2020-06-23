<template>
    <v-app-bar
      app
      color="#2b463c"
      dark
    >
      <router-link to="/" class="no-style">
        <v-btn text class="align-center vline">
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

      <router-link to="/dashboard" class="no-style first-item" v-if="isLoggedIn">
          <v-btn text>
            <span class="mr-2">Dashboard</span>
          </v-btn>
      </router-link>

      <v-spacer></v-spacer>

      <div>

        <router-link to="/login" v-if="! isLoggedIn">
          <v-btn text>
            <span class="mr-2">Login</span>
          </v-btn>
        </router-link>

        <router-link to="/register" v-if="! isLoggedIn">
          <v-btn text>
            <span class="mr-2">Register</span>
          </v-btn>
        </router-link>


        <v-btn text @click="logout" v-if="isLoggedIn" :loading="logoutLoading">
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