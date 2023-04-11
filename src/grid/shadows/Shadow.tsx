import * as React from 'react'

export type Props = {
  x: number
  y: number
  tileSize: number
  hasWallNorth: boolean
  hasWallEast: boolean
  hasWallSouth: boolean
  hasWallWest: boolean
}

const SIZE = 0.2

// A shadow is placed over a floor or dropzone tile. The walls surrounding it determine the shape
const Shadow = ({ x, y, tileSize, hasWallNorth, hasWallEast, hasWallSouth, hasWallWest}: Props) => {

  if (hasWallNorth && hasWallWest) {
    if (hasWallEast) {
      // corner wall shadow, without edge on the east side (because there is a wall there)
      return (
        <polygon
          className="shadow-corner"
          points={`
            ${x * tileSize}, ${y * tileSize}
            ${x * tileSize + tileSize}, ${y * tileSize}
            ${x * tileSize + tileSize}, ${y * tileSize + tileSize * SIZE}
            ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
            ${x * tileSize}, ${y * tileSize}
            ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
            ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize + tileSize * SIZE}
            ${x * tileSize}, ${y * tileSize + tileSize}
          `}
        />
      )
    }
    if (hasWallSouth) {
      // corner wall shadow, without edge on the south side (because there is a wall there)
      return (
        <polygon
          className="shadow-corner"
          points={`
            ${x * tileSize}, ${y * tileSize}
            ${x * tileSize + tileSize}, ${y * tileSize}
            ${x * tileSize + tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
            ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
            ${x * tileSize}, ${y * tileSize}
            ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
            ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize }
            ${x * tileSize}, ${y * tileSize + tileSize}
          `}
        />
      )
    }
    // regular corner wall shadow
    return (
      <polygon
        className="shadow-corner"
        points={`
          ${x * tileSize}, ${y * tileSize}
          ${x * tileSize + tileSize}, ${y * tileSize}
          ${x * tileSize + tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
          ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
          ${x * tileSize}, ${y * tileSize}
          ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
          ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize + tileSize * SIZE}
          ${x * tileSize}, ${y * tileSize + tileSize}
        `}
      />
    )
  }
  if (hasWallNorth) {
    if (hasWallEast) {
      // north wall shadow, without edge on the east side (because there is a wall there)
      return (
        <polygon
          className="shadow-north--no-edge-east"
          points={`
            ${x * tileSize}, ${y * tileSize}
            ${x * tileSize + tileSize}, ${y * tileSize}
            ${x * tileSize + tileSize}, ${y * tileSize + tileSize * SIZE}
            ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
          `}
        />
      )
    }
    return (
      // regular north wall shadow,
      <polygon
        className="shadow-north"
        points={`
          ${x * tileSize}, ${y * tileSize}
          ${x * tileSize + tileSize}, ${y * tileSize}
          ${x * tileSize + tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
          ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
        `}
      />
    )
  }
  if (hasWallWest) {
    if (hasWallSouth) {
      // west wall shadow, without edge on the south side (because there is a wall there)
      return (
        <polygon
          className="shadow-west--no-edge-south"
          points={`
            ${x * tileSize}, ${y * tileSize}
            ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
            ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize }
            ${x * tileSize}, ${y * tileSize + tileSize}
          `}
        />
      )
    }
    return (
      // regular west wall shadow
      <polygon
        className="shadow-west"
        points={`
          ${x * tileSize}, ${y * tileSize}
          ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize * SIZE}
          ${x * tileSize + tileSize * SIZE}, ${y * tileSize + tileSize + tileSize * SIZE}
          ${x * tileSize}, ${y * tileSize + tileSize}
        `}
      />
    )
  }
  return null
}

export default Shadow
