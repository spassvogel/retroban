import { useSelector } from "react-redux"
import { SokobanStoreState } from "../../store/store"
import { getPosition, peekNeighor } from "../utils/grid"
import { GO_UP, GO_RIGHT, GO_DOWN, GO_LEFT } from "../../store/actions/tiles"

import './player.scss'
import { useMemo } from "react"
import usePrevious from "../../hooks/usePrevious"
import { ReactComponent as PlayerImage } from './player.svg'
import { ObjectType, TileObject, TilesStoreState } from "../../store/reducers/tiles"
import { DIRECTION } from "../../store/utils/moves"

type Props = {
  index: number
  tileSize: number
}

// enum State {
//   idle,
//   pushing,
// }


const DIRECTIONMAP = {
  [GO_RIGHT]: 'east',
  [GO_DOWN]: 'south',
  [GO_LEFT]: 'west',
  [GO_UP]: 'north'
}

const Player = ({ index, tileSize }: Props) => {
  const { columns, static: staticTiles } = useSelector<SokobanStoreState, TilesStoreState>(state => state.tiles)
  const objects = useSelector<SokobanStoreState, TileObject[]>(state => state.tiles.objects)
  const { x, y } = getPosition(index, columns)
  const lastX = usePrevious(x)
  const lastY = usePrevious(y)
  const direction = useMemo(() => {
    if (lastX == undefined || lastY === undefined) {
      return GO_DOWN
    }
    if (lastX < x) {
      return GO_RIGHT
    }
    if (lastX > x) {
      return GO_LEFT
    }
    if (lastY < y) {
      return GO_DOWN
    }
    if (lastY > y) {
      return GO_UP
    }
    return GO_LEFT
  }, [x, y, lastX, lastY])

  const isAtBox = useMemo(() => {
    const rows = staticTiles.length / columns
    const { x, y } = DIRECTION[direction]
    const destination = peekNeighor(index, columns, rows, x, y)

    return !!objects.find((o) => o.tileIndex === destination && o.objectType === ObjectType.box)
  }, [index])

  const className = [
    `object`,
    `object--type-player`,
    `object--direction-${DIRECTIONMAP[direction]}`,
    ...(isAtBox ? [`object--at-box`] : [])
  ].join(' ')

  return (
    <>
    <PlayerImage
      width={tileSize}
      height={tileSize}
      style={{
        '--x': `${x * tileSize}px`,
        '--y': `${y * tileSize}px`,
      }}
      // x={x * tileSize}
      // y={y * tileSize}
      className={className}
    />
     {/* <image href={`/img/player.svg`}
          x={x * tileSize}
          y={y * tileSize}
          width={tileSize}
          height={tileSize}
        /> */}
    {/* <circle
      data-index={index}
      cx={x * tileSize + tileSize / 2}
      cy={y * tileSize + tileSize / 2}
      r={tileSize / 2}
      className={`object object--type-player`}
      >
    </circle> */}
      {/* <text x={x * tileSize + tileSize / 2} y={y * tileSize + tileSize / 1.5}       textAnchor="middle" fill="white" fontSize="0.5rem">
        {index}
      </text> */}
    </>
  )
}

export default Player
