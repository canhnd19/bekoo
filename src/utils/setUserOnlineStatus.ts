import { useAuthStore } from '@/stores/auth'

import getSocket from './socket'

export default function setUserOnlineStatus(status: 'online' | 'offline') {
  const { user } = storeToRefs(useAuthStore())
  const socket = getSocket()

  // Wait for WebSocket connection
  const checkConnection = () => {
    if (socket.getConnectionStatus()) {
      socket.send({
        type: 'USER_STATUS',
        status,
        userId: user.value.patient?.info ? user.value.patient.info.id : user.value.doctor!.info.id
      })
    } else {
      // Try again after 1 second
      setTimeout(checkConnection, 1000)
    }
  }

  checkConnection()
}
