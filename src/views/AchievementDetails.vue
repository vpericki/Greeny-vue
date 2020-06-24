<template>
  <v-container grid-list-md data-aos="fade-in">
    <v-layout row wrap>
      <v-flex md12 xs12>
        <v-card dark color="#2b463c">
          <v-card-title>Achievement details</v-card-title>
          <v-card-text>Here you can see which users achieved this achievement</v-card-text>
        </v-card>
      </v-flex>

      <v-flex md12 xs12>
        <v-progress-linear indeterminate color="#2b463c" :active="tableLoading" ></v-progress-linear>

        <h1>{{ achievement.name }}</h1>
        <h2>{{ achievement.description }}</h2>

      </v-flex>

      <v-flex md12 xs12>
      <v-data-table
        :headers="headers"
        :items="users"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.users.name }}</td>
        </template>
      </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import router from '../router';
import Achievements from '../api/Achievements';
export default Vue.extend({
  
  data() {
    return {
      achievement: {},
      users: [],
      headers: [
          {
            text: 'Username',
            align: 'center',
            sortable: false,
            value: 'name',
          },
        ],

      tableLoading: true,

    }
  },

  created() {
    const id = router.currentRoute.params.id;

    Achievements.getAchievementById(id)
    .then(achievement => {
      this.achievement = achievement.data[0]
      this.users = achievement.data[1]
      this.tableLoading = false

    })
    
  }

})
</script>
