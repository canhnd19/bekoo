export interface IResponse<T> {
  code: number
  message: string
  value: T
}

export interface IResposeMessage {
  code: number
  message: string
}
