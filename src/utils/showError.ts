import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'

export default function showError(data: Record<string, any>, _config?: any) {
  let message = ''
  const { status } = data
  switch (status) {
    case 'USER_LOCKED':
      message = 'Account has been locked'
      setTimeout(() => {
        Cookies.remove('access_token')
        location.href = '/'
      }, 1000)
      break
    default:
      break
  }
  if (message) {
    ElMessage.error({ message, duration: 5000 })
  }
}
