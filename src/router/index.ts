import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)


// Authorize can be:
/*
  User
  Admin
  SuperAdmin 
*/

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { authorize: ['User']}
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: () => import('../views/Achievements.vue'),
    meta: { authorize: ['User']}
  },
  {
    path: '/achievement/:id',
    name: 'AchievementDetails',
    component: () => import('../views/AchievementDetails.vue'),
  },  {
    path: '/manage/users',
    name: 'ManageUsers',
    component: () => import('../views/ManageUsers.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import('../views/Forbidden.vue'),
  },
  {
    // redirect to home if no path
    path: '*', redirect: '/'
  }
  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  const { authorize } = to.meta

  if(authorize) {
    if (store.getters.isLoggedIn) {

      if(authorize.length == 0) {
        next()
        return
      }

      if(authorize.length > 0 && authorize.some((role: string) => store.getters.roles.includes(role))) {
        next()
        return
      } else {
        next('/')
        return
      }
    } else {
      next('/login')
      return
    }
  }

    next() 
  
})


export default router
