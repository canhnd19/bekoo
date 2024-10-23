import AuthService from './auth'
import DepartmentService from './departments'
import DoctorService from './doctors'
import ParamService from './param'
import SpecializeService from './specializes'
import UserService from './users'

export const apiParams: ParamService = new ParamService()
export const apiAuth: AuthService = new AuthService()
export const apiUser: UserService = new UserService()
export const apiDoctor: DoctorService = new DoctorService()
export const apiDepartment: DepartmentService = new DepartmentService()
export const apiSpecialize: SpecializeService = new SpecializeService()
