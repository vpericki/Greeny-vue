<template>
  <v-container grid-list-xl data-aos="fade-in">
    <v-layout row wrap>
      <v-flex>
        <v-card dark color="#2b463c">
          <v-card-text>Welcome to your dashboard!</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  
  data() {
    return {
      user: null
    }
  },


})
</script>