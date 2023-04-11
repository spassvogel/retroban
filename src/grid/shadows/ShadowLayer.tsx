import * as React from 'react'
import { useSelector } from 'react-redux'
import { TileType } from '../../store/reducers/tiles'
import { SokobanStoreState } from '../../store/store'
import { useMemo } from 'react'
import { getPosition, peekNeighor } from '../utils/grid'
import Shadow from './Shadow'

import './shadows.scss'

export type Props = {
  tileSize: number
}

const ShadowLayer = ({ tileSize }: Props) => {
  const columns = useSelector<SokobanStoreState, number>(state => state.tiles.columns)
  const staticTiles = useSelector<SokobanStoreState, TileType[]>(state => state.tiles.static)
  const shadowTiles = useMemo(() => {
    const rows = staticTiles.length / columns
    return staticTiles.map((sTile, index) => {
      if (sTile !== TileType.floor && sTile !== TileType.dropzone) {
        // only pathable tiles get a shadow!
        return {
          hasWallNorth: false,
          hasWallEast: false,
          hasWallWest: false,
          hasWallSouth: false
        }
      }

      const north = peekNeighor(index, columns, rows, 0, -1)
      const hasWallNorth = north !== undefined && staticTiles[north] === TileType.wall

      const east = peekNeighor(index, columns, rows, 1, 0)
      const hasWallEast = east !== undefined && staticTiles[east] === TileType.wall

      const south = peekNeighor(index, columns, rows, 0, 1)
      const hasWallSouth = south !== undefined && staticTiles[south] === TileType.wall

      const west = peekNeighor(index, columns, rows, -1, 0)
      const hasWallWest = west !== undefined && staticTiles[west] === TileType.wall

      return {
        hasWallNorth,
        hasWallEast,
        hasWallWest,
        hasWallSouth
      }
    })
  }, [])
  return (
    <g className="shadow-layer">
      {shadowTiles.map((cfg, i) => {
          const {
            hasWallNorth,
            hasWallEast,
            hasWallWest,
            hasWallSouth
          } = cfg
          if (!hasWallNorth && !hasWallWest) return null
          const { x, y } = getPosition(i, columns)

          return (
            <Shadow
              key={`${x}${y}`}
              x={x}
              y={y}
              tileSize={tileSize}
              hasWallNorth={hasWallNorth}
              hasWallEast={hasWallEast}
              hasWallSouth={hasWallSouth}
              hasWallWest={hasWallWest}
            />
          )
        })
      }
    </g>
  )
}

export default ShadowLayer
