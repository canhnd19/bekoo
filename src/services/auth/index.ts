import request from '@/plugin/request'

import type { IBodyLogin, ILogin } from '@/types/auth.types'
import type { IResponse } from '@/types/response.types'
import type { UserReq } from '@/types/user.types'

export default class AuthService {
  prefix = '/user'
  async signup(body: UserReq): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}`, body)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async login(body: IBodyLogin): Promise<IResponse<ILogin>> {
    try {
      const result = await request.post(`/sign-in`, body)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async forgotPass(email: Record<any, string>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/forgot-password/send-otp`, email)
      console.log('🚀 ~ AuthService ~ forgotPass ~ result:', result)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
