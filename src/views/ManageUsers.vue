<template>
  <v-container grid-list-md data-aos="fade-in">
    <v-layout row wrap>
      <v-flex xs12 md12>
        <v-card dark color="#2b463c">
          <v-card-title>Interface for managing users!</v-card-title>
          <v-card-text>Here you can delete users, or view their info and edit their points</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md12>
        <v-progress-linear indeterminate color="#2b463c" :active="loading" ></v-progress-linear>
      </v-flex>

      <v-flex xs12 md12>
        <v-card>
          <v-card-title>
            Users
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
            :items="users"
            :search="search"
            multi-sort
          >

          <template v-slot:item.achievements = " { item } ">
            <user-achievements-dialog :achievements="item.achievements" />

          </template>

          <template v-slot:item.edit = " { item } ">
              <user-edit-dialog :user="item" />

          </template>

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

    <confirm ref="confirm" />

    </v-layout>

  </v-container>

</template>

<script lang="ts">
import Vue from 'vue'
import User from '../api/User'
import UserEditDialog from '../components/Popups/UserEditDialog.vue'
import UserAchievementsDialog from '../components/Popups/UserAchievementsDialog.vue'
import Confirm from '../components/Popups/Confirm.vue'
import { bus } from '../main'

export default Vue.extend({
  components: {
    UserEditDialog,
    Confirm,
    UserAchievementsDialog,
  },
  data() {
    return {
      loading: false,
      users: [],
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Username',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        { 
          text: 'E-mail',
          value: 'email',
          sortable: true,
          align: 'left'
        },
        {
          text: 'Points',
          value: 'points',
          sortable: true,
          align: 'center'
        },
        {
          text: 'Achievements',
          value: 'achievements',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Edit',
          value: 'edit',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Delete',
          value: 'delete',
          sortable: false,
          align: 'center'
        }

      ],
      snackbarData: {
        text: '',
        timeout: -1
      },
      snackbar: false

    }
  },
  methods: {
    async deleteDialog(id: string) {
      
      if( await this.$root.$data.confirm.open('Delete', 'Are you sure?', { color: 'red' })) {
        User.deleteUser(id)
        .then(response => {
          console.log(response);
          
          this.users = this.users.filter(user => user['id'] !== id)
        })
        .catch(err => {
          console.log(err);
          
        })
        
      } else {
        console.log('not ok');
        
      }

    }
  },
  created() {
    this.loading = true

    User.getAll()
      .then(response => {
        
        this.users = response.data
        console.log(this.users);

        this.loading = false
      })
      .catch(err => {
        console.log(err);
        
      })

      bus.$on('editUserSnackbar', (data: {text: string; timeout: number}) => {
        this.snackbarData = data
        this.snackbar = true
      })
  }
})
</script>