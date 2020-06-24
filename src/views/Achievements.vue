<template>
  <v-container data-aos="fade-in" grid-list-md text-xs-center>
    <v-layout row align-center>
      <v-flex xs12 md12>
        <v-card dark color="#2b463c">
          <v-card-title primary-title>Welcome to achievements page!</v-card-title>
          <v-card-text>Here you can browse all the achievements and see which user has which achievement.</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>


    <v-progress-linear
      indeterminate
      color="#2b463c"
      :active="achievementsLoading"
    ></v-progress-linear>
    <v-layout row wrap class="margin-top">
      <v-flex xs12 md4 v-for="achievement in achievements" :key="achievement.id" data-aos="fade-in">
        <v-card color="#f4f1e9" class="black--text">
          <v-layout row>
            <v-flex xs12>
              <v-card-title primary-title>
                <div class="padding">
                  <div>{{ achievement.name }}</div>
                  <div>Required: {{ achievement.required_points }} points</div>

                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <v-card-actions class="pa-3">
          <router-link :to="{ name: 'AchievementDetails', params: {id: achievement.id}}">
            <v-btn text>
              <span class="mr-2">View achievers</span>
            </v-btn>
          </router-link>
          </v-card-actions>
        </v-card>
      </v-flex>



    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Achievements from '../api/Achievements'

export default Vue.extend({
  
  data() {
    return {
      achievements: {},
      achievementsLoading: false
    }
  },
  created() {
    this.achievementsLoading = true
    Achievements.index()
      .then(response => {
        this.achievementsLoading = false

        this.achievements = response.data
      })
      .catch(err => {
        console.log(err);

        this.achievementsLoading = false
        
      })
  },


})
</script>

<style scoped>
  .center {
    text-align: center;
  }

  .margin-top {
    margin-top: 16px;
  }

  .padding {
    padding: 5px;
  }

</style>