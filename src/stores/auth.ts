import request from '@/plugin/request'
import { apiAuth } from '@/services'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

import type { IBodyLogin } from '@/types/auth.types'
import type { IUser } from '@/types/user.types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser>({} as IUser)
  const access_token = Cookies.get('access_token') || ''
  const accessToken = ref(access_token)
  const isLogin = computed(() => !!Cookies.get('access_token'))
  const userId = ref<string>('')
  const login = async (body: IBodyLogin) => {
    try {
      const rs = await apiAuth.login(body)
      userId.value = rs.value.userId
      sessionStorage.setItem('userId', rs.value.userId)
      accessToken.value = rs.value.tokenContent
      Cookies.set('access_token', accessToken.value, { expires: 3 })
      request.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
      await getUserInfo()
      return Promise.resolve(rs.value)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const setBearerToken = (token: string) => {
    Cookies.set('access_token', token, { expires: 3 })
    accessToken.value = token
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  // const logout = async () => {
  //   try {
  //     await apiAuth.logout()
  //     Cookies.remove('access_token')
  //     request.defaults.headers.common['Authorization'] = ''
  //     requestSub.defaults.headers.common['Authorization'] = ''
  //     return Promise.resolve()
  //   } catch (error) {
  //     return Promise.reject(error)
  //   }
  // }

  const getUserInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId') as string
      const rs = await apiAuth.getUserInfo(userId)
      user.value = rs.value
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { login, user, isLogin, setBearerToken, getUserInfo }
})
