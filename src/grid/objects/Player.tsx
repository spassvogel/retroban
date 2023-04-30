import { useSelector } from "react-redux"
import { SokobanStoreState } from "../../store/store"
import { getPosition, peekNeighor } from "../utils/grid"
import { GO_UP, GO_RIGHT, GO_DOWN, GO_LEFT } from "../../store/actions/tiles"

import './player.scss'
import { CSSProperties, useEffect, useMemo, useRef } from "react"
import usePrevious from "../../hooks/usePrevious"
import { ReactComponent as PlayerImage } from './player.svg'
import { ObjectType, TileObject, TilesStoreState } from "../../store/reducers/tiles"
import { DIRECTION, Direction } from "../../store/utils/moves"

import { UserActionState } from "../../store/reducers/userAction"

type Props = {
  index: number
  tileSize: number
}

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
  const direction = useSelector<SokobanStoreState, Direction>(state => state.userAction.lastAttemptedAction ?? GO_RIGHT)
  const ref = useRef<SVGGElement>(null)

  const isAtBox = useMemo(() => {
    const rows = staticTiles.length / columns
    const { x, y } = DIRECTION[direction]
    const destination = peekNeighor(index, columns, rows, x, y)

    return !!objects.find((o) => o.tileIndex === destination && o.objectType === ObjectType.box)
  }, [columns, direction, index, objects, staticTiles.length])

  const className = [
    `object`,
    `object--type-player`,
    `object--anim-walk`,
    `object--direction-${DIRECTIONMAP[direction]}`,
    ...(isAtBox ? [`object--at-box`] : [])
  ].join(' ')

  useEffect(() => {
    const keydown = () => {
      ref.current?.classList.add('object--keydown')
    }
    const keyup = () => {
      ref.current?.classList.remove('object--keydown')
    }

    document.addEventListener('keydown', keydown, false)
    document.addEventListener('keyup', keyup, false)
    return () => {
      document.removeEventListener('keydown', keydown, false)
      document.removeEventListener('keyup', keyup, false)
    }
  }, [])

  return (
    <g
      ref={ref}
      style={{
        '--x': `${x * tileSize}px`,
        '--y': `${y * tileSize}px`,
      } as CSSProperties}
      className={className}
      >
    <PlayerImage
      width={tileSize}
      height={tileSize}

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
    </g>
  )
}

export default Player
