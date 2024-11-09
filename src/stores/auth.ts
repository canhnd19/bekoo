import request from '@/plugin/request'
import requestQuery from '@/plugin/requestQuery'
import { apiAuth, apiPatient } from '@/services'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

import type { IBodyLogin } from '@/types/auth.types'
import type { IPatient, IResAccount } from '@/types/user.types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IResAccount>({} as IResAccount)
  const patient = ref<IPatient>({} as IPatient)
  const access_token = Cookies.get('access_token') || ''
  const accessToken = ref(access_token)
  const isLoggedIn = computed(() => !!Cookies.get('access_token'))
  const role = ref<'USER' | 'DOCTOR' | 'ADMIN'>('USER')
  const login = async (body: IBodyLogin) => {
    try {
      const rs = await apiAuth.login(body)
      accessToken.value = rs.value.tokenContent
      Cookies.set('access_token', accessToken.value, { expires: 3 })
      request.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
      await getUserInfo()
      await getPatientInfo()
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

  const logout = async () => {
    try {
      Cookies.remove('access_token')
      request.defaults.headers.common['Authorization'] = ''
      requestQuery.defaults.headers.common['Authorization'] = ''
      location.href = '/login'
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const getUserInfo = async () => {
    try {
      const rs = await apiAuth.getUserInfo()
      user.value = rs.value
      role.value = (rs.value.patient ? rs.value.patient.info.roles[0].name : rs.value.doctor?.info.roles[0].name) as
        | 'USER'
        | 'DOCTOR'
        | 'ADMIN'
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const getPatientInfo = async () => {
    try {
      if (user.value.patient?.info.roles[0].name === 'USER') {
        const rs = await apiPatient.getPatientInfo(user.value.patient.info.id)
        patient.value = rs.value ? rs.value : ({} as IPatient)
        return Promise.resolve()
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { login, user, isLoggedIn, setBearerToken, getUserInfo, logout, getPatientInfo, patient, role }
})
