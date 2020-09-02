<template>
  <v-container grid-list-md data-aos="fade-in">
    <v-layout row wrap>
      <v-flex xs12 md12>
        <v-card dark color="primary">
          <v-card-title>Welcome to code redeeming interface!</v-card-title>
          <v-card-text>Here you can redeem codes!</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md12>
        <v-card color="accent">
            <v-card-title>
                <v-text-field filled label="Your code here"></v-text-field>
            </v-card-title>
            <v-card-actions>
                <v-btn text class="primary--text">Submit</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    
  })
})
</script>