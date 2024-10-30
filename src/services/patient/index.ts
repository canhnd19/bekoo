import request from '@/plugin/request'

import type { IResponse, IResponseTable, IResposeMessage } from '@/types/response.types'
import type { IPatient, InfoPatientReq, MedicalRecordReq } from '@/types/user.types'

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

  async getMedicalRecord(id: string): Promise<IResponse<IResponseTable<IPatient[]>>> {
    try {
      const rs = await request.get(`${this.prefix}/history/${id}`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async addMedicalRecord(body: MedicalRecordReq): Promise<IResposeMessage> {
    try {
      const rs = await request.post(`${this.prefix}/history`, useRemoveParams(body))
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
