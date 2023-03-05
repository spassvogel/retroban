export const GO_UP = 'GO_UP'
export const GO_RIGHT = 'GO_RIGHT'
export const GO_DOWN = 'GO_DOWN'
export const GO_LEFT = 'GO_LEFT'

export type TilesAction = {
  type: typeof GO_UP
} | {
  type: typeof GO_RIGHT
} | {
  type: typeof GO_DOWN
} | {
  type: typeof GO_LEFT
}
