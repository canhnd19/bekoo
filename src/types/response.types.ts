export interface IResponse<T> {
  code: number
  message: string
  value: T
}

export interface IResposeMessage {
  code: number
  message: string
}
export interface IResponseTable<T> {
  pageIndex: number
  pageSize: number
  orders: []
  totalPage: number
  totalElements: number
  contentResponse: T
}
