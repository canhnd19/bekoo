import request from '@/plugin/request'

import type { IBookingRequest, IResBooking } from '@/types/booking.types'
import type { IResponse, IResponseTable } from '@/types/response.types'
import type { IHistoryBoking } from '@/types/user.types'

import useRemoveParams from '@/composables/useRemoveParams'

export default class BookingService {
  prefix = 'schedule'
  async booking(body: IBookingRequest): Promise<IResponse<string>> {
    try {
      const rs = await request.post(`${this.prefix}`, body)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getMedicalScheduleDay(
    params: Record<string, any>,
    id: string
  ): Promise<IResponse<IResponseTable<IResBooking[]>>> {
    try {
      const rs = await request.get(`${this.prefix}/doctor/day/${id}`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getMedicalScheduleAllDay(
    params: Record<string, any>,
    id: string,
    statusId: number
  ): Promise<IResponse<IResponseTable<IResBooking[]>>> {
    try {
      const rs = await request.get(`${this.prefix}/doctor/${id}/${statusId}`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getDataBookingHistory(
    id: string,
    statusId: number,
    params: Record<string, any>
  ): Promise<IResponse<IResponseTable<IHistoryBoking[]>>> {
    try {
      const rs = await request.get(`${this.prefix}/patient/${id}/${statusId}`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async deleteBooking(id: string): Promise<any> {
    try {
      const rs = await request.delete(`${this.prefix}/${id}`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDoctorAppointmentTime(params: { date: string; doctorId: string }): Promise<
    IResponse<{
      afternoon: { range: string; timeCheckIn: string; available: boolean }[]
      morning: { range: string; timeCheckIn: string; available: boolean }[]
    }>
  > {
    try {
      const rs = await request.get(`${this.prefix}/doctor/time`, {
        params: useRemoveParams(params)
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
