import { apiDepartment, apiParams } from '@/services'
import { filter, union } from 'lodash-es'
import { defineStore } from 'pinia'

import type { IDepartment } from '@/types/department.types'
import type { IProvince } from '@/types/param.types'
import type { DRAWER_NAME, POPUP_NAME } from '@/types/popup.types'

export const useBaseStore = defineStore('base', () => {
  const popup = ref<string[]>([])
  const drawer = ref<string[]>([])
  const isDesktop = ref(true)
  const province = ref<IProvince[]>([])
  const department = ref<IDepartment[]>([])

  const setOpenPopup = (popupName: POPUP_NAME, isOpen = true) => {
    if (isOpen) {
      popup.value = union(popup.value, [popupName])
    } else {
      popup.value = filter(popup.value, (value) => {
        return value !== popupName
      })
    }
  }

  const setOpenDrawer = (drawName: DRAWER_NAME, isOpen = true) => {
    if (isOpen) {
      drawer.value = union(drawer.value, [drawName])
    } else {
      drawer.value = filter(drawer.value, (value) => {
        return value !== drawName
      })
    }
  }

  const emptyDrawerAndPopup = () => {
    drawer.value = []
    popup.value = []
  }

  const getListProvince = async () => {
    try {
      const rs = await apiParams.getListProvince()
      province.value = rs
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const getDepartment = async () => {
    try {
      const rs = await apiDepartment.getAllDepartment({
        pageIndex: 1,
        pageSize: 16
      })
      department.value = rs.value.contentResponse
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    popup,
    drawer,
    setOpenPopup,
    setOpenDrawer,
    isDesktop,
    emptyDrawerAndPopup,
    province,
    getListProvince,
    getDepartment,
    department
  }
})
