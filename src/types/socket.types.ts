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

export type WebSocketEventType = 'connect' | 'message' | 'close' | 'error'

export type WebSocketEventCallback = (data: any) => void

export interface WebSocketListeners {
  [event: string]: WebSocketEventCallback[]
}

export interface ChatMessage {
  type: string
  content: string
  timestamp: number
}
