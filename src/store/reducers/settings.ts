import { Reducer } from "@reduxjs/toolkit"
import { SettingsAction } from "../actions/types"
import { SET_ZOOM_LEVEL, ZOOM_IN, ZOOM_OUT } from "../actions/settings"

/**
 * 0 = default zoomlvl
 * 1 = medium zoom out
 * 2 = most zoomed out
 * note that zooming OUT actually INCREASES the zoomLevel and vice versa!
 */
export type ZoomLevel = 0 | 1 | 2
export const ZOOMLEVEL_MAX = 2

export type SettingsStoreState = {
  zoomLevel: ZoomLevel
}

const initial: SettingsStoreState = {
  zoomLevel: 0
}

const settings: Reducer<SettingsStoreState, SettingsAction> = (state = initial, action) => {
  switch (action.type) {
    case ZOOM_IN: {
      const newZoomLevel = Math.max(state.zoomLevel - 1, 0) as ZoomLevel
      return {
        ...state,
        zoomLevel: newZoomLevel
      }
    }
    case ZOOM_OUT: {
      const newZoomLevel = Math.min(state.zoomLevel + 1, 2) as ZoomLevel
      return {
        ...state,
        zoomLevel: newZoomLevel
      }
    }
    case SET_ZOOM_LEVEL: {
      return {
        ...state,
        zoomLevel: action.payload
      }
    }
  }
  return state
}

export default settings
