import requestQuery from '@/plugin/requestQuery'

import useRemoveParams from '@/composables/useRemoveParams'

export default class UserService {
  prefix = '/user'
  async getAllUser(params: Record<string, any>): Promise<any> {
    try {
      const rs = await requestQuery.get(`${this.prefix}`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
