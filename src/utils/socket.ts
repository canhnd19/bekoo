import { type Socket, io } from 'socket.io-client'

// Define types for our socket service
type EventHandler = (...args: any[]) => void

class SocketService {
  private socket: Socket | null = null
  private url: string
  private options: any
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private eventHandlers: Map<string, EventHandler[]> = new Map()
  private connectionPromise: Promise<void> | null = null

  constructor(url: string, options: any = {}) {
    this.url = url
    this.options = {
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      transports: ['polling', 'websocket'],
      autoConnect: false,
      // withCredentials: true,
      // extraHeaders: {},
      ...options
    }

    // Only initialize in browser environment
    if (typeof window !== 'undefined') {
      this.initialize()
    }
  }

  private initialize() {
    this.socket = io(this.url, this.options)

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server')
      this.reconnectAttempts = 0

      // Re-register all event handlers after reconnection
      this.eventHandlers.forEach((handlers, event) => {
        handlers.forEach((handler) => {
          this.socket?.on(event, handler)
        })
      })
    })

    this.socket.on('disconnect', (reason) => {
      console.log(`Disconnected from Socket.IO server: ${reason}`)
    })

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error)
      this.reconnectAttempts++

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnect attempts reached. Please refresh the page.')
        this.socket?.disconnect()
      }
    })
  }

  public connect(): Promise<void> {
    if (!this.socket) {
      if (typeof window !== 'undefined') {
        this.initialize()
      } else {
        return Promise.reject('Cannot connect on server side')
      }
    }

    if (this.socket!.connected) {
      return Promise.resolve()
    }

    if (this.connectionPromise) {
      return this.connectionPromise
    }

    this.connectionPromise = new Promise<void>((resolve, reject) => {
      if (!this.socket) {
        reject('Socket not initialized')
        return
      }

      const onConnect = () => {
        this.connectionPromise = null
        resolve()
      }

      const onConnectError = (error: Error) => {
        console.error('Socket connection error:', error)
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          this.connectionPromise = null
          reject(error)
        }
      }

      this.socket.once('connect', onConnect)
      this.socket.once('connect_error', onConnectError)

      this.socket.connect()
    })

    return this.connectionPromise
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  public on(event: string, handler: EventHandler): () => void {
    if (!this.socket) {
      if (typeof window !== 'undefined') {
        this.initialize()
      } else {
        console.error('Cannot register event handler on server side')
        return () => {}
      }
    }

    // Store the handler for potential reconnection
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, [])
    }
    this.eventHandlers.get(event)?.push(handler)

    this.socket?.on(event, handler)

    // Return a function to remove the event listener
    return () => {
      this.off(event, handler)
    }
  }

  public off(event: string, handler?: EventHandler): void {
    if (!this.socket) return

    if (handler) {
      this.socket.off(event, handler)

      // Remove from stored handlers
      const handlers = this.eventHandlers.get(event)
      if (handlers) {
        const index = handlers.indexOf(handler)
        if (index !== -1) {
          handlers.splice(index, 1)
        }
        if (handlers.length === 0) {
          this.eventHandlers.delete(event)
        }
      }
    } else {
      this.socket.off(event)
      this.eventHandlers.delete(event)
    }
  }

  public emit(event: string, ...args: any[]): void {
    if (!this.socket) {
      console.error('Socket not initialized')
      return
    }

    this.socket.emit(event, ...args)
  }

  public async emitWithAck(event: string, ...args: any[]): Promise<any> {
    if (!this.socket) {
      throw new Error('Socket not initialized')
    }

    await this.connect()

    return new Promise((resolve, reject) => {
      this.socket?.timeout(10000).emit(event, ...args, (err: Error | null, response: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })
    })
  }

  public isConnected(): boolean {
    return !!this.socket?.connected
  }
}

const socket = new SocketService(import.meta.env.VITE_SOCKET_URL, {})
export default socket
