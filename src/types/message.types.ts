export interface IMessageHistory {
  content: string
  time: any
  type: number
}

export interface IListUserChat {
  code: number
  message: string
  value: IChat[]
}

export interface IChat {
  content: string
  name: string
  senderId: null | string
  time: string
  userId: string
  avatar: string
}
