import type {
  WebSocketEventCallback,
  WebSocketEventType,
  WebSocketListeners,
  WebSocketMessage
} from '@/types/socket.types'

import { safeJsonParse } from '@/utils/jsonSanitizer'

class WebSocketService {
  private url: string
  private socket: WebSocket | null
  private isConnected: boolean
  private reconnectAttempts: number
  private maxReconnectAttempts: number
  private reconnectInterval: number
  private listeners: WebSocketListeners
  private pendingMessages: WebSocketMessage[]

  constructor(url: string) {
    this.url = url
    this.socket = null
    this.isConnected = false
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectInterval = 3000
    this.listeners = {}
    this.pendingMessages = []

    this.connect()
  }

  public connect(): void {
    try {
      this.socket = new WebSocket(this.url)

      this.socket.onopen = (event: Event): void => {
        console.log('WebSocket connection established')
        this.isConnected = true
        this.reconnectAttempts = 0

        // Send pending messages
        if (this.pendingMessages.length > 0) {
          this.pendingMessages.forEach((msg: WebSocketMessage) => this.send(msg))
          this.pendingMessages = []
        }

        // Notify listeners
        this.notifyListeners('connect', event)
      }

      this.socket.onmessage = (event: MessageEvent): void => {
        try {
          // Use the safe JSON parser with sanitization
          const data = safeJsonParse(event.data)
          console.log('Message from server:', data)

          // Notify listeners
          this.notifyListeners('message', data)
        } catch (error) {
          console.error('Error processing message:', error)

          // Even if parsing fails, notify listeners with the raw data
          // This allows custom handling of malformed messages
          this.notifyListeners('error', {
            type: 'parse_error',
            error,
            rawData: event.data
          })
        }
      }

      this.socket.onclose = (event: CloseEvent): void => {
        this.isConnected = false
        console.log(`WebSocket connection closed: ${event.code} ${event.reason}`)

        // Notify listeners
        this.notifyListeners('close', event)

        // Reconnect logic
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++
          console.log(`Trying to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`)
          setTimeout(() => this.connect(), this.reconnectInterval)
        } else {
          console.error('Max reconnect attempts reached. Please refresh the page.')
        }
      }

      this.socket.onerror = (error: Event): void => {
        console.error('WebSocket Error:', error)
        this.notifyListeners('error', error)
      }
    } catch (error) {
      console.error('Unable to create WebSocket connection:', error)
    }
  }

  public send(message: WebSocketMessage): void {
    if (!this.isConnected) {
      // Queue message to send later
      this.pendingMessages.push(message)
      console.warn('WebSocket not connected yet. Message will be sent after connection.')
      return
    }
    // console.log('🚀 ~ WebSocketService ~ send ~ message:', {
    //   ...message,
    //   time: new Date().toLocaleString()
    // })
    try {
      if (this.socket) {
        this.socket.send(JSON.stringify(message))
      }
    } catch (error) {
      console.error('Error sending WebSocket message:', error)
    }
  }

  public addListener(event: WebSocketEventType, callback: WebSocketEventCallback): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)

    return (): void => {
      if (this.listeners[event]) {
        const index = this.listeners[event].indexOf(callback)
        if (index !== -1) {
          this.listeners[event].splice(index, 1)
        }
      }
    }
  }

  private notifyListeners(event: string, data: any): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback: WebSocketEventCallback) => callback(data))
    }
  }

  public disconnect(): void {
    if (this.socket && this.isConnected) {
      this.socket.close(1000, 'Disconnect from client')
    }

    this.isConnected = false
    this.listeners = {}
    this.pendingMessages = []
    this.reconnectAttempts = 0
  }

  public getConnectionStatus(): boolean {
    return this.isConnected
  }
}

const socket = new WebSocketService(import.meta.env.VITE_SOCKET_URL)

socket.addListener('connect', () => {
  console.log('Connected to WebSocket server')
})

export default socket
