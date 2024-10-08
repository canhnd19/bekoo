import { ElMessage } from 'element-plus'

export default function showError(message: string, _config?: any) {
  if (message) {
    ElMessage.error({ message, duration: 5000 })
  }
}
