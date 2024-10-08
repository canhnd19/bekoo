export interface IResponse<T> {
  code: number
  message: string
  value: T
}
