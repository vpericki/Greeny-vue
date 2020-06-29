<template>
  <v-container grid-list-md data-aos="fade-in">
    <v-layout row wrap>
      <v-flex xs12 md12>
        <v-card dark color="#2b463c">
          <v-card-title>Interface for managing roles!</v-card-title>
          <v-card-text>Here you can add or remove roles from users</v-card-text>
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

          
          <template v-slot:item.roles = " { item } ">
              <td v-for="role in item.roles" :key="role.id">
                  <v-btn outlined x-small class="ma-1" color="red darken-2" @click="removeRole(item.id, role.id)"><v-icon>mdi-delete</v-icon>{{role.name}}</v-btn>
              </td>
          </template>

          <template v-slot:item.edit = " { item } ">
            
              <user-role-edit-dialog :roles="roles" :user="item" />
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
import User from '../../api/User'
import Role from '../../api/Role'
import {UserModel} from '../../models/UserModel'
import { bus } from '../../main'
import { RoleModel } from '../../models/RoleModel'
import UserRoleEditDialog from '../../components/Popups/UserRoleEditDialog.vue'

export default Vue.extend({
  components: {
    UserRoleEditDialog,
  },
  data() {
    return {
      loading: false,
      users: [] as Array<UserModel>,
      roles: [] as Array<RoleModel>,
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
          text: 'Roles',
          value: 'roles',
          sortable: false,
          align: 'left'
        },
        {
          text: 'Add roles',
          value: 'edit',
          sortable: false,
          align: 'center'
        }

      ],
      snackbarData: {
        text: '',
        timeout: -1
      },
      snackbar: false,
      selected: {} as RoleModel

    }
  },
  methods: {
    removeRole(idUser: number, idRole: number) {
      Role.deleteRoleFromUser(idUser.toString(), idRole.toString())
        .then(() => {
          this.snackbarData.text = 'Successfully removed role from user!'
          this.snackbarData.timeout = 4000
          this.snackbar = true
          
          // Find user with removed role and remove it locally
          let savedIndex = 0
          this.users.forEach((element, index) => {
            if(element.id === idUser) {
              savedIndex = index
            }
          });  
          this.users[savedIndex].roles = this.users[savedIndex].roles.filter(role => role.id !== idRole)
          
        })
        .catch(err => {
          console.log(err)
          
        })
    },
    addRoleToUser() {
      console.log(this.selected)
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

    Role.getAll()
      .then(response => {
        this.roles = response.data

        console.log(this.roles);
        
      })

      bus.$on('successAddingRole', (data: {text: string; timeout: number}) => {
        this.snackbarData = data
        this.snackbar = true
      })
  }
})
</script>
<style scoped>
  .max-width {
    max-width: 200px;
    display: inline-block;
  }
</style>