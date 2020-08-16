import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './quasar'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  uri: 'https://internal-crab-28.hasura.app/v1/graphql',
})

Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
  apolloProvider,
}).$mount('#app')
