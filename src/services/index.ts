import AuthService from './auth'
import DoctorService from './doctors'
import ParamService from './param'
import UserService from './users'

export const apiParams: ParamService = new ParamService()
export const apiAuth: AuthService = new AuthService()
export const apiUser: UserService = new UserService()
export const apiDoctor: DoctorService = new DoctorService()
