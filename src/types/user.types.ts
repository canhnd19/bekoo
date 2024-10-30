export interface UserReq {
  name: string
  phoneNumber: string
  email: string
  cccd: string
  province: string
  district: string
  commune: string
  aboutAddress: string
  password: string
  confirmPassword: string
  dob: string
  gender: string
}

export interface IUser {
  id: string
  name: string
  phoneNumber: string
  email: string
  cccd: string
  province: string
  district: string
  commune: string
  aboutAddress: string
  dob: string
  gender: string
  linkAvatar: string
  createdAt: string
  updatedAt: string
}

export interface IUserTable {
  id: string
  name: string
  email: string
  phoneNumber: string
  linkAvatar: string
  gender: string
}

export interface InfoPatientReq {
  userId: string
  healthInsuranceNumber: string
  bloodType: string
  emergencyContactCommand: {
    name: string
    phone: string
    address: string
    relationship: string
  }
}
