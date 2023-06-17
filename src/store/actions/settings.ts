import { SettingsAction } from "./types"
import { ZoomLevel } from "../reducers/settings"

export const ZOOM_IN = 'ZOOM_IN'
export const ZOOM_OUT = 'ZOOM_OUT'
export const SET_ZOOM_LEVEL = 'SET_ZOOM_LEVEL'

export const zoomIn = (): SettingsAction => ({
  type: ZOOM_IN,
})

export const zoomOut = (): SettingsAction => ({
  type: ZOOM_OUT,
})

export const setZoomLevel = (zoomLevel: ZoomLevel): SettingsAction => ({
  type: SET_ZOOM_LEVEL,
  payload: zoomLevel
})

