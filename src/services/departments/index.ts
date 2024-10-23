import request from '@/plugin/request'
import requestQuery from '@/plugin/requestQuery'

import type { IDepartment } from '@/types/department.types'
import type { IResponse, IResponseTable, IResposeMessage } from '@/types/response.types'

import useRemoveParams from '@/composables/useRemoveParams'

export default class DepartmentService {
  prefix = 'department'
  async createdDepartment(body: Record<string, any>): Promise<IResponse<IDepartment>> {
    try {
      const rs = await request.post(`${this.prefix}`, body)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getAllDepartment(params: Record<string, any>): Promise<IResponse<IResponseTable<any[]>>> {
    try {
      const rs = await requestQuery.post(`${this.prefix}`, useRemoveParams(params))
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async addDoctorDepartment(body: Record<string, any>): Promise<IResposeMessage> {
    try {
      const rs = await request.post(`${this.prefix}/doctor/new-one`, body)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
