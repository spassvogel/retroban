import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { getPosition } from "../utils/grid"

import './player.scss'

type Props = {
  index: number
  tileSize: number
}
const Tile = ({ index, tileSize }: Props) => {
  const columns = useSelector<RootState, number>(state => state.tiles.columns)
  const { x, y } = getPosition(index, columns)

  return (
    <>
    <circle
      data-index={index}
      cx={x * tileSize + tileSize / 2}
      cy={y * tileSize + tileSize / 2}
      r={tileSize / 2}
      className={`object object--type-player`}
      >
    </circle>
      <text x={x * tileSize + tileSize / 2} y={y * tileSize + tileSize / 1.5}       textAnchor="middle" fill="white" fontSize="0.5rem">
        {index}
      </text>
      </>
  )
}

export default Tile
