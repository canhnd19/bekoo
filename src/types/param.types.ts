type BaseRsPro = {
  name: string
  code: number
  division_type: string
  codename: string
}

export interface IProvince extends BaseRsPro {
  phone_code: number
  districts: []
}

export interface IDistrict extends BaseRsPro {
  province_code: number
  wards: []
}

export interface ResDistrict extends BaseRsPro {
  phone_code: number

  districts: IDistrict[]
}

export interface IWard extends BaseRsPro {
  district_code: number
}
export interface ResWard extends BaseRsPro {
  province_code: number
  wards: IWard[]
}
