import request from '@/plugin/request'

import type { DoctorReq } from '@/types/doctor.types'

export default class DoctorService {
  prefix = 'doctor'
  async createDoctor(body: DoctorReq): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}`, body)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
