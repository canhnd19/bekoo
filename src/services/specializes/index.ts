import request from '@/plugin/request'

import type { IPackage } from '@/types/package.types'
import type { IResponse, IResponseTable, IResposeMessage } from '@/types/response.types'

import useRemoveParams from '@/composables/useRemoveParams'

export default class SpecializeService {
  prefix = 'specialize'
  async createPackage(body: Record<string, any>): Promise<IResposeMessage> {
    try {
      const rs = await request.post(`${this.prefix}`, useRemoveParams(body))
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListPackage(params: Record<string, any>): Promise<IResponse<IResponseTable<IPackage[]>>> {
    try {
      const rs = await request.post(`${this.prefix}/query-all`, useRemoveParams(params))
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async detetePackage(ids: string): Promise<IResposeMessage> {
    try {
      const rs = await request.delete(`${this.prefix}/${ids}`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
