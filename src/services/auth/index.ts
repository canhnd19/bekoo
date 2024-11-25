import request from '@/plugin/request'

import type { IBodyLogin, ILogin } from '@/types/auth.types'
import type { IResponse, IResposeMessage } from '@/types/response.types'
import type { IResAccount, UserReq } from '@/types/user.types'

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
  async forgotPass(email: Record<any, string>): Promise<IResposeMessage> {
    try {
      const result = await request.post(`${this.prefix}/forgot-password/send-otp`, email)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async pinCode(body: Record<any, string>): Promise<IResposeMessage> {
    try {
      const result = await request.post(`${this.prefix}/forgot-password/verify`, body)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async newPass(body: Record<any, string>): Promise<IResposeMessage> {
    try {
      const result = await request.put(`${this.prefix}/password/otp`, body)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async changePass(body: Record<any, string>): Promise<IResposeMessage> {
    try {
      const result = await request.put(`${this.prefix}/password`, body)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getUserInfo(): Promise<IResponse<IResAccount>> {
    try {
      const result = await request.post('/token')
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async editUser(body: UserReq): Promise<IResposeMessage> {
    try {
      const result = await request.put(`${this.prefix}`, body)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
