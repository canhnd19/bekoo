import axios from 'axios'

import type { IDistrict, IProvince, IWard } from '@/types/param.types'

export default class ParamService {
  prefix = 'https://provinces.open-api.vn'

  async getListProvince(): Promise<IProvince[]> {
    try {
      const rs = await axios.get(`${this.prefix}/api/p`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListDistrict(code: number | string): Promise<IDistrict> {
    try {
      const rs = await axios.get(`${this.prefix}/api/p/${code}?depth=2`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListWards(code: number | string): Promise<IWard> {
    try {
      const rs = await axios.get(`${this.prefix}/api/d/${code}?depth=2`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
