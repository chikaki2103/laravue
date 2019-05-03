require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue';
// import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
// import Dashboard from './views/Dashboard.vue';
// import Home from './components/Home.vue';
// import Register from './components/Register.vue';
// import Login from './components/Login.vue';
import BootstrapVue from 'bootstrap-vue';
import Toasted from 'vue-toasted';
import VueSwal from 'vue-swal';
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
import ability from './config/ability'
import { abilitiesPlugin } from 'casl/vue'
import { Can } from 'casl/vue'
// import defineAbilitiesFor  from './config/ability'
import router from './router';
// window.ability = ability
Vue.use(VueAxios, axios);
Vue.component('App', require('./App.vue'));
Vue.component('Can', Can)
Vue.use(BootstrapVue);
Vue.use(Toasted);
Vue.use(VueSwal);
Vue.use(ServerTable);
Vue.use(abilitiesPlugin);

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
// console.log(ability.rules)
  // console.log(localStorage.getItem("rule")))
// ability.on('update', ({ rules, ability }) => {
 
// })
// ability.update(defineRulesFor)
// const router1 = new VueRouter({
//     routes: [{
//         path: '/',
//         name: 'home',
//         component: Home
//     },{
//         path: '/register',
//         name: 'register',
//         component: Register,
//         meta: {
//             auth: false
//         }
//     },{
//         path: '/login',
//         name: 'login',
//         component: Login,
//         meta: {
//             auth: false
//         }
//     },{
//         path: '/dashboard',
//         name: 'dashboard',
//         component: Dashboard,
//         meta: {
//             auth: true
//         }
//     }]
    
// });
Vue.router = router;
Vue.use(require('websanova/vue-auth'), {
   notFoundRedirect: { path: '/dashboard' },
   auth: require('websanova/vue-auth/drivers/auth/bearer.js'),
   http: require('websanova/vue-auth/drivers/http/axios.1.x.js'),
   router: require('websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});
App.router = Vue.router
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
