import request from '@/plugin/request'

import useRemoveParams from '@/composables/useRemoveParams'

export default class SpecializeService {
  prefix = 'specialize'
  async createPackage(body: Record<string, any>): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}`, useRemoveParams(body))
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getAllPackage(params: Record<string, any>): Promise<IResponse<IResponseTable<IDoctor[]>>> {
    try {
      const rs = await requestQuery.post(`${this.prefix}`, useRemoveParams(params))
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
