import { useSelector } from 'react-redux'
import { TileType } from '../store/reducers/tiles'
import { RootState } from '../store/store'
import Tile from './Tile'

import './grid.scss'

const Grid = () => {
  const columns = useSelector<RootState, number>(state => state.tiles.columns)
  const staticTiles = useSelector<RootState, TileType[]>(state => state.tiles.static)
  const tileSize = 100 / columns
  // const svgHeight = props.columns ? 100 * props.rows / props.columns : 100
  const viewBoxHeight = Math.floor(staticTiles.length / columns) * tileSize

  // console.log(`columns`, columns)
  return (
    <div className="grid">
      <svg viewBox={`0 0 100 ${viewBoxHeight}`} xmlns="http://www.w3.org/2000/svg">
        {staticTiles.map((tt, i) => (
          <Tile type={tt} index={i} tileSize={tileSize} key={i}/>
        ))}
      </svg>
    </div>
  )
}

export default Grid
