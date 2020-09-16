<template>
  <v-container grid-list-md data-aos="fade-in">
    <v-layout row wrap>
      <v-flex xs12 md12>
        <v-card dark color="#2b463c">
          <v-card-title>Welcome to your dashboard!</v-card-title>
          <v-card-text>Here you can browse your achievements and user information! Also you can see which codes you've redeemed!</v-card-text>
        </v-card>
      </v-flex>


      <v-flex xs12 md12 row class="justify-center">
        <div column>
          <span>Your current points </span>
          <v-progress-circular  data-aos="fade-in" v-show="showPoints" color="primary" :width="15" :size="200" :value="(userPoints * 100/maximumPoints).toString()"> {{ userPoints }} / {{ maximumPoints }}</v-progress-circular>
        </div>
       </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import Achievements from '../api/Achievements'
import User from '../api/User'
export default Vue.extend({
  data: () => ({
    maximumPoints: Number,
    userPoints: Number,
    showPoints: false as boolean
  }),
  created() {
    Achievements.getMaxPoints()
      .then((response) => {
        this.maximumPoints = response.data.max_points
      })
      .catch(err => {
        console.log(err)
      })

      User.auth()
        .then(response => {
          this.userPoints = response.data.points
          this.showPoints = true

        })
        .catch(err => {
          console.log(err)
        })
  }
})
</script>