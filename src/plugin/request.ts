import axios from 'axios'
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'

import showError from '@/utils/showError'

const API_URL: string | undefined = import.meta.env.VITE_BASE_API

const request = axios.create({
  baseURL: API_URL,
  withCredentials: false
})

request.defaults.headers.put['Content-Type'] = 'application/json'

const token = Cookies.get('access_token')
request.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

request.interceptors.request.use((request) => request)

request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { config, data, status } = error.response

    if (status === 401 || data.errorCode === 401) {
      Cookies.remove('access_token')
      request.defaults.headers.common['Authorization'] = ''
      location.href = '/'
    }
    if (status === 400) {
      showError(data, config)
    }
    if (!error.response || error.response.status >= 500) {
      ElMessage.error({ message: 'Internal Server Error', duration: 5000 })
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default request