import Vue from 'vue'

import './styles/quasar.scss'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar, Notify } from 'quasar'

Vue.use(Quasar, {
  config: {
    brand: {
      primary: '#3399ff',
      secondary: '#99ccff',
      accent: '#3399ff',

      dark: '#1d1d1d',

      positive: '#66ff66',
      negative: '#ff3333',
      info: '#3399ff',
      warning: '#ffff66',
    },
  },
  components: {
    /* not needed if importStrategy is not 'manual' */
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: {
    Notify,
  },
})
