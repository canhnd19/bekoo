export interface ResProvince<T> {
  total: number
  data: T
}

export interface IProvince {
  id: string
  name: string
  type: number
  typeText: string
  slug: string
}

export interface IDistrict {
  id: string
  name: string
  provinceId: string
  type: number
  typeText: string
}

export interface IWard {
  id: string
  name: string
  districtId: string
  type: number
  typeText: string
}
