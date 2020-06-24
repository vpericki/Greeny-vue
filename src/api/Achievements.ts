import Api from './Api'
import Csrf from './Csrf'

export default {
  async index() {
    
    // Postavlja session header
    await Csrf.getCookie()
    return Api.get('/achievement')
  },

  async getAchievementById(id: string) {
    await Csrf.getCookie()
    return Api.get(`/achievement/${id}`)
  }
}