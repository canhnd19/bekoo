import type { IPackage } from './package.types'
import type { IQuery } from './query.type'
import type { IPatient } from './user.types'

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
  patient: IPatient
  specialize: IPackage
  checkIn: string
  status: string
}
