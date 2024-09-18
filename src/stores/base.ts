import { filter, union } from 'lodash-es'
import { defineStore } from 'pinia'

import type { DRAWER_NAME, POPUP_NAME } from '@/types/popup.types'

export const useBaseStore = defineStore('base', () => {
  const popup = ref<string[]>([])
  const drawer = ref<string[]>([])
  const isDesktop = ref(true)

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

  return {
    popup,
    drawer,
    setOpenPopup,
    setOpenDrawer,
    isDesktop,
    emptyDrawerAndPopup
  }
})
