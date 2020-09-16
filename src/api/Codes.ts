import Api from './Api'
import Csrf from './Csrf'

export default {
  async index() {
    await Csrf.getCookie()
    return Api.get('/rewardcodes')
  },
  async generateRandomCode(length: number, reward: number) {
    await Csrf.getCookie()
    return Api.post(`/rewardcodes/${length}/${reward}`)
  },
  async generateCode(code: string, reward: number) {
    await Csrf.getCookie()
    return Api.post(`/rewardcodes/${reward}`, {code: code})
  },
  async delete(id: number) {
    await Csrf.getCookie()
    return Api.delete(`/rewardcodes/${id}`)
  },
  async redeemCode(code: string) {
    await Csrf.getCookie()
    return Api.get(`/rewardcodes/redeem/${code}`)
  }

}
