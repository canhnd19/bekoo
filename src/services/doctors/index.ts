import request from '@/plugin/request'
import requestQuery from '@/plugin/requestQuery'

import type { DoctorReq, IDoctor } from '@/types/doctor.types'
import type { IResponse, IResponseTable, IResposeMessage } from '@/types/response.types'

import useRemoveParams from '@/composables/useRemoveParams'

export default class DoctorService {
  prefix = 'doctor'
  async createDoctor(body: DoctorReq): Promise<IResponse<IDoctor>> {
    try {
      const rs = await request.post(`${this.prefix}`, body)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getAllDoctor(params: Record<string, any>): Promise<IResponse<IResponseTable<IDoctor[]>>> {
    try {
      const rs = await requestQuery.get(`${this.prefix}`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getAllDoctorByName(name: string, params: Record<string, any>): Promise<IResponse<IResponseTable<IDoctor[]>>> {
    try {
      const rs = await requestQuery.get(`${this.prefix}/name/${name}`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async deteteDoctor(params: Record<string, any>): Promise<IResposeMessage> {
    try {
      const rs = await request.delete(`${this.prefix}/${useRemoveParams(params)}`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDoctorByName(name: string): Promise<IResponse<IResponseTable<IDoctor[]>>> {
    try {
      const rs = await requestQuery.get(`${this.prefix}/name/${name}`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getDoctorById(id: string): Promise<IResponse<IDoctor>> {
    try {
      const rs = await requestQuery.get(`${this.prefix}/id/${id}`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async setPatientADay(body: Record<string, any>): Promise<IResposeMessage> {
    try {
      const rs = await request.put(`${this.prefix}/day`, body)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async editDoctor(body: Record<string, any>): Promise<IResposeMessage> {
    try {
      const rs = await request.put(`${this.prefix}`, body)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
