import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/api/User'

Vue.use(Vuex)

/* eslint-disable */
export default new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('auth') ? true : false,
    pending: false,
    roles: localStorage.getItem('userRoles') ? JSON.parse(localStorage.getItem('userRoles') as string) : []
 
  },
  mutations: {
    auth_pending(state) {
      state.pending = true
    },
    auth_success(state) {
      state.isLoggedIn = true
      state.pending = false
    },
    auth_logout(state) {
      state.isLoggedIn = false
    },
    auth_failed(state) {
      state.isLoggedIn = false
      state.pending = false
    }
    
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_pending')
      
        User.login(user)
          .then(response => {
            localStorage.setItem('auth', 'true')
            localStorage.setItem('userRoles', JSON.stringify(response.data[1]))            
                                  
            commit('auth_success')
            resolve(response)
          })
          .catch(err => {
            commit('auth_failed')
            reject(err)
          })
      })

    },

    logout({commit}) {
      return new Promise((resolve, reject) => {
        User.logout()
        .then(() => {
          localStorage.removeItem('auth')
          localStorage.removeItem('roles')

          commit('auth_logout')

          resolve()
        })
        .catch(err => {
          commit('auth_failed')
          reject(err)
        })

      })

    }

  }, 
  getters: {
    isLoggedIn: state => {      
      return state.isLoggedIn
    },
    roles: state => {
      return state.roles
    }
  },
  modules: {
  }
})
