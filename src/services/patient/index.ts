import request from '@/plugin/request'

import type { IResponse } from '@/types/response.types'
import type { IPatient, InfoPatientReq } from '@/types/user.types'

import useRemoveParams from '@/composables/useRemoveParams'

export default class PatientService {
  prefix = 'patient'
  async updatePatientInfo(body: InfoPatientReq): Promise<IResponse<IPatient>> {
    try {
      const rs = await request.post(`${this.prefix}`, useRemoveParams(body))
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getPatientInfo(id: string): Promise<IResponse<IPatient>> {
    try {
      const rs = await request.get(`${this.prefix}/${id}`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
