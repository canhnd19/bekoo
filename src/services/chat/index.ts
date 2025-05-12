import request from '@/plugin/request'

export default class ChatService {
  prefix = 'chat'
  async getListUserChat(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/list-user`, {
        params: params
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
