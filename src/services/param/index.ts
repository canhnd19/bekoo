import axios from 'axios'

import type { IProvince, ResDistrict, ResWard } from '@/types/param.types'

export default class ParamService {
  prefix = 'https://provinces.open-api.vn/api'

  async getListProvince(): Promise<IProvince[]> {
    try {
      const rs = await axios.get(`${this.prefix}/p/`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListDistrict(code: number | string): Promise<ResDistrict> {
    try {
      const rs = await axios.get(`${this.prefix}/p/${code}?depth=2`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListWards(code: number | string): Promise<ResWard> {
    try {
      const rs = await axios.get(`${this.prefix}/d/${code}?depth=2`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
