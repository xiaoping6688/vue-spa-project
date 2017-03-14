import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import App from './App'
import store from './store'
import router from './routes'
import * as filters from './filters'

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// bootstrap vue app
const app = new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export { app, router, store }
