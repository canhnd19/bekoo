import type { IQuery } from './query.type'

export interface IBookingQuery extends IQuery {
  name: string
}

export interface IBookingRequest {
  userId: string
  doctorId: string
  specializeId: string
  checkIn: string
  note: string
}