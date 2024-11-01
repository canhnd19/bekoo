import request from '@/plugin/request'

import type { IBookingRequest } from '@/types/booking.types'
import type { IResponse, IResponseTable, IResposeMessage } from '@/types/response.types'

import useRemoveParams from '@/composables/useRemoveParams'

export default class BookingService {
  prefix = 'schedule'
  async booking(body: IBookingRequest): Promise<IResposeMessage> {
    try {
      const rs = await request.post(`${this.prefix}`, body)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getMedicalScheduleDay(params: Record<string, any>, id: string): Promise<IResponse<IResponseTable<any>>> {
    try {
      const rs = await request.get(`${this.prefix}/doctor/day/${id}`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getMedicalAllDay(params: Record<string, any>, id: string): Promise<IResponse<IResponseTable<any>>> {
    try {
      const rs = await request.get(`${this.prefix}/doctor/${id}`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
