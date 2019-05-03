import Vue from 'vue'
import Router from 'vue-router'

import FormMail from '@/components/FormMail.vue';
import SuccessMail from '@/components/SuccessMail.vue';

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Charts from '@/views/Charts'
import Widgets from '@/views/Widgets'

// Views - Components
import Buttons from '@/views/components/Buttons'
import SocialButtons from '@/views/components/SocialButtons'
import Cards from '@/views/components/Cards'
import Forms from '@/views/components/Forms'
import Modals from '@/views/components/Modals'
import Switches from '@/views/components/Switches'
import Tables from '@/views/components/Tables'

// Views - Icons
import FontAwesome from '@/views/icons/FontAwesome'
import SimpleLineIcons from '@/views/icons/SimpleLineIcons'

// Views - Pages
import Page404 from '@/views/pages/Page404'
import Page500 from '@/views/pages/Page500'
import Login from '@/containers/Login'
import ForgotPasword from '@/containers/ForgotPasword'
import ResetPassword from '@/containers/ResetPassword.vue'
import Register from '@/views/pages/Register'
import InvalidToken from '@/views/pages/InvalidToken.vue'
//roles
import RoleIndex from '@/components/roles/RoleIndex';
import RoleCreate from '@/components/roles/RoleCreate';
import RoleEdit from '@/components/roles/RoleEdit';
import UserIndex from '@/components/users/UserIndex';
import PermissionIndex from '@/components/permissions/PermissionIndex';
import defineRulesFor from '@/config/ability'

Vue.use(Router)

// router.beforeEach(async (to, from, next)=>{
//   let rules = combileRulesOf(roles);
//   ability.update(rules); 
// })
export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      meta: {auth: true},
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          beforeEnter: (to, from, next) => {
          var role = JSON.parse(localStorage.getItem("role"));
          var permission = JSON.parse(localStorage.getItem("permissions"));

           var ability = defineRulesFor(role,permission);
           console.log(ability.rules[0])
           next();
          }
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
         {
      name:'role',
      path:'/role',
      component: RoleIndex

       },
        {
        name:'user',
        path:'/user',
        component: UserIndex
       },
        {
        name:'permission',
        path:'/permission',
        component: PermissionIndex
       },
      // {
      //     path: '/',
      //     components:RoleIndex,
      //     name : RoleIndex 
      // },
      {path: '/admin/roles/create', component: RoleCreate, name: 'createRole'},
      {path: '/admin/roles/edit/:id', component: RoleEdit, name: 'editRole'},

        {
          path: 'components',
          redirect: '/components/buttons',
          name: 'Components',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'buttons',
              name: 'Buttons',
              component: Buttons
            },
            {
              path: 'social-buttons',
              name: 'Social Buttons',
              component: SocialButtons
            },
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/font-awesome',
          name: 'Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'font-awesome',
              name: 'Font Awesome',
              component: FontAwesome
            },
            {
              path: 'simple-line-icons',
              name: 'Simple Line Icons',
              component: SimpleLineIcons
            }
          ]
        }
      ]
    },

    {
      path: '/pages',
      redirect: '/pages/p404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: '/invalid-token',
          name: 'InvalidToken',
          component: InvalidToken,
          meta: {

            auth: false
          }
        },

        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
       meta: {
            auth: false
        }
    },
     {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPasword,
      meta: {
        auth: false
      }
    },

  //    {
  //     name: 'FormMail',
  //     path: '/email/form',
  //     component: FormMail
  // },
  // {
  //     name:'SuccessMail',
  //     path:'/email/success',
  //     component: SuccessMail

  // },
  {
      path: '/reset-password/:token',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: {
        auth: false
      }
    }

 
  ]
})

