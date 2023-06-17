import { useSelector } from "react-redux"
import { TileType } from "../store/reducers/tiles"
import { SokobanStoreState } from "../store/store"
import { getPosition } from "../utils/grid"

import './tile.scss'


type Props = {
  type: TileType
  index: number
  tileSize: number
}

const Tile = ({ type, index, tileSize }: Props) => {
  const columns = useSelector<SokobanStoreState, number>(state => state.tiles.columns)
  const { x, y } = getPosition(index, columns)

  if (type === TileType.empty) {
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
  if (type === TileType.floor) {
    return (
      <image href={`img/concrete.png`}
        data-index={index}
        x={x * tileSize}
        y={y * tileSize}
        width={tileSize}
        height={tileSize}
        className={`tile tile--${TileType[type]}`}
      >
      </image>
    )
  }
  if (type === TileType.dropzone) {
    return (
      <image href={`img/dropzone.png`}
        data-index={index}
        x={x * tileSize}
        y={y * tileSize}
        width={tileSize}
        height={tileSize}
        className={`tile tile--${TileType[type]}`}
      >
      </image>
    )
  }
  if (type === TileType.wall) {
    const variation = index % 5
    return (
      <image href={`img/wall-${variation}.png`}
        data-index={index}
        x={x * tileSize}
        y={y * tileSize}
        width={tileSize}
        height={tileSize}
        className={`tile tile--${TileType[type]}`}
      >
      </image>
    )
  }
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
        <image href={`img/${TileType[type]}.svg`}
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
