import { useSelector } from "react-redux"
import { TileType } from "../store/reducers/tiles"
import { RootState } from "../store/store"
import { getPosition } from "./utils/grid"

import './tile.scss'


type Props = {
  type: TileType
  index: number
  tileSize: number
}

const Tile = ({ type, index, tileSize }: Props) => {
  const columns = useSelector<RootState, number>(state => state.tiles.columns)
  const { x, y } = getPosition(index, columns)

  return (
    <rect
      data-index={index}
      x={x * tileSize}
      y={y * tileSize}
      width={tileSize}
      height={tileSize}
      className={`tile tile--${TileType[type]}`}
    >
    </rect>
  )
}

export default Tile
