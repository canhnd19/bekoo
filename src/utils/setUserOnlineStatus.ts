import { useAuthStore } from '@/stores/auth'

export default function setUserOnlineStatus(status: 'online' | 'offline') {
  const { user } = storeToRefs(useAuthStore())
  socket.send({
    type: 'USER_STATUS',
    status,
    userId: user.value.patient?.info ? user.value.patient.info.id : user.value.doctor!.info.id
  })
}
