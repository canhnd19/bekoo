import request from '@/plugin/request'

import type { InfoPatientReq } from '@/types/user.types'

import useRemoveParams from '@/composables/useRemoveParams'

export default class PatientService {
  prefix = 'patient'
  async updatePatientInfo(body: InfoPatientReq): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}`, useRemoveParams(body))
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
