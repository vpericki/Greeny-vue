<template>
  <v-app>
    <Navbar/>
    <v-main>
      <router-view/>
    </v-main>
     <confirm ref="confirm"></confirm>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from './components/Navbar.vue';
import Confirm from './components/Popups/Confirm.vue'


export default Vue.extend({
  name: 'App',

  components: {
    Navbar,
    Confirm
  },

  data: () => ({
    //
  }),
  mounted() {
    this.$root.$data.confirm = this.$refs.confirm
  }
});
</script>
