import { useSelector } from "react-redux"
import { TileType } from "../store/reducers/tiles"
import { SokobanStoreState } from "../store/store"
import { getPosition } from "./utils/grid"

import './tile.scss'


type Props = {
  type: TileType
  index: number
  tileSize: number
}

const Tile = ({ type, index, tileSize }: Props) => {
  const columns = useSelector<SokobanStoreState, number>(state => state.tiles.columns)
  const { x, y } = getPosition(index, columns)

  // if (type === TileType.wall) {
  //   return (
  //     <rect
  //       data-index={index}
  //       x={x * tileSize}
  //       y={y * tileSize}
  //       width={tileSize}
  //       height={tileSize}
  //       className={`tile tile--${TileType[type]}`}
  //     >
  //     </rect>
  //   )
  // }
    return (
      <>
        <rect
          data-index={index}
          x={x * tileSize}
          y={y * tileSize}
          width={tileSize}
          height={tileSize}
          className={`tile tile--${TileType[type]}`}
          >
        </rect>
        <image href={`/img/${TileType[type]}.svg`}
          className={`tile tile--${TileType[type]}--image`}
          x={x * tileSize}
          y={y * tileSize}
          width={tileSize}
          height={tileSize}
        />
      </>
    )
  // }
}

export default Tile
