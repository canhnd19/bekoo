import type { IQuery } from './query.type'
import type { UserReq } from './user.types'

export interface DoctorReq {
  trainingBy: string
  description: string
  user: UserReq
}

export interface IDoctor {
  id: string
  description: string
  trainingBy: string
  totalPatientsVisited: number
  maximumPeoplePerDay: number
  department: string
  info: {
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
    roles: []
    linkAvatar: string
    createdAt: string
    updatedAt: string
  }
}

export interface QueryDoctor extends IQuery {
  name: string
}
