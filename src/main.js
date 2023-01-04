import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from '@vue/composition-api'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueCompositionAPI)
Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
