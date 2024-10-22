import type { UserReq } from './user.types'

export interface DoctorReq {
  trainingBy: string
  description: string
  user: UserReq
}
