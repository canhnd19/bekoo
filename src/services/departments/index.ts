import request from '@/plugin/request'
import requestQuery from '@/plugin/requestQuery'

import type { IDepartment } from '@/types/department.types'
import type { IDoctor } from '@/types/doctor.types'
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
  async editDepartment(body: Record<string, any>): Promise<IResponse<IDepartment>> {
    try {
      const rs = await request.post(`${this.prefix}/info`, body)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getAllDepartment(): Promise<IResponse<IResponseTable<IDepartment[]>>> {
    try {
      const rs = await requestQuery.get(`${this.prefix}/departments`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListDepartment(params: Record<string, any>): Promise<IResponse<IResponseTable<IDepartment[]>>> {
    try {
      const rs = await requestQuery.get(`${this.prefix}/departments`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getAllDepartmentByName(params: Record<string, any>): Promise<IResponse<IResponseTable<IDepartment[]>>> {
    try {
      const rs = await requestQuery.get(`${this.prefix}/name`, {
        params: useRemoveParams(params)
      })
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

  async deteteDepartment(ids: string): Promise<IResposeMessage> {
    try {
      const rs = await request.delete(`${this.prefix}/${ids}`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListDoctorOfDepartment(
    ids: string,
    params: Record<string, any>
  ): Promise<IResponse<IResponseTable<IDoctor[]>>> {
    try {
      const rs = await requestQuery.get(`${this.prefix}/doctor/${ids}`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async deleteDoctorDepartment(body: Record<string, any>): Promise<IResposeMessage> {
    try {
      const rs = await request.post(`${this.prefix}/doctor/delete`, body)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
