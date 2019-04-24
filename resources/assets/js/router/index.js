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
import resetpassword from '@/containers/ResetPassword'
import Register from '@/views/pages/Register'
//roles
import RoleIndex from '@/components/roles/RoleIndex';
import RoleCreate from '@/components/roles/RoleCreate';
import RoleEdit from '@/components/roles/RoleEdit';
import UserIndex from '@/components/users/UserIndex';

Vue.use(Router)

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
          component: Dashboard
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
      path: '/resetpassword',
      name: 'resetpassword',
      component: resetpassword,
       meta: {
            auth: false
        }
    },
     {
      name: 'FormMail',
      path: '/email/form',
      component: FormMail
  },
  {
      name:'SuccessMail',
      path:'/email/success',
      component: SuccessMail

  }
 
  ]
})

