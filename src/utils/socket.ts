import type {
  WebSocketEventCallback,
  WebSocketEventType,
  WebSocketListeners,
  WebSocketMessage
} from '@/types/socket.types'

import { safeJsonParse } from '@/utils/jsonSanitizer'

import { useAuthStore } from '@/stores/auth'

class WebSocketService {
  private url: string
  private socket: WebSocket | null
  private isConnected: boolean
  private reconnectAttempts: number
  private maxReconnectAttempts: number
  private reconnectInterval: number
  private listeners: WebSocketListeners
  private pendingMessages: WebSocketMessage[]
  private connectionTimeout: number
  private pingInterval: NodeJS.Timeout | null

  constructor(url: string) {
    this.url = url
    this.socket = null
    this.isConnected = false
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectInterval = 3000
    this.listeners = {}
    this.pendingMessages = []
    this.connectionTimeout = 10000 // 10 seconds timeout
    this.pingInterval = null

    this.connect()
  }

  public connect(): void {
    try {
      // Clear any existing connection
      if (this.socket) {
        this.socket.close()
        this.socket = null
      }

      // Clear ping interval
      if (this.pingInterval) {
        clearInterval(this.pingInterval)
        this.pingInterval = null
      }

      this.socket = new WebSocket(this.url)

      // Set connection timeout
      const timeoutId = setTimeout(() => {
        if (!this.isConnected) {
          console.error('WebSocket connection timeout')
          this.socket?.close()
        }
      }, this.connectionTimeout)

      this.socket.onopen = (event: Event): void => {
        clearTimeout(timeoutId)
        console.log('WebSocket connection established')
        this.isConnected = true
        this.reconnectAttempts = 0

        // Start ping interval to keep connection alive
        this.pingInterval = setInterval(() => {
          if (this.isConnected) {
            this.send({ type: 'PING' })
          }
        }, 30000) // Send ping every 30 seconds

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

          // Handle PONG response
          if (data.type === 'PONG') {
            return
          }

          console.log('Message from server:', data)

          // Notify listeners
          this.notifyListeners('message', data)
        } catch (error) {
          console.error('Error processing message:', error)

          // Even if parsing fails, notify listeners with the raw data
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

        // Clear ping interval
        if (this.pingInterval) {
          clearInterval(this.pingInterval)
          this.pingInterval = null
        }

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
      // Try to reconnect after error
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++
        setTimeout(() => this.connect(), this.reconnectInterval)
      }
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

let socketInstance: WebSocketService | null = null

export function initSocket() {
  if (socketInstance) {
    return socketInstance
  }

  const { user, isLoggedIn } = storeToRefs(useAuthStore())
  const userId = isLoggedIn.value
    ? user.value.patient?.info
      ? user.value.patient.info.id
      : user.value.doctor?.info.id
    : ''

  const baseUrl = import.meta.env.VITE_SOCKET_URL
  const url = userId ? `${baseUrl}?userId=${userId}` : baseUrl
  socketInstance = new WebSocketService(url)

  socketInstance.addListener('connect', () => {
    console.log('Connected to WebSocket server')
  })

  return socketInstance
}

// Export a function to get the socket instance
export default function getSocket() {
  if (!socketInstance) {
    socketInstance = initSocket()
  }
  return socketInstance
}
