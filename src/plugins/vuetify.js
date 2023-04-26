import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import '@/styles/custom.scss';

Vue.use(Vuetify);

export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 0,
      sm: 0,
      md: 0,
      lg: 0
    },
  },
  theme: {
    options: {
      customProperties: true,
    },
    dark: false,
    themes: {
      light: {
        primary: {
          lighten1: '#DCECFC',
          lighten2: '#B0D0F0',
          lighten3: '#6AA2D9',
          lighten4: '#004385',
          base: '#0054A6',
        },
        grey: {
          lighten1: '#F9FAFA',  // G0
          lighten2: '#F5F5F5',  // G1
          lighten3: '#E5E5E5',  // G2
          lighten4: '#BEBEBE',  // G3
          lighten5: '#767676',  // G4
          base: '#333333',      // G5
        },
        red: '#ED1B2F',
        orange: '#FF8A00',
        yellow: '#FFCB05',
        green: '#4CAF50',
        YellowGreen: '#B4DC73',
      }
    }
  }
});
