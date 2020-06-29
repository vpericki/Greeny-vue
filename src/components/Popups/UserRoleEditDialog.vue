<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon x-large
          color="#2b463c"
          light
          v-bind="attrs"
          v-on="on"
          @click="refreshRoles()"
        >
          <v-icon>mdi-card-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Assign new role to user</span>
        </v-card-title>
        <v-card-text>
            <v-select
            :items="selectableRoles"
            label="Select a role"
            v-model="selected"
            item-value="id"
            item-text="name"
            ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="declineEdit()">Close</v-btn>
          <v-btn color="primary" text @click="confirmEdit(user.id)" :loading="saveLoading" :disabled="selected < 0 ? true : false">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
import {UserModel} from '../../models/UserModel'
import { RoleModel } from '../../models/RoleModel'
import Role from '../../api/Role'
import { bus } from '../../main'

export default Vue.extend({
  props: {
    user: Object as () => UserModel,
    roles: Array as () => Array<RoleModel>,
  },
  data: () => ({
    dialog: false,
    justOpened: true,
    saveLoading: false,
    selectableRoles: [] as Array<RoleModel>,
    selected: -1 as number,
  }),
  methods: {
    refreshRoles() {
        this.saveLoading = false
        this.selectableRoles = this.roles.filter(role => !this.user.roles.find(userRole => userRole.id === role.id))

    },
    confirmEdit() {
      this.saveLoading = true

      Role.addRoleToUser(this.user.id.toString(), this.selected.toString())
      .then(() => {

          const roleToPush = this.roles.find(role => role.id === this.selected) as RoleModel

          this.user.roles.push(roleToPush)

          bus.$emit('successAddingRole', {
              text: 'Successfully added role to user!',
              timeout: 3000
          })
          this.dialog = false
      })
      .catch(err => {
          console.log(err)

          this.saveLoading = false
      })
    
      
    },
    declineEdit() {
      this.dialog = false
    }
  },

  created() {
      
    if(this.justOpened === true) {
      this.justOpened = false
        this.selectableRoles = this.roles.filter(role => !this.user.roles.find(userRole => userRole.id === role.id))

    }
  }
})
</script>t>
