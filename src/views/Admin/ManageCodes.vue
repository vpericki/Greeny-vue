<template>
  <v-container grid-list-md data-aos="fade-in">
    <v-layout row wrap>
      <v-flex xs12 md12>
        <v-progress-linear indeterminate color="#2b463c" :active="loading" ></v-progress-linear>
      </v-flex>

      <v-flex xs12 md12>
          <v-data-table
            :headers="headers"
            :items="rewardCodes"
            multi-sort
          >
          <template v-slot:item.delete = " { item } ">
            <v-icon large color="red darken-2" @click="deleteDialog(item.id)">mdi-delete-forever</v-icon>
          </template>

          </v-data-table>


      </v-flex>
      <v-flex xs12 md12>
        <v-card dark color="#2b463c">
          <v-card-title>Interface for managing secret codes!</v-card-title>
          <v-card-text>Here you can delete or create codes</v-card-text>
        </v-card>
      </v-flex>


      <v-flex xs12 md12>
        <v-card dark color="primary">
          <v-card-title>Generate random code</v-card-title>
          <v-card-text>
            <p>Code length: <strong class="code-length">{{ slider }}</strong></p>
            <v-container>
              <v-slider
                class="align-center"
                max="16"
                min="6"
                v-model="slider"
              >
              </v-slider>

              <v-text-field label="Number of reward points" :rules="rewardRules" v-model="randomCodeReward" required type="number"></v-text-field>

              <v-btn outlined @click="generateRandomCode(randomCodeReward)">Generate</v-btn>
            </v-container>
          </v-card-text>

        </v-card>

      </v-flex>
      <v-flex xs12 md12>
        <v-card dark color="primary">
          <v-card-title>Generate code</v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field label="Code" v-model="code" required></v-text-field>

              <v-text-field label="Number of reward points" :rules="rewardRules" v-model="codeReward" required type="number"></v-text-field>

              <v-btn outlined @click="generateCode(code, codeReward)">Generate</v-btn>
            </v-container>
          </v-card-text>

        </v-card>

      </v-flex>



      <v-snackbar
            v-model="snackbar"
          >
            {{ snackbarText }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="accent"
                text
                :multiline = "true"
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
      randomCodeReward: Number,
      rewardRules: [
        (v: number) => !!v || 'Required',
        (v: number) => v <=100 || 'Cannot award more than 100 points!',
        (v: number) => v > 0 || 'Cannot award 0 points or less!' 
      ],
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
          value: 'unique_code',
        },
        { 
          text: 'Points',
          value: 'reward',
          sortable: true,
          align: 'left'
        },        
        {
          text: 'Delete',
          value: 'delete',
          sortable: false,
          align: 'center'
        }
      ],
      snackbar: false,
      snackbarText: "" as string,
      code: "" as string,
      codeReward: Number,



    }
  },
  methods: {
    generateRandomCode(randomCodeReward: number) {
      Codes.generateRandomCode(this.slider, randomCodeReward)
        .then(response => {

          const rewardCode = response.data as RewardCodeModel
          this.rewardCodes.push(rewardCode)

          this.snackbar = true
          this.snackbarText = `Generated a new code with ID ${rewardCode.id}`


        })
        .catch(error => {
          this.snackbar = true

          console.log(error)
          this.snackbarText = error
        })
    },
    generateCode(code: string, codeReward: number) {

      Codes.generateCode(code, codeReward)
        .then(response => {

          const code = response.data as RewardCodeModel

          this.rewardCodes.push(code)

          this.snackbar = true
          this.snackbarText = `Created a new code with ID ${code.id}`

        })
        .catch((error) => {
          this.snackbar = true
          
          this.snackbarText = error.message ? error.message : error
          if(error.errors) {
              this.snackbarText = ""
              // eslint-disable-next-line


              
              for(const key in error.errors) {
                this.snackbarText += (error.errors[key][0])


              }
            }


          })


    },
  async deleteDialog(id: number) {
      
      if( await this.$root.$data.confirm.open('Delete', 'Are you sure?', { color: 'red' })) {
          Codes.delete(id)
          .then(() => {
            console.log('successfully deleted a reward code');
            
            this.rewardCodes = this.rewardCodes.filter(code => code.id !== id)
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
