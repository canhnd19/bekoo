import request from '@/plugin/request'
import requestQuery from '@/plugin/requestQuery'

import type { IResponse, IResponseTable, IResposeMessage } from '@/types/response.types'
import type { IUserTable } from '@/types/user.types'

import useRemoveParams from '@/composables/useRemoveParams'

export default class UserService {
  prefix = 'user'
  async getAllUser(params: Record<string, any>): Promise<IResponse<IResponseTable<IUserTable[]>>> {
    try {
      const rs = await requestQuery.get(`${this.prefix}`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getAllUserByName(name: string, params: Record<string, any>): Promise<IResponse<IResponseTable<IUserTable[]>>> {
    try {
      const rs = await requestQuery.get(`${this.prefix}/name/${name}`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async deteteUser(params: Record<string, any>): Promise<IResposeMessage> {
    try {
      const rs = await request.delete(`${this.prefix}/${useRemoveParams(params)}`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
