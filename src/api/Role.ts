import Api from './Api'
import Csrf from './Csrf'

export default {

  async getAll() {
    Csrf.getCookie()
    return Api.get('/roles')
  },
  async deleteRoleFromUser(idUser: string, idRole: string) {
    await Csrf.getCookie()
    return Api.delete(`/role/${idUser}/${idRole}`)
  },
  async addRoleToUser(idUser: string, idRole: string) {
    await Csrf.getCookie()
    return Api.put(`/role/${idUser}/${idRole}`)
  }
}
