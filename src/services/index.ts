import AuthService from './auth'
import ParamService from './param'
import UserService from './users'

export const apiParams: ParamService = new ParamService()
export const apiAuth: AuthService = new AuthService()
export const apiUser: UserService = new UserService()
