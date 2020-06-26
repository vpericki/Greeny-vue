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

          <template v-slot:item.info = " { item } ">
            <v-icon large color="#2b463c" @click="infoDialog(item)">mdi-information</v-icon>

          </template>

          <template v-slot:item.edit = " { item } ">
              <user-edit-dialog :user="item" />

          </template>

          <template v-slot:item.delete = " { item } ">
            <v-icon large color="red darken-2" @click="deleteDialog(item)">mdi-delete-forever</v-icon>
          </template>


          </v-data-table>
        </v-card>
      </v-flex>

    </v-layout>

  </v-container>

</template>

<script lang="ts">
import Vue from 'vue'
import User from '../api/User'
import UserEditDialog from '../components/Popups/UserEditDialog.vue'

export default Vue.extend({
  components: {
    UserEditDialog,
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
          text: 'Info',
          value: 'info',
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
      snackBarData: {
        text: '',
        snackbar: false,
        timeout: -1
      },
      snackbar: false

    }
  },
  created() {
    this.loading = true

    User.getAll()
      .then(response => {
        this.users = response.data

        this.loading = false
      })
      .catch(err => {
        console.log(err);
        
      })
  }
})
</script>