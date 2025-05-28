export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  RECONNECT = 'reconnect',
  RECONNECTING = 'reconnecting',
  RECONNECT_ERROR = 'reconnect_error',
  RECONNECT_FAILED = 'reconnect_failed'
}

export interface WebSocketMessage {
  [key: string]: any
}

export type WebSocketEventType = 'connect' | 'message' | 'close' | 'error' | 'chat-history'

export type WebSocketEventCallback = (data: any) => void

export interface WebSocketListeners {
  [event: string]: WebSocketEventCallback[]
}

export interface ChatMessage {
  requestType: 'Chat'
  data: {
    senderId: string
    content: string
  }
}

export interface MessageResoponse {
  code: number
  message: string
  value: string
}
