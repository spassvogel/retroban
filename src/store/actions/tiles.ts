import { TilesAction } from "./types"

export const GO_UP = 'GO_UP'
export const GO_RIGHT = 'GO_RIGHT'
export const GO_DOWN = 'GO_DOWN'
export const GO_LEFT = 'GO_LEFT'
export const MOVE_BOX = 'MOVE_BOX'

export const goUp = (): TilesAction => ({
  type: GO_UP
})

export const goRight = (): TilesAction => ({
  type: GO_RIGHT
})

export const goDown = (): TilesAction => ({
  type: GO_DOWN
})

export const goLeft = (): TilesAction => ({
  type: GO_LEFT
})

// Only used for undo. Moves a box back to previous position
export const moveBox = (from: number, to: number): TilesAction => ({
  type: MOVE_BOX,
  payload: {
    from,
    to
  }
})
