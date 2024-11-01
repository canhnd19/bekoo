import type { IQuery } from './query.type'

export interface IBookingQuery extends IQuery {
  name: string
}

export interface IBookingRequest {
  patientId: string
  doctorId: string
  specializeId: string
  checkIn: string
  note: string
}

export interface IResBooking {
  id: string
  user: string
  specialize: {
    id: string
    name: string
    description: string
    price: number | string
    department: {
      id: string
      name: string
      description: string
      urlImage: string
    }
  }
  checkIn: string
  status: string
}
