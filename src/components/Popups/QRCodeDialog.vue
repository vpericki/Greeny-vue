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
          <v-icon>mdi-qrcode</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">QR Code</span>
        </v-card-title>
        <v-container>
          <v-row class="text-center">

            <qrcode :value="code" :options="{ width: 200 }"></qrcode>

          </v-row>

        </v-container>
      
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
    code: String,
    reward: Number
  },
  data: () => ({
    dialog: false,
    error: {},
    saveLoading: false
  }),
})
</script>t>
