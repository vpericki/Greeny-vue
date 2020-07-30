<template>
  <v-container grid-list-md data-aos="fade-in">
    <v-layout row wrap>
      <v-flex xs12 md12>
        <v-card dark color="#2b463c">
          <v-card-title>Interface for managing secret codes!</v-card-title>
          <v-card-text>Here you can delete or create codes</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md12>
        <v-progress-linear indeterminate color="#2b463c" :active="loading" ></v-progress-linear>
      </v-flex>

      <v-flex xs12 md12>
        <v-card dark color="primary">
          <v-card-title>Generate random code</v-card-title>
          <v-card-text>
            <p>Code length: <strong class="code-length">{{ slider }}</strong></p>
            <v-slider
              class="align-center"
              max="16"
              min="6"
              v-model="slider"
            >
            </v-slider>

            <v-btn outlined @click="generateRandomCode()">Generate</v-btn>

          </v-card-text>

        </v-card>

      </v-flex>



    </v-layout>

  </v-container>

</template>

<script lang="ts">
import Vue from 'vue'
import {RewardCodeModel} from '@/models/RewardCodeModel'
import Codes from '@/api/Codes'

export default Vue.extend({
  components: {
  },
  data() {
    return {
      loading: false,
      slider: 6,
      rewardCodes: [] as Array<RewardCodeModel>,
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Reward Code',
          align: 'left',
          sortable: true,
          value: 'reward_code',
        },
        { 
          text: 'Points',
          value: 'points',
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

    }
  },
  methods: {
    generateRandomCode() {
      return
    }
  },
  created() {
    this.loading = true

    Codes.index()
      .then(response => {
        this.loading = false
        this.rewardCodes = response.data

        console.log(this.rewardCodes)
      })
      .catch(err => {
        console.log(err)
        this.loading = false
      })
  },
})
</script>
<style scoped>
  .code-length {
    font-size: 24px;
  }
</style>
