import request from '@/plugin/request'

import useRemoveParams from '@/composables/useRemoveParams'

export default class ReportService {
  prefix = 'report'
  async getDataChartDoctor(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/doctor`, { params: useRemoveParams(params) })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
