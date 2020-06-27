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
          <v-icon>mdi-star-box-multiple</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User achievements</span>
        </v-card-title>
          <v-data-table
          :headers="headers"
          :items="achievements"
          class="elevation-1"
          >

        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    achievements: Array
  },
  data: () => ({
    dialog: false,
    headers: [
    {
      text: 'Achievement name',
      align: 'center',
      sortable: false,
      value: 'name',
    },
    {
      text: 'Description',
      align: 'center',
      sortable: false,
      value: 'description'
    },
    {
      text: 'Required points',
      align: 'center',
      sortable: true,
      value: 'required_points'
    }
  ],
  }),
  
})
</script>t>
