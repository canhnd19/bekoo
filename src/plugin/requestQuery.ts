import axios from 'axios'
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'

import showError from '@/utils/showError'

const API_URL: string | undefined = import.meta.env.VITE_BASE_API_QUERY

const requestQuery = axios.create({
  baseURL: API_URL,
  withCredentials: false
})

requestQuery.defaults.headers.put['Content-Type'] = 'application/json'
// request.defaults.headers.common['ngrok-skip-browser-warning'] = '241804'

const token = Cookies.get('access_token')
requestQuery.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

requestQuery.interceptors.request.use((requestQuery) => requestQuery)

requestQuery.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { config, data, status } = error.response
    if (status === 401 || data.errorCode === 401) {
      Cookies.remove('access_token')
      requestQuery.defaults.headers.common['Authorization'] = ''
      location.href = '/'
    }
    if (status === 400) {
      showError(data.message, config)
    }
    if (!error.response || error.response.status >= 500) {
      ElMessage.error({ message: 'Internal Server Error', duration: 5000 })
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default requestQuery
