<template>
  <v-app>
    <Navbar>
    </Navbar>
    <v-main class="main-margin">
      <router-view/>
    </v-main>

     <confirm ref="confirm"></confirm>
    <Footer />
  </v-app>


</template>

<script lang="ts">
import Vue from 'vue';
import VueQrCodeReader from "vue-qrcode-reader"
import Navbar from './components/Navbar.vue';
import Confirm from './components/Popups/Confirm.vue'
import Footer from '@/components/Footer.vue'

Vue.use(VueQrCodeReader)

export default Vue.extend({
  name: 'App',

  components: {
    Navbar,
    Confirm,
    Footer
  },

  data: () => ({
    //
  }),
  mounted() {
    this.$root.$data.confirm = this.$refs.confirm
  }
});
</script>
<style>
  .main-margin {
    margin-bottom: 100px;
  }
</style>