import type { IUser } from './user.types'

export interface IMessage {
  groupId: number
  lastestMessage: string
  time: string
  userResponse: IUser
}
