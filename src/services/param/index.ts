import axios from 'axios'

import type { IDistrict, IProvince, IWard, ResProvince } from '@/types/param.types'

export default class ParamService {
  prefix = 'https://open.oapi.vn'

  async getListProvince(): Promise<ResProvince<IProvince>> {
    try {
      const rs = await axios.get(`${this.prefix}/location/provinces`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListDistrict(code: number | string): Promise<ResProvince<IDistrict>> {
    try {
      const rs = await axios.get(`${this.prefix}/location/districts?provinceId=${code}`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListWards(code: number | string): Promise<ResProvince<IWard>> {
    try {
      const rs = await axios.get(`${this.prefix}/location/wards?districtId=${code}`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
