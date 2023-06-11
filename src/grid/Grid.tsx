import { useSelector } from 'react-redux'
import { TileType } from '../store/reducers/tiles'
import { SokobanStoreState } from '../store/store'
import Tile from './Tile'
import ObjectsLayer from './objects/ObjectsLayer'
import ShadowLayer from './shadows/ShadowLayer'
import { useEffect, useRef } from 'react'
import { useDimensions } from '../hooks/useDimensions'

import './grid.scss'

const Grid = () => {
  const staticTiles = useSelector<SokobanStoreState, TileType[]>(state => state.tiles.static)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  const { viewBox, tileSize, zoomBoxTransform } = useDimensions()
console.log(zoomBoxTransform  )
  return (
    <div className="grid" ref={ref} tabIndex={0}>
      <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        <g className="grid-zoombox" style={{ transform: zoomBoxTransform}}>
        {staticTiles.map((tt, i) => (
          <Tile type={tt} index={i} tileSize={tileSize} key={i}/>
          ))}
        <ObjectsLayer tileSize={tileSize}/>
        <ShadowLayer tileSize={tileSize}/>

          </g>
      </svg>
    </div>
  )
}

export default Grid
