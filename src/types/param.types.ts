export interface IBaseRes {
  code: number
  codename: string
  division_type: string
  name: string
}

export interface IProvince extends IBaseRes {
  phone_code: number
  districts: []
}

export interface IDistrict extends IBaseRes {
  phone_code: number
  districts: []
}

export interface IWard extends IBaseRes {
  province_code: number
  wards: []
}
