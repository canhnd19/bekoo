import type { IUser } from './user.types'

export interface IMessage {
  groupId: number
  lastestMessage: string
  time: string
  userResponse: IUser
}
// type DateArray = [number, number, number, number, number, number, number]
export interface IMessageHistory {
  content: string
  time: any
  type: number
}
