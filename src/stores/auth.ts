// import request from '@/plugin/request'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

// import type { IBodyAuth } from '@/types/auth.types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<Record<string, any>>({})

  const isLogin = computed(() => !!Cookies.get('access_token'))

  // const login = async (body: IBodyAuth) => {
  //   try {
  //     const rs = await apiAuth.login(body)
  //     return Promise.resolve(rs.data)
  //   } catch (error) {
  //     return Promise.reject(error)
  //   }
  // }

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

  // const getUserInfo = async () => {
  //   try {
  //     const rs = await apiAuth.getUserInfo()
  //     user.value = rs.data
  //     return Promise.resolve()
  //   } catch (error) {
  //     return Promise.reject(error)
  //   }
  // }

  // return { login, getUserInfo, user, isLogin, logout }
  return { user, isLogin }
})
