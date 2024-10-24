import request from '@/plugin/request'

export default class UploadService {
  prefix = 'user'
  async uploadFile(formData: any): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/avatar`, formData)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
