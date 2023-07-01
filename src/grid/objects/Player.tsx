import { useSelector } from "react-redux"
import { SokobanStoreState } from "../../store/store"
import { peekNeighor } from "../../utils/grid"

import { CSSProperties, useEffect, useMemo, useRef } from "react"
import { ReactComponent as PlayerImage } from './player.svg'
import { ObjectType, TileObject, TilesStoreState } from "../../store/reducers/tiles"
import { DIRECTION, DOWN, LEFT, RIGHT, UP } from "../../store/utils/moves"

import { usePlayerOrientation } from "../../hooks/usePlayerOrientation"
import useAnimatedPosition from "../../hooks/useAnimatedPosition"

import './player.scss'

type Props = {
  index: number
  tileSize: number
}
const DIRECTIONMAP = {
  [RIGHT]: 'east',
  [DOWN]: 'south',
  [LEFT]: 'west',
  [UP]: 'north'
}
const ANIMATION_TIME = 500

const Player = ({ index, tileSize }: Props) => {
  const { columns, static: staticTiles } = useSelector<SokobanStoreState, TilesStoreState>(state => state.tiles)
  const objects = useSelector<SokobanStoreState, TileObject[]>(state => state.tiles.objects)
  const time = useSelector<SokobanStoreState, number>(state => state.userAction.time ?? Date.now())
  const orientation = usePlayerOrientation()
  const direction = DIRECTIONMAP[orientation]
  const ref = useRef<SVGGElement>(null)

  const { x, y } = useAnimatedPosition(index, ref)

  const isAtBox = useMemo(() => {
    const rows = staticTiles.length / columns
    const { x, y } = DIRECTION[orientation]
    const destination = peekNeighor(index, columns, rows, x, y)

    return !!objects.find((o) => o.tileIndex === destination && o.objectType === ObjectType.box)
  }, [columns, orientation, index, objects, staticTiles.length])

  useEffect(() => {
    if (Date.now() - time < ANIMATION_TIME) {
      ref.current?.classList.add(`object--anim-walk`)
    }
    const removeAnim = () => {
      ref.current?.classList.remove(`object--anim-walk`)
    }
    const timeout = setTimeout(removeAnim, ANIMATION_TIME)
    return () => {
      clearTimeout(timeout)
    }
  }, [time])


  const className = [
    `object`,
    `object--type-player`,
    `object--direction-${direction}`,
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
    </g>
  )
}

export default Player
