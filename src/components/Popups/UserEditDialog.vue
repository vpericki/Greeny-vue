<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon x-large
          color="#2b463c"
          light
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account-edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit user</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Username*" :rules="usernameRules" required v-model="user.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" :error="error['email'] ? true : false" :error-messages="error['email'] ? 'E-mail is already taken' : ''" :rules="emailRules" required v-model="user.email"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Points*" :rules="pointRules" type="number"  required v-model="user.points"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="declineEdit()">Close</v-btn>
          <v-btn color="primary" text @click="confirmEdit(user.id)" :loading="saveLoading">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
import User from '../../api/User'
import { bus } from '../../main'

export default Vue.extend({
  props: {
    user: Object
  },
  data: () => ({
    dialog: false,
    justOpened: true,
    userCopy: {
      name: '',
      email: '',
      points: 0
    },
    error: {},
    usernameRules: [
      (v: string) => !!v || 'Name is required',
    ],
    emailRules: [
      (v: string) => !!v || 'E-mail is required',
      (v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
      
    ],
    pointRules: [
      (v: number) => !!v || 'Number is required',
      (v: number) => v >= 0 || 'Number must be equal to or greater than 0'
    ],
    saveLoading: false
  }),
  methods: {
    confirmEdit(id: string) {
      this.saveLoading = true

      const editedUser = {
        name: this.user.name,
        email: this.user.email,
        points: this.user.points
      }

      User.updateUser(editedUser, id)
      .then(() => {
        this.error = {}
        this.userCopy = this.user

        this.dialog = false

        bus.$emit('editUserSnackbar', {
          text: 'Successfully edited user!',
          timeout: 4000
        })

        this.saveLoading = false

      })
      .catch(err => {
        console.log(err);
        this.saveLoading = false

        if(err.errors) {
          this.error = err.errors
        } else {
          this.error = err
        }
        
      })
    },
    declineEdit() {
      this.user.name = this.userCopy.name
      this.user.email = this.userCopy.email
      this.user.points = this.userCopy.points

      this.dialog = false
    }
  },
  created() {
    if(this.justOpened === true) {
      this.justOpened = false

      this.userCopy = {
        name: this.user.name,
        email: this.user.email,
        points: this.user.points
      }
    }
  }
})
</script>t>
