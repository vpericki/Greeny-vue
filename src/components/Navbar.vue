<template>
    <v-app-bar
      app
      color="#2b463c"
      dark
    >
      <router-link to="/" class="no-style">
        <div class="d-flex align-center">
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
        </div>
      </router-link>


      <v-spacer></v-spacer>

      <div>
        <router-link to="/register">
        <v-btn
        text
      >
        <span class="mr-2">Register</span>
      </v-btn></router-link>


      </div>


    </v-app-bar>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Navbar',

    data: () => ({
    }),
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

</style>