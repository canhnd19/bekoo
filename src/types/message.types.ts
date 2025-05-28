export interface IMessageHistory {
  content: string
  createdAt: string
  createdBy: string
}

export interface IChatHistory {
  code: number
  message: string
  value: IMessageHistory[]
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
