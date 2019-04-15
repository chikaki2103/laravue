require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import Dashboard from './views/Dashboard.vue';
import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import BootstrapVue from 'bootstrap-vue';
import router from './router';
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.component('App', require('./App.vue'));
Vue.use(BootstrapVue);
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
const router1 = new VueRouter({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },{
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false
        }
    },{
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false
        }
    },{
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            auth: true
        }
    }]
    
});
Vue.router = router1
Vue.use(require('websanova/vue-auth'), {
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
