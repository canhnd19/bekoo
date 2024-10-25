import request from '@/plugin/request'

import type { IBookingRequest } from '@/types/booking.types'
import type { IResposeMessage } from '@/types/response.types'

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
}
