import type { IDoctor } from './doctor.types'
import type { IPackage } from './package.types'

export interface UserReq {
  name: string
  phoneNumber: string
  email: string
  cccd: string
  province: string
  district: string
  commune: string
  aboutAddress: string
  password: string
  confirmPassword: string
  dob: string
  gender: string
}

export interface IUser {
  id: string
  name: string
  phoneNumber: string
  email: string
  cccd: string
  province: string
  district: string
  commune: string
  aboutAddress: string
  dob: string
  gender: string
  linkAvatar: string
  roles: [{ name: 'USER' | 'DOCTOR' | 'ADMIN' }]
  createdAt: string
  updatedAt: string
}

export interface IUserTable {
  id: string
  name: string
  email: string
  phoneNumber: string
  linkAvatar: string
  gender: string
}

export interface EmergencyContact {
  name: string
  phone: string
  address: string
  relationship: string
}
export interface InfoPatientReq {
  userId: string
  healthInsuranceNumber: string
  bloodType: string
  emergencyContactCommand: EmergencyContact
}

export interface IPatient {
  bloodType: string
  healthInsuranceNumber: string
  id: string
  emergencyContacts: [EmergencyContact]
  info: IUser
}

export interface IMedicalRecord {
  name: string
  dateOfVisit: string
  diagnosis: string
  treatment: string
  doctorNotes: string
  prescribedMedication: string
}

export interface MedicalRecordReq extends IMedicalRecord {
  patientId: string
}

export interface MedicalRecordRes extends IMedicalRecord {
  id: string
}

export interface IResAccount {
  patient: IPatient | null
  doctor: IDoctor | null
}

export interface IHistoryBoking {
  checkIn: string
  doctor: IDoctor
  id: string
  specialize: IPackage
  status: string
}
export interface ISummary {
  title: string
  icon: string
  color: string
  value: number
}

export interface IReport {
  totalDepartment: number
  totalDoctor: number
  totalPatient: number
  totalSchedule: number
  totalSpecialize: number
}
