import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2b463c',
        accent: '#f4f1e9',
      },
      dark: {
        primary: '#2b463c',
        accent: '#f4f1e9',
      },
    },
  },
});
