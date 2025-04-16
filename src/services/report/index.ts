import request from '@/plugin/request'

import type { IResponse } from '@/types/response.types'
import type { IReport } from '@/types/user.types'

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

  async getDataChartRevenueStatistics(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/price`, { params: useRemoveParams(params) })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDataChartReport(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}`, { params: useRemoveParams(params) })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getDataChartAge(): Promise<{ code: number; message: string; value: { range: string; value: number }[] }> {
    try {
      const rs = await request.get(`${this.prefix}/by-age`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getDataReport(): Promise<IResponse<IReport>> {
    try {
      const rs = await request.get(`${this.prefix}/total`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
