export interface IBodyLogin {
  email: string
  password: string
}

export interface ILogin {
  expRefreshToken: string
  expToken: string
  refreshToken: string
  roleName: string[]
  tokenContent: string
  userId: string
  userName: string
}
