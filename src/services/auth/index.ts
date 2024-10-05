import request from '@/plugin/request'

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
}
