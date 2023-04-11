import { useSelector } from 'react-redux'
import { TileType } from '../store/reducers/tiles'
import { SokobanStoreState } from '../store/store'
import Tile from './Tile'

import './grid.scss'
import ObjectsLayer from './objects/ObjectsLayer'

const Grid = () => {
  const columns = useSelector<SokobanStoreState, number>(state => state.tiles.columns)
  const staticTiles = useSelector<SokobanStoreState, TileType[]>(state => state.tiles.static)
  const tileSize = 100 / columns
  const viewBoxHeight = Math.floor(staticTiles.length / columns) * tileSize

  // console.log(`columns`, columns)
  return (
    <div className="grid">
      <svg viewBox={`0 0 100 ${isNaN(viewBoxHeight) ? 100 : viewBoxHeight}`} xmlns="http://www.w3.org/2000/svg">
        {staticTiles.map((tt, i) => (
          <Tile type={tt} index={i} tileSize={tileSize} key={i}/>
        ))}
        <ObjectsLayer tileSize={tileSize}/>
      </svg>
    </div>
  )
}

export default Grid
