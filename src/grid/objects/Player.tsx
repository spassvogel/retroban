import { useSelector } from "react-redux"
import { SokobanStoreState } from "../../store/store"
import { getPosition } from "../utils/grid"

import './player.scss'
import { useMemo, useRef } from "react"
import usePrevious from "../../hooks/usePrevious"

type Props = {
  index: number
  tileSize: number
}

enum Direction {
  east,
  south,
  west,
  north
}

const Player = ({ index, tileSize }: Props) => {
  const columns = useSelector<SokobanStoreState, number>(state => state.tiles.columns)
  const { x, y } = getPosition(index, columns)
  const lastX = usePrevious(x)
  const lastY = usePrevious(y)

  const direction = useMemo(() => {
    if (lastX == undefined || lastY === undefined) {
      return Direction.south
    }
    if (lastX < x) {
      return Direction.east
    }
    if (lastX > x) {
      return Direction.west
    }
    if (lastY < y) {
      return Direction.south
    }
    if (lastY > y) {
      return Direction.north
    }
    return Direction.west
  }, [x, y, lastX, lastY])

  return (
    <>
     <image href={`/img/player.svg`}
          className={`object object--type-player object--direction-${Direction[direction]}`}
          x={x * tileSize}
          y={y * tileSize}
          width={tileSize}
          height={tileSize}
        />
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
