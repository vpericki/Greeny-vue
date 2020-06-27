import Api from './Api'
import Csrf from './Csrf'
import store from '@/store'
import { AchievementModel } from '@/models/AchievementModel'

export default {
  async index() {
    
    // Postavlja session header
    await Csrf.getCookie()
    return Api.get('/achievement')
  },

  async getAchievementById(id: string) {
    await Csrf.getCookie()
    return Api.get(`/achievement/${id}`)
  },
  async getUserAchievements(id: string) {
    await Csrf.getCookie()
    return Api.get(`/achievement/user/${id}`)
  },
  async delete(id: string) {
    await Csrf.getCookie()
    return Api.delete(`/achievement/${id}`)
  },
  async store(achievement: AchievementModel) {
    await Csrf.getCookie()
    return Api.post(`/achievement`, achievement)
  }
}