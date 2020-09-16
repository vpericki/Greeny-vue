<template>
  <v-container grid-list-md data-aos="fade-in">
    <v-layout row wrap>
      <v-flex xs12 md12>
        <v-card dark color="primary">
          <v-card-title>Welcome to code redeeming interface!</v-card-title>
          <v-card-text>Here you can redeem codes!</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md12>
        <v-card color="accent">
            <v-card-title>
                <v-text-field filled label="Your code here" v-model="decodedCode"></v-text-field>
            </v-card-title>
            <v-card-actions>
                <v-btn text class="primary--text" @click="submitCode">Submit</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex data-aos="fade-in" xs12 md12 row class="justify-center">
        <v-card  color="white">
          <v-card-title>Scan QR code {{ error }}</v-card-title>
          <v-card-text><qrcode-stream  @decode="onDecode" @init="onInit" class="stream"></qrcode-stream></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>


    <v-snackbar
      v-model="snackbar"
      class="white--text"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import Codes from '@/api/Codes'

export default Vue.extend({
  data: () => ({
    decodedCode: '' as string,
    error: '' as string,
    snackbar: false as boolean,
    snackbarText: '' as string
  }),
  methods: {
    onDecode (result: string) {

      console.log(result)
      this.decodedCode = result
    },
    async onInit (promise: Promise<string>) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },
    submitCode() {
      Codes.redeemCode(this.decodedCode)
        .then(response => {
          this.snackbarText = response + ""
          this.snackbar = true

        })
        .catch(err => {
          console.log(err)

          if(typeof err !== 'object' && err !== null) {
            this.snackbarText = err.toString()
            this.snackbar = true
          }
          else {
            this.snackbarText = 'Are you sure that is the correct code?'
            this.snackbar = true
          }


        })
    }

  }
})
</script>
<style>

  .stream {
    max-width: 500px;
  }
</style>