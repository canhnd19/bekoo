import type { IPackage } from './package.types'
import type { IPatient } from './user.types'

export interface IBookingRequest {
  patientId: string
  doctorId: string
  specializeId: string
  checkIn: string
  note: string
  paymentMethod: number
}

export interface IResBooking {
  id: string
  patient: IPatient
  specialize: IPackage
  checkIn: string
  status: string
}
