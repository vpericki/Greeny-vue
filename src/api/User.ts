import Api from './Api'
import Csrf from './Csrf'

export default {
  async register(user: object) {
    
    // Postavlja session header
    await Csrf.getCookie()
    return Api.post('/register', user)
  },

  async login(user: object) {
    await Csrf.getCookie()
    return Api.post('/login', user)
  },
  async logout() {
    await Csrf.getCookie()
    return Api.post('/logout')
  },
  auth() {
    return Api.get('/user', {withCredentials: true})
  },
  async getAll() {
    await Csrf.getCookie()
    return Api.get('/users')
  },
  async updateUser(user: object, id: string) {
    await Csrf.getCookie()
    return Api.put(`/users/${id}`, user)
  },
  async deleteUser(id: string) {
    await Csrf.getCookie()
    return Api.delete(`/users/${id}`)
  }
}


