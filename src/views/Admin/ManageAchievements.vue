<template>
  <v-container grid-list-md data-aos="fade-in">
    <v-layout row wrap>
      <v-flex xs12 md12>
        <v-card dark color="#2b463c">
          <v-card-title>Interface for managing acheivements!</v-card-title>
          <v-card-text>Here you can delete or create achievements</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md12>
        <v-progress-linear indeterminate color="#2b463c" :active="loading" ></v-progress-linear>
      </v-flex>

      <v-flex xs12 md12>
        <v-card>
          <v-layout
            column
          >
          <v-card-title>
            Create new achievement
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Achievement name*" :rules="nameRules" required v-model="newAchievement.name"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Achievement description*" :rules="descriptionRules" required v-model="newAchievement.description"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Required points*" type="number" :rules="pointRules" required v-model="newAchievement.required_points"></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-btn depressed class="white--text" color="#2b463c" @click="createAchievement(newAchievement)">Create new achievement</v-btn>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs12 md12>
        <v-card>
          <v-card-title>
            Achievements
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="achievements"
            :search="search"
            multi-sort
          >
          <template v-slot:item.delete = " { item } ">
            <v-icon large color="red darken-2" @click="deleteDialog(item.id)">mdi-delete-forever</v-icon>
          </template>
          
          </v-data-table>
        </v-card>
      </v-flex>


    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarData.timeout"
    >
      {{ snackbarData.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="#f4f1e9"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>


    </v-layout>

  </v-container>

</template>

<script lang="ts">
import Vue from 'vue'
import Achievements from '../../api/Achievements'
import {AchievementModel} from '../../models/AchievementModel'

export default Vue.extend({
  components: {
  },
  data() {
    return {
      loading: false,
      achievements: [] as AchievementModel[],
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        { 
          text: 'Description',
          value: 'description',
          sortable: true,
          align: 'left'
        },
        {
          text: 'Required points',
          value: 'required_points',
          sortable: true,
          align: 'center'
        },
        {
          text: 'Delete',
          value: 'delete',
          sortable: false,
          align: 'center'
        }

      ],
      nameRules: [
        (v: string) => !!v || 'Name is required',
      ],
      descriptionRules: [
        (v: string) => !!v || 'Description is required',        
      ],
      pointRules: [
        (v: number) => !!v || 'Number is required',
        (v: number) => v >= 0 || 'Number must be equal to or greater than 0'
      ],
      snackbarData: {
        text: '',
        timeout: -1
      },
      snackbar: false,
      newAchievement: {} as AchievementModel

    }
  },
  methods: {
    async deleteDialog(id: number) {
      
      if( await this.$root.$data.confirm.open('Delete', 'Are you sure?', { color: 'red' })) {
          Achievements.delete(id.toString())
          .then(() => {
            console.log('successfully deleted an achievement');
            
            this.achievements = this.achievements.filter(achievement => achievement.id !== id)
          })
          .catch(err => {
            console.log(err);
            
          })
          
        
      } else {
        console.log('not ok');
        
      }

    },
    createAchievement(achievement: AchievementModel): void {
        Achievements.store(achievement)
          .then(response => {
            console.log(response);
            
            this.achievements.push(response.data as AchievementModel)
            this.newAchievement = {} as AchievementModel

            this.snackbarData.text = "Successfully created new achievement"
            this.snackbarData.timeout = 4000
            this.snackbar = true
          })
          .catch(err => {
            console.log(err);
            
          })
    }
  },
  created() {
    this.loading = true

    Achievements.index()
      .then(response => {
        this.achievements = response.data

        console.log(this.achievements);

        this.loading = false
        
      })
    
  }
})
</script>